import type { Element, Root } from "hast"
import type { BuildCtx, FilePath, QuartzTransformerPlugin } from "@quartz-community/types"
import { joinSegments, slugifyFilePath } from "@quartz-community/utils"
import { visit } from "unist-util-visit"
import fs from "node:fs"
import fsp from "node:fs/promises"
import path from "node:path"

export interface R2ImagesOptions {
  /** Public base URL of the R2 bucket, e.g. "https://cdn.lonerapier.me". */
  baseUrl: string
  /** Manifest written by scripts/r2-sync.mjs, relative to the repo root. */
  manifestPath: string
  /** Append ?v=<hash> so replaced images bust the CDN cache. */
  cacheBust: boolean
  /**
   * Skip rewriting during `quartz build --serve` so local previews render from
   * disk. Turn off to see exactly what production will serve.
   */
  skipOnServe: boolean
  /** Warn on an <img> that resolves to nothing in the manifest. */
  warnOnMissing: boolean
  /** File extensions treated as images, both for emitting and for rewriting. */
  extensions: string[]
}

const defaultOptions: R2ImagesOptions = {
  baseUrl: "",
  manifestPath: "r2-manifest.json",
  cacheBust: true,
  skipOnServe: true,
  warnOnMissing: true,
  extensions: [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".avif"],
}

interface Manifest {
  objects?: Record<string, string>
}

const isAbsoluteUrl = (url: string) => /^[a-z][a-z0-9+.-]*:/i.test(url) || url.startsWith("//")

/** Collapses "." and ".." without touching the leading segment semantics. */
function normalizeKey(key: string): string {
  const out: string[] = []
  for (const segment of key.split("/")) {
    if (segment === "" || segment === ".") continue
    if (segment === "..") out.pop()
    else out.push(segment)
  }
  return out.join("/")
}

const encodeKeyPath = (key: string) => key.split("/").map(encodeURIComponent).join("/")

function loadManifest(manifestPath: string): Record<string, string> {
  const abs = path.isAbsolute(manifestPath) ? manifestPath : path.join(process.cwd(), manifestPath)

  try {
    const parsed = JSON.parse(fs.readFileSync(abs, "utf8")) as Manifest
    return parsed.objects ?? {}
  } catch {
    console.warn(`[r2-images] no manifest at ${abs} — run \`npm run images:sync\`.`)
    return {}
  }
}

/**
 * Walks the content directory for images, ignoring quartz's ignorePatterns.
 * Deliberately does not use quartz's glob helper: that passes `gitignore: true`
 * to globby, and these images are gitignored on purpose — which is exactly why
 * the built-in Assets emitter no longer picks them up.
 */
async function findLocalImages(contentDir: string, exts: Set<string>, ignore: string[]) {
  const found: string[] = []
  const ignored = new Set(ignore)

  async function walk(dir: string) {
    let entries
    try {
      entries = await fsp.readdir(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const entry of entries) {
      const abs = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        if (ignored.has(entry.name) || entry.name.startsWith(".")) continue
        await walk(abs)
      } else if (exts.has(path.extname(entry.name).toLowerCase())) {
        found.push(path.relative(contentDir, abs).split(path.sep).join("/"))
      }
    }
  }

  await walk(contentDir)
  return found
}

