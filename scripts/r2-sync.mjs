#!/usr/bin/env node
/**
 * Syncs content images to a Cloudflare R2 bucket and regenerates r2-manifest.json.
 *
 * The manifest is what makes this work on Cloudflare Pages: images are no longer
 * committed, so the build has no way to know which images exist or what they hash
 * to. The manifest carries both, and the r2-images transformer reads it to rewrite
 * <img src> to the CDN at build time.
 *
 * Zero dependencies beyond `yaml` (already a Quartz dep) — SigV4 is signed by hand
 * against R2's S3-compatible API.
 *
 *   node scripts/r2-sync.mjs            # upload new/changed, rewrite manifest
 *   node scripts/r2-sync.mjs --dry-run  # show what would happen
 *   node scripts/r2-sync.mjs --prune    # also delete remote objects with no local file
 *   node scripts/r2-sync.mjs --pull     # download objects missing locally (fresh clone)
 */

import crypto from "node:crypto"
import fs from "node:fs/promises"
import path from "node:path"
import process from "node:process"
import { parse as parseYaml } from "yaml"

const REPO_ROOT = path.resolve(import.meta.dirname, "..")
const CONTENT_DIR = path.join(REPO_ROOT, "content")
const MANIFEST_PATH = path.join(REPO_ROOT, "r2-manifest.json")

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".avif"])

// Directories never uploaded, on top of whatever quartz.config.yaml ignores.
// Excalidraw is gitignored and its exports are large; add to this list, not to
// quartz's ignorePatterns, if you want something kept off the public bucket but
// still rendered locally.
const EXTRA_EXCLUDES = ["Excalidraw"]

const CONTENT_TYPES = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
}

// Safe because the transformer appends ?v=<hash>: replacing an image under the
// same filename changes the hash, which changes the URL, which busts the cache.
const CACHE_CONTROL = process.env.R2_CACHE_CONTROL ?? "public, max-age=31536000, immutable"

// ---------------------------------------------------------------- config

function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    try {
      process.loadEnvFile(path.join(REPO_ROOT, file))
    } catch {
      // absent is fine — CI supplies real environment variables
    }
  }
}

function requireEnv(name) {
  const value = process.env[name]
  if (!value) {
    console.error(`Missing ${name}. Copy .env.example to .env and fill it in.`)
    process.exit(1)
  }
  return value
}

// ---------------------------------------------------------------- aws sigv4

const sha256 = (data) => crypto.createHash("sha256").update(data).digest("hex")
const hmac = (key, data) => crypto.createHmac("sha256", key).update(data).digest()

