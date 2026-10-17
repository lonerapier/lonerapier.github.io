export interface SpecFigureOptions {
  /** Prefix for figure numbering (defaults to "FIG.") */
  defaultFigPrefix?: string;
  /** Automatically number figures if `id` is not specified (defaults to true) */
  autoNumber?: boolean;
  /** Default date to show in top-right cell if date is omitted */
  defaultDate?: string;
  /** Invert diagram colors on dark mode for transparent SVG line drawings (defaults to false) */
  invertOnDark?: boolean;
}

export interface SpecFigureData {
  /** Figure number or identifier, e.g. "02" or "1" */
  id?: string;
  /** Figure title / category, e.g. "GPU COMPUTING / MEMORY HIERARCHY" */
  title?: string;
  /** Date string, e.g. "OCT 2026" (rev and scale are removed as requested) */
  date?: string;
  /** Image or graphic source URL/path */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Figure caption text */
  caption?: string;
  /** Optional source attribution, e.g. "NVIDIA CUDA Programming Guide (v12.5)" */
  source?: string;
  /** Optional file name or path, e.g. "gpu-memory-hierarchy.svg" */
  file?: string;
  /** Optional max width for the graphic (e.g. "600px", "100%") */
  width?: string;
  /** Optional alignment within canvas (defaults to "center") */
  align?: "center" | "left" | "right";
  /** Optional inversion on dark mode */
  invertOnDark?: boolean;
  /** Optional raw HTML/SVG or Markdown body */
  body?: string;
}
