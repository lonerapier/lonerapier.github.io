import type { QuartzTransformerPlugin } from "@quartz-community/types";
export interface R2ImagesOptions {
    /** Public base URL of the R2 bucket, e.g. "https://cdn.lonerapier.me". */
    baseUrl: string;
    /** Manifest written by scripts/r2-sync.mjs, relative to the repo root. */
    manifestPath: string;
    /** Append ?v=<hash> so replaced images bust the CDN cache. */
    cacheBust: boolean;
    /**
     * Skip rewriting during `quartz build --serve` so local previews render from
     * disk. Turn off to see exactly what production will serve.
     */
    skipOnServe: boolean;
    /** Warn on an <img> that resolves to nothing in the manifest. */
    warnOnMissing: boolean;
    /** File extensions treated as images, both for emitting and for rewriting. */
    extensions: string[];
}
export declare const R2Images: QuartzTransformerPlugin<Partial<R2ImagesOptions>>;
export default R2Images;