export const R2Images: QuartzTransformerPlugin<Partial<R2ImagesOptions>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  const base = opts.baseUrl.replace(/\/+$/, "")
  const extensions = new Set(opts.extensions.map((e) => e.toLowerCase()))

  /** True when this build serves images from R2 rather than from disk. */
  const rewritingToR2 = (ctx: BuildCtx) => Boolean(base) && !(opts.skipOnServe && ctx.argv.serve)

  let objects: Record<string, string> | undefined
  let byLowerKey: Map<string, string> | undefined
  let byBasename: Map<string, string> | undefined
  let byLowerBasename: Map<string, string> | undefined
  const missing = new Set<string>()

  return {
    name: "R2Images",

    /**
     * Copies on-disk images into the build output when this build is NOT
     * rewriting to R2 — i.e. `quartz build --serve`. Without this, local
     * previews 404 on every image, because the files are gitignored and
     * quartz's Assets emitter globs with `gitignore: true`.
     *
     * Production builds emit nothing: the CDN serves those URLs.
     */
    async *emit(ctx: BuildCtx) {
      if (rewritingToR2(ctx)) return

      const contentDir = ctx.argv.directory
      const images = await findLocalImages(
        contentDir,
        extensions,
        ctx.cfg.configuration.ignorePatterns ?? [],
      )

      for (const rel of images) {
        const dest = joinSegments(ctx.argv.output, slugifyFilePath(rel as FilePath)) as FilePath
        await fsp.mkdir(path.dirname(dest), { recursive: true })
        await fsp.copyFile(path.join(contentDir, rel), dest)
        yield dest
      }
    },

    htmlPlugins(ctx) {
      if (!rewritingToR2(ctx)) return []

      if (!objects) {
        objects = loadManifest(opts.manifestPath)

        // Quartz slugifies asset paths to lowercase, so a ref whose case does not
        // match the file on disk still resolves today (and on macOS the local
        // filesystem hides the mismatch entirely). R2 keys are case-sensitive, so
        // every lookup below has a lowercased fallback.
        const countBy = (pick: (key: string) => string) => {
          const counts = new Map<string, number>()
          for (const key of Object.keys(objects!)) {
            const id = pick(key)
            counts.set(id, (counts.get(id) ?? 0) + 1)
          }
          return counts
        }
        const indexBy = (pick: (key: string) => string) => {
          const counts = countBy(pick)
          const index = new Map<string, string>()
          for (const key of Object.keys(objects!)) {
            const id = pick(key)
            // Ambiguous ids are dropped rather than resolved arbitrarily.
            if (counts.get(id) === 1) index.set(id, key)
          }
          return index
        }

        const basename = (key: string) => key.slice(key.lastIndexOf("/") + 1)
        byLowerKey = indexBy((key) => key.toLowerCase())
        byBasename = indexBy(basename)
        byLowerBasename = indexBy((key) => basename(key).toLowerCase())
      }

      const manifest = objects
      const lowerKeys = byLowerKey!
      const basenames = byBasename!
      const lowerBasenames = byLowerBasename!

      return [
        () => (tree: Root, file: any) => {
          const slug: string = file.data?.slug ?? ""
          const noteDir = slug.includes("/") ? slug.slice(0, slug.lastIndexOf("/")) : ""

          visit(tree, "element", (node: Element) => {
            if (node.tagName !== "img" && node.tagName !== "video" && node.tagName !== "audio") {
              return
            }

            const src = node.properties?.src
            if (typeof src !== "string" || src === "") return
            if (isAbsoluteUrl(src) || src.startsWith("#") || src.startsWith("data:")) return

            // Preserve any ?query / #anchor the author wrote.
            const suffixAt = src.search(/[?#]/)
            const rawPath = suffixAt === -1 ? src : src.slice(0, suffixAt)
            const suffix = suffixAt === -1 ? "" : src.slice(suffixAt)

            let decoded: string
            try {
              decoded = decodeURIComponent(rawPath)
            } catch {
              decoded = rawPath
            }

            // Resolution order mirrors how Obsidian resolves an embed: relative to
            // the note first, then vault-root-relative, then a bare-name lookup.
            const candidates: string[] = []
            if (decoded.startsWith("/")) {
              candidates.push(normalizeKey(decoded))
            } else {
              if (noteDir) candidates.push(normalizeKey(`${noteDir}/${decoded}`))
              candidates.push(normalizeKey(decoded))
            }

            const bare = decoded.slice(decoded.lastIndexOf("/") + 1)
            const key =
              candidates.find((c) => c in manifest) ??
              candidates.map((c) => lowerKeys.get(c.toLowerCase())).find(Boolean) ??
              basenames.get(bare) ??
              lowerBasenames.get(bare.toLowerCase())

            if (!key) {
              if (opts.warnOnMissing && !missing.has(src)) {
                missing.add(src)
                console.warn(`[r2-images] not in manifest: "${src}" (in ${slug || "unknown"})`)
              }
              return
            }

            const version = opts.cacheBust ? manifest[key].slice(0, 8) : ""
            const query = version
              ? suffix.startsWith("?")
                ? `?v=${version}&${suffix.slice(1)}`
                : `?v=${version}${suffix}`
              : suffix

            node.properties!.src = `${base}/${encodeKeyPath(key)}${query}`
            node.properties!.loading ??= "lazy"
            node.properties!.decoding ??= "async"
          })
        },
      ]
    },
  }
}

export default R2Images