/** RFC 3986 encoding. encodeURIComponent leaves !*'() alone; SigV4 does not. */
function uriEncode(str) {
  return encodeURIComponent(str).replace(
    /[!'()*]/g,
    (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase(),
  )
}

const encodeKeyPath = (key) => key.split("/").map(uriEncode).join("/")

function signingKey(secret, dateStamp, region, service) {
  const kDate = hmac(`AWS4${secret}`, dateStamp)
  const kRegion = hmac(kDate, region)
  const kService = hmac(kRegion, service)
  return hmac(kService, "aws4_request")
}

/**
 * Builds the SigV4 Authorization header for one request. Exported so it can be
 * checked against AWS's published test vectors — a signing bug otherwise shows
 * up only as an opaque 403.
 */
export function signRequest({
  method,
  host,
  canonicalUri,
  query = {},
  payloadHash,
  headers = {},
  accessKeyId,
  secretAccessKey,
  region = "auto",
  service = "s3",
  now = new Date(),
}) {
  const canonicalQuery = Object.keys(query)
    .sort()
    .map((k) => `${uriEncode(k)}=${uriEncode(query[k])}`)
    .join("&")

  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "")
  const dateStamp = amzDate.slice(0, 8)

  const allHeaders = {
    host,
    "x-amz-content-sha256": payloadHash,
    "x-amz-date": amzDate,
    ...headers,
  }

  const byLowerName = new Map(
    Object.entries(allHeaders).map(([name, value]) => [name.toLowerCase(), value]),
  )
  const sortedNames = [...byLowerName.keys()].sort()

  const canonicalHeaders =
    sortedNames.map((name) => `${name}:${String(byLowerName.get(name)).trim()}`).join("\n") + "\n"
  const signedHeaders = sortedNames.join(";")

  const canonicalRequest = [
    method,
    canonicalUri,
    canonicalQuery,
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join("\n")

  const scope = `${dateStamp}/${region}/${service}/aws4_request`
  const stringToSign = ["AWS4-HMAC-SHA256", amzDate, scope, sha256(canonicalRequest)].join("\n")

  const signature = hmac(
    signingKey(secretAccessKey, dateStamp, region, service),
    stringToSign,
  ).toString("hex")

  return {
    signature,
    canonicalQuery,
    headers: {
      ...allHeaders,
      Authorization:
        `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${scope}, ` +
        `SignedHeaders=${signedHeaders}, Signature=${signature}`,
    },
  }
}

/**
 * Signs and sends a single S3 request. Body must be a Buffer (or empty) so the
 * payload hash can be computed up front — R2 requires x-amz-content-sha256.
 */
async function s3Request(
  cfg,
  { method, key = "", query = {}, body = Buffer.alloc(0), headers = {} },
) {
  const host = `${cfg.accountId}.r2.cloudflarestorage.com`
  const canonicalUri = "/" + [cfg.bucket, ...(key ? [encodeKeyPath(key)] : [])].join("/")

  const { canonicalQuery, headers: signedRequestHeaders } = signRequest({
    method,
    host,
    canonicalUri,
    query,
    payloadHash: sha256(body),
    headers,
    accessKeyId: cfg.accessKeyId,
    secretAccessKey: cfg.secretAccessKey,
  })

  const url = `https://${host}${canonicalUri}${canonicalQuery ? `?${canonicalQuery}` : ""}`
  const res = await fetch(url, {
    method,
    headers: signedRequestHeaders,
    body: method === "GET" || method === "HEAD" ? undefined : body,
  })

  if (!res.ok) {
    throw new Error(
      `${method} ${key || "(bucket)"} → ${res.status} ${res.statusText}\n${await res.text()}`,
    )
  }
  return res
}

// ---------------------------------------------------------------- r2 operations

/** Lists every object in the bucket, following continuation tokens. */
async function listRemote(cfg) {
  const objects = new Map()
  let token

  do {
    const query = { "list-type": "2", "max-keys": "1000" }
    if (token) query["continuation-token"] = token

    const xml = await (await s3Request(cfg, { method: "GET", query })).text()

    for (const [, block] of xml.matchAll(/<Contents>([\s\S]*?)<\/Contents>/g)) {
      const key = block.match(/<Key>([\s\S]*?)<\/Key>/)?.[1]
      const etag = block.match(/<ETag>([\s\S]*?)<\/ETag>/)?.[1]
      const size = block.match(/<Size>(\d+)<\/Size>/)?.[1]
      if (key) {
        objects.set(decodeXml(key), {
          etag: (etag ?? "").replace(/^&quot;|&quot;$|^"|"$/g, ""),
          size: Number(size ?? 0),
        })
      }
    }

    token = xml.match(/<NextContinuationToken>([\s\S]*?)<\/NextContinuationToken>/)?.[1]
  } while (token)

  return objects
}

const decodeXml = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")

async function putObject(cfg, key, body, contentType) {
  await s3Request(cfg, {
    method: "PUT",
    key,
    body,
    headers: {
      "content-type": contentType,
      "content-length": String(body.length),
      "cache-control": CACHE_CONTROL,
    },
  })
}

// ---------------------------------------------------------------- local scan

/** Reads quartz's ignorePatterns so anything private stays off the public bucket. */
async function loadExcludes() {
  const raw = await fs.readFile(path.join(REPO_ROOT, "quartz.config.yaml"), "utf8")
  const patterns = parseYaml(raw)?.configuration?.ignorePatterns ?? []
  return new Set([...patterns, ...EXTRA_EXCLUDES])
}

async function scanLocal(excludes) {
  const files = new Map()

  async function walk(dir) {
    let entries
    try {
      entries = await fs.readdir(dir, { withFileTypes: true })
    } catch {
      return
    }

    for (const entry of entries) {
      const abs = path.join(dir, entry.name)
      const key = path.relative(CONTENT_DIR, abs).split(path.sep).join("/")

      if (entry.isDirectory()) {
        if (excludes.has(entry.name) || entry.name.startsWith(".")) continue
        await walk(abs)
      } else if (IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
        const body = await fs.readFile(abs)
        files.set(key, {
          abs,
          body,
          // md5 matches R2's ETag for single-part uploads, so it doubles as the
          // change check and as the ?v= cache-busting token.
          md5: crypto.createHash("md5").update(body).digest("hex"),
        })
      }
    }
  }

  await walk(CONTENT_DIR)
  return files
}

// ---------------------------------------------------------------- main

async function main() {
  const args = new Set(process.argv.slice(2))
  const dryRun = args.has("--dry-run")
  const prune = args.has("--prune")
  const pull = args.has("--pull")

  loadEnv()
  const cfg = {
    accountId: requireEnv("R2_ACCOUNT_ID"),
    accessKeyId: requireEnv("R2_ACCESS_KEY_ID"),
    secretAccessKey: requireEnv("R2_SECRET_ACCESS_KEY"),
    bucket: requireEnv("R2_BUCKET"),
  }

  const excludes = await loadExcludes()
  const [local, remote] = await Promise.all([scanLocal(excludes), listRemote(cfg)])

  console.log(`local: ${local.size} images   remote: ${remote.size} objects`)

  if (pull) {
    const publicBase = requireEnv("R2_PUBLIC_BASE_URL").replace(/\/+$/, "")
    let pulled = 0
    for (const [key, meta] of remote) {
      if (local.has(key)) continue
      const dest = path.join(CONTENT_DIR, key)
      console.log(`  pull   ${key}`)
      if (dryRun) continue
      const res = await fetch(`${publicBase}/${encodeKeyPath(key)}`)
      if (!res.ok) {
        console.warn(`  ! failed to pull ${key}: ${res.status}`)
        continue
      }
      await fs.mkdir(path.dirname(dest), { recursive: true })
      await fs.writeFile(dest, Buffer.from(await res.arrayBuffer()))
      local.set(key, { abs: dest, md5: meta.etag })
      pulled++
    }
    console.log(`pulled ${pulled} file(s)`)
  }

  let uploaded = 0
  let skipped = 0

  for (const [key, file] of [...local].sort(([a], [b]) => a.localeCompare(b))) {
    if (remote.get(key)?.etag === file.md5) {
      skipped++
      continue
    }

    const verb = remote.has(key) ? "update" : "upload"
    const contentType = CONTENT_TYPES[path.extname(key).toLowerCase()] ?? "application/octet-stream"
    console.log(`  ${verb} ${key}`)

    if (!dryRun) await putObject(cfg, key, file.body, contentType)
    uploaded++
  }

  let pruned = 0
  for (const key of remote.keys()) {
    if (local.has(key)) continue
    if (!prune) {
      console.log(`  orphan ${key}  (use --prune to delete)`)
      continue
    }
    console.log(`  delete ${key}`)
    if (!dryRun) await s3Request(cfg, { method: "DELETE", key })
    pruned++
  }

  // Written even on a no-op run so the manifest always reflects the working tree.
  const objects = {}
  for (const key of [...local.keys()].sort()) objects[key] = local.get(key).md5

  const manifest = {
    $comment: "Generated by scripts/r2-sync.mjs — do not edit by hand.",
    generatedAt: new Date().toISOString(),
    count: local.size,
    objects,
  }

  if (!dryRun) await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n")

  console.log(
    `${dryRun ? "[dry-run] " : ""}${uploaded} uploaded, ${skipped} unchanged` +
      (prune ? `, ${pruned} deleted` : "") +
      ` — manifest lists ${local.size}`,
  )
}

// Skip the CLI body when imported (e.g. by the signing test).
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(import.meta.filename)) {
  main().catch((err) => {
    console.error(err.message ?? err)
    process.exit(1)
  })
}
