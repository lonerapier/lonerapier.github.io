import type { QuartzComponent } from "@quartz-community/types";
export interface SpecHeaderOptions {
    defaultAuthor?: string;
    defaultStatus?: string;
    defaultCollection?: string;
    defaultArchive?: string;
}
declare const _default: (opts?: Partial<SpecHeaderOptions>) => QuartzComponent;
export default _default;
