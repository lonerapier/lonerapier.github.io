# Images on R2

Images live in **Cloudflare R2**, not git. They stay in the local Obsidian vault
under `content/**/images/` so authoring is unchanged; the build rewrites their
URLs to the CDN.

## Moving parts

| Piece | Role |
| --- | --- |
| `scripts/r2-sync.mjs` | Uploads changed images to R2, regenerates the manifest |
| `r2-manifest.json` | Committed index of `key → md5`. The only thing the build needs |
| `quartz/plugins/r2-images` | Rewrites `<img src>` to the CDN; emits local files during `--serve` |
| `.githooks/pre-commit` | Syncs + stages the manifest on every commit |

The manifest exists because images are no longer committed: Cloudflare Pages
builds from the repo and has no images on disk, so it needs a committed record
of which images exist and what they hash to.

`content/private/` and `content/Excalidraw/` are **never** uploaded — the sync
script reads `ignorePatterns` from `quartz.config.yaml`.

## One-time setup

1. **Custom domain on the bucket.** R2 → your bucket → Settings → Custom Domains
   → add `cdn.lonerapier.me`. This must match `baseUrl` in `quartz.config.yaml`.
   Do not use the `r2.dev` URL — Cloudflare rate-limits it and says not to use it
   in production.

2. **API token.** R2 → Manage API Tokens → Create token, **Object Read & Write**,
   scoped to this bucket only. Then:

   ```bash
   cp .env.example .env   # fill in the four values
   ```

3. **Upload everything.**

   ```bash
   npm run images:check   # dry run first
   npm run images:sync
   ```

4. **Verify** a few images resolve, e.g. `curl -I https://cdn.lonerapier.me/thoughts/images/tensor-parallel.png`.

5. **Untrack the images** (only after step 3 succeeds — this is the point of no
   return for the repo):

   ```bash
   git rm -r --cached content/thoughts/images
   git add r2-manifest.json .gitignore
   git commit -m "serve images from R2"
   ```

6. **Install the hook** so future images upload themselves:

   ```bash
   npm run hooks:install
   ```

## Day-to-day

Drop an image into `content/thoughts/images/` from Obsidian and reference it as
you always have — `![alt](thoughts/images/foo.png)` or `![[thoughts/images/foo.png]]`.
`git commit` uploads it and stages the updated manifest.

To upload without committing: `npm run images:sync`.

## Commands

| Command | Does |
| --- | --- |
| `npm run images:sync` | Upload new/changed images, rewrite manifest |
| `npm run images:check` | Dry run — show what would happen |
| `npm run images:prune` | Also delete R2 objects with no local file |
| `npm run images:pull` | Download images missing locally (fresh clone) |

## Fresh clone on a new machine

```bash
npm ci && cp .env.example .env   # fill in
npm run images:pull
```

## How the rewrite works

`crawl-links` (order 60) skips any `img src` that is already an absolute URL, so
the `r2-images` transformer runs at **order 55** — after Obsidian-flavored
markdown turns `![[...]]` into `<img>`, before link resolution. Markdown on disk
is never modified.

A path resolves against the manifest in this order: relative to the note,
vault-root-relative, then bare filename. Each step has a case-insensitive
fallback, because macOS hides case mismatches locally but **R2 keys are
case-sensitive**.

URLs get `?v=<md5 prefix>`, so objects are uploaded `immutable` and re-exporting
a diagram under the same filename still busts the CDN cache.

### Local previews

`quartz build --serve` skips the rewrite and the plugin copies images from disk
instead, so previews work offline and brand-new images show up immediately.

This is needed because quartz's glob passes `gitignore: true`, so the built-in
`Assets` emitter no longer sees these (now gitignored) files. Set
`skipOnServe: false` in `quartz.config.yaml` to preview exactly what production
serves.

## Cloudflare Pages

Set `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`, and
`R2_PUBLIC_BASE_URL` under Settings → Environment variables only if you want CI
to sync. The build itself needs none of them — it reads `r2-manifest.json`.

## Known broken images

These were already broken before the migration; the build now names them
instead of silently emitting a 404. The files do not exist anywhere in the repo:

- `thoughts/images/sok-communication-across-distributed-ledgers.png`
- `thoughts/images/1_Modular-Stacks.jpeg`, `14_Smart-Contract-Rollups.jpeg`,
  `8_Value-Flows.jpeg`, `24.-Enshrined-Rollups_00288-1.jpg`
- `thoughts/images/28_Sovereign-Rollups.jpg`, `30_IVG.jpg`, `32_SSRSCR.jpeg`
- `thoughts/images/narwhal_block_structure.webp`
- `segment-into-pages.png` (in `thoughts/mmu.md`)

`/Excalidraw/gc-and.svg` and `/Excalidraw/2pc-sim.svg` also warn — those are
excluded on purpose. Drop `"Excalidraw"` from `EXTRA_EXCLUDES` in
`scripts/r2-sync.mjs` to publish them.
