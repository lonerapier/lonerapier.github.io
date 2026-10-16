import type {
  QuartzComponent,
  QuartzComponentProps,
  QuartzComponentConstructor,
  ValidDateType,
  QuartzPluginData,
} from "@quartz-community/types";

export interface SpecHeaderOptions {
  defaultAuthor?: string;
  defaultStatus?: string;
  defaultCollection?: string;
  defaultArchive?: string;
}

const defaultOptions: SpecHeaderOptions = {
  defaultAuthor: "SAMBHAV DUSAD",
  defaultStatus: "EVERGREEN",
  defaultCollection: "FIELD NOTES",
  defaultArchive: "PERSONAL ARCHIVE",
};

function formatDate(dateInput?: unknown): string {
  if (!dateInput) return "N/A";
  const date = dateInput instanceof Date ? dateInput : new Date(String(dateInput));
  if (isNaN(date.getTime())) return "N/A";
  return date
    .toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
    .toUpperCase();
}

function calculateReadingTime(text?: string): string {
  if (!text) return "1 MIN";
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} MIN`;
}

export default ((opts?: Partial<SpecHeaderOptions>) => {
  const options: SpecHeaderOptions = { ...defaultOptions, ...opts };

  const SpecHeader: QuartzComponent = ({ fileData, allFiles, displayClass, cfg }: QuartzComponentProps) => {
    const slug = fileData.slug ?? "";
    const filePath = fileData.filePath ?? "";
    const frontmatter = (fileData.frontmatter ?? {}) as Record<string, any>;

    // Target check: Render on notes/articles (posts/, thoughts/, and content notes)
    // Exclude index, folder listing pages, 404, tag listing pages, or explicitly disabled pages
    const isExcluded =
      slug === "index" ||
      slug.endsWith("/index") ||
      slug === "404" ||
      slug.startsWith("tags/") ||
      (fileData as any).contentType === "folder" ||
      frontmatter.specHeader === false;

    if (isExcluded && frontmatter.specHeader !== true) {
      return null;
    }

    // Title & Subtitle
    const title = frontmatter.title ?? frontmatter.Title ?? fileData.title ?? "UNTITLED";
    const subtitle = frontmatter.subtitle ?? frontmatter.Subtitle ?? frontmatter.description ?? frontmatter.Description;

    // Author
    const author = String(frontmatter.author ?? frontmatter.Author ?? options.defaultAuthor ?? "SAMBHAV DUSAD").toUpperCase();

    // Date (created)
    const rawDate = frontmatter.date ?? frontmatter.Date ?? fileData.dates?.created;
    const dateFormatted = formatDate(rawDate);

    // Reading time
    const readingTime = calculateReadingTime(fileData.text as string | undefined);

    // Status
    const status = String(frontmatter.status ?? frontmatter.Status ?? options.defaultStatus ?? "EVERGREEN").toUpperCase();

    // Last Updated (modified)
    const rawLastUpdated =
      frontmatter.lastmod ??
      frontmatter.lastMod ??
      frontmatter.updated ??
      frontmatter.Updated ??
      fileData.dates?.modified ??
      rawDate;
    const lastUpdatedFormatted = formatDate(rawLastUpdated);

    // Tags
    const rawTags = frontmatter.tags ?? frontmatter.Tags ?? frontmatter.tag ?? frontmatter.Tag;
    const tags: string[] = Array.isArray(rawTags)
      ? rawTags.map(String)
      : typeof rawTags === "string"
        ? rawTags.split(",").map((t: string) => t.trim()).filter(Boolean)
        : [];

    // Collection header
    const collection = String(frontmatter.collection ?? frontmatter.Collection ?? frontmatter.series ?? frontmatter.Series ?? options.defaultCollection ?? "FIELD NOTES").toUpperCase();

    // Breadcrumbs generation
    function buildBreadcrumbs(currentSlug: string, currentTitle: string, files?: QuartzPluginData[]): Array<{ name: string; href?: string }> {
      const parts = currentSlug.split("/").filter(Boolean);
      const crumbs: Array<{ name: string; href?: string }> = [];

      const totalDepth = parts.length > 1 ? parts.length - 1 : 0;
      const rootPrefix = totalDepth > 0 ? "../".repeat(totalDepth) : "./";

      // 1. Root / Home
      crumbs.push({ name: "HOME", href: rootPrefix });

      // 2. Intermediate folder segments
      let accumulatedSlug = "";
      for (let i = 0; i < parts.length - 1; i++) {
        accumulatedSlug += (accumulatedSlug ? "/" : "") + parts[i];
        const stepDepth = parts.length - 1 - i;
        const stepPrefix = stepDepth > 0 ? "../".repeat(stepDepth) : "./";

        let folderName = parts[i];
        if (Array.isArray(files)) {
          const match = files.find(
            (f) => f.slug === accumulatedSlug || f.slug === `${accumulatedSlug}/index`
          );
          if (match?.frontmatter?.title) {
            folderName = String(match.frontmatter.title);
          }
        }
        crumbs.push({
          name: folderName.toUpperCase(),
          href: `${stepPrefix}${parts[i]}/`,
        });
      }

      // 3. Current page (active, no link)
      crumbs.push({ name: String(currentTitle).toUpperCase() });

      return crumbs;
    }

    const breadcrumbs = buildBreadcrumbs(slug, title, allFiles);

    function resolveRelativeTag(currentSlug: string, tag: string): string {
      const parts = currentSlug.split("/").filter(Boolean);
      const depth = parts.length > 1 ? parts.length - 1 : 0;
      const prefix = depth > 0 ? "../".repeat(depth) : "./";
      return `${prefix}tags/${tag}`;
    }

    return (
      <div class={`spec-header-wrapper ${displayClass ?? ""}`.trim()}>
        <div class="spec-header-block">
          {/* Top Header Bar */}
          <div class="spec-header-topbar">
            <div class="spec-header-topbar-col">{collection}</div>
            <div class="spec-header-topbar-col spec-header-topbar-breadcrumbs">
              <nav class="spec-header-crumbs" aria-label="breadcrumbs">
                {breadcrumbs.map((crumb, idx) => (
                  <span class="spec-header-crumb-item">
                    {crumb.href ? (
                      <a href={crumb.href} class="internal spec-header-crumb-link">
                        {crumb.name}
                      </a>
                    ) : (
                      <span class="spec-header-crumb-current" title={crumb.name}>
                        {crumb.name}
                      </span>
                    )}
                    {idx < breadcrumbs.length - 1 && <span class="spec-header-crumb-sep">/</span>}
                  </span>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Body */}
          <div class="spec-header-body">
            {/* Left: Title, Subtitle, Tags */}
            <div class="spec-header-title-section">
              <span class="spec-header-label">TITLE</span>
              <h1 class="spec-header-title">{title}</h1>
              {subtitle && (
                <div class="spec-header-subtitle">
                  <span class="spec-header-label">SUBTITLE</span>
                  <div class="spec-header-subtitle-text">{subtitle}</div>
                </div>
              )}
              {tags.length > 0 && (
                <div class="spec-header-tags">
                  <span class="spec-header-label">TAGS</span>
                  <div class="spec-header-tag-list">
                    {tags.map((tag) => (
                      <a
                        href={resolveRelativeTag(slug, tag)}
                        class="internal tag-link spec-header-tag-pill"
                        data-slug={`tags/${tag}`}
                      >
                        #{tag}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: CAD Metadata Grid (Author, Date, Reading Time, Status, Last Updated) */}
            <div class="spec-header-meta-grid">
              {/* Row 1 */}
              <div class="spec-header-cell">
                <span class="spec-header-label">AUTHOR</span>
                <span class="spec-header-value" title={author}>{author}</span>
              </div>
              <div class="spec-header-cell">
                <span class="spec-header-label">DATE</span>
                <span class="spec-header-value">{dateFormatted}</span>
              </div>

              {/* Row 2 */}
              <div class="spec-header-cell">
                <span class="spec-header-label">READING TIME</span>
                <span class="spec-header-value">{readingTime}</span>
              </div>
              <div class="spec-header-cell">
                <span class="spec-header-label">STATUS</span>
                <span class="spec-header-value" title={status}>{status}</span>
              </div>

              {/* Row 3 (Wide) */}
              <div class="spec-header-cell spec-header-cell-wide">
                <span class="spec-header-label">LAST UPDATED</span>
                <span class="spec-header-value">{lastUpdatedFormatted}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bold horizontal line separator between spec header and post body */}
        <hr class="spec-header-hr" />
      </div>
    );
  };

  SpecHeader.css = `
.spec-header-wrapper {
  container-type: inline-size;
  margin: 1.5rem 0 2rem 0;
  width: 100%;
}

.spec-header-block {
  border: 1px solid var(--lightgray);
  border-bottom-right-radius: 24px;
  background-color: var(--light);
  overflow: hidden;
  font-family: var(--codeFont), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  color: var(--dark);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.spec-header-block:hover {
  border-color: var(--gray);
}

/* Top bar */
.spec-header-topbar {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.35fr);
  border-bottom: 1px solid var(--lightgray);
}

.spec-header-topbar-col {
  padding: 0.65rem 1rem;
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  color: var(--dark);
  min-width: 0;
}

.spec-header-topbar-col:first-child {
  border-right: 1px solid var(--lightgray);
}

.spec-header-topbar-breadcrumbs {
  padding: 0.65rem 1rem;
  overflow: hidden;
}

.spec-header-crumbs {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  overflow: hidden;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  white-space: nowrap;
  width: 100%;
}

.spec-header-crumb-item {
  display: inline-flex;
  align-items: center;
  min-width: 0;
  flex-shrink: 0;
}

.spec-header-crumb-item:last-child {
  flex-shrink: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

.spec-header-crumb-link {
  color: var(--dark);
  text-decoration: none !important;
  transition: color 0.15s ease;
}

.spec-header-crumb-link:hover {
  color: var(--secondary) !important;
  text-decoration: underline !important;
}

.spec-header-crumb-current {
  color: var(--darkgray);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.spec-header-crumb-sep {
  color: var(--gray);
  font-weight: 400;
  margin: 0 0.35rem;
  user-select: none;
}

/* Main body */
.spec-header-body {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
}

/* Title section */
.spec-header-title-section {
  padding: 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: 1px solid var(--lightgray);
}

.spec-header-label {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--darkgray);
  margin-bottom: 0.35rem;
  user-select: none;
  display: block;
}

.spec-header-title {
  margin: 0 !important;
  padding: 0 !important;
  font-size: clamp(1.85rem, 4.2cqw, 3rem) !important;
  font-weight: 700 !important;
  line-height: 1.15 !important;
  letter-spacing: 0.04em !important;
  text-transform: uppercase !important;
  color: var(--dark) !important;
  border: none !important;
}

.spec-header-subtitle {
  margin-top: 0.85rem;
  padding-top: 0.65rem;
  border-top: 1px dashed var(--lightgray);
}

.spec-header-subtitle-text {
  font-size: 0.88rem;
  line-height: 1.45;
  letter-spacing: 0.02em;
  color: var(--darkgray);
}

/* Tags section inside block */
.spec-header-tags {
  margin-top: 0.85rem;
  padding-top: 0.65rem;
  border-top: 1px dashed var(--lightgray);
}

.spec-header-tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.25rem;
}

.spec-header-tag-pill {
  font-family: var(--codeFont), ui-monospace, SFMono-Regular, monospace;
  font-size: 0.75rem;
  letter-spacing: 0.02em;
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
  background-color: var(--lightgray);
  color: var(--secondary) !important;
  border: 1px solid transparent;
  text-decoration: none !important;
  line-height: 1.25;
  transition: all 0.15s ease;
  user-select: none;
}

.spec-header-tag-pill:hover {
  border-color: var(--secondary);
  background-color: var(--highlight);
  color: var(--secondary) !important;
}

/* Metadata grid */
.spec-header-meta-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto;
}

.spec-header-cell {
  padding: 0.75rem 0.9rem;
  border-bottom: 1px solid var(--lightgray);
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}

.spec-header-cell:nth-child(odd):not(.spec-header-cell-wide) {
  border-right: 1px solid var(--lightgray);
}

.spec-header-cell-wide {
  grid-column: span 2;
  border-bottom: none;
}

.spec-header-value {
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--dark);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Bold horizontal line separator between spec header and post body */
.spec-header-hr {
  border: none;
  height: 0;
  border-top: 2px solid var(--dark);
  margin: 2.25rem 0 2rem 0;
  width: 100%;
  opacity: 0.85;
}

/* Responsive container queries */
@container (max-width: 660px) {
  .spec-header-body {
    grid-template-columns: 1fr;
  }
  .spec-header-title-section {
    border-right: none;
    border-bottom: 1px solid var(--lightgray);
    padding: 1rem;
  }
  .spec-header-topbar-col {
    font-size: 0.95rem;
    padding: 0.55rem 0.85rem;
    letter-spacing: 0.09em;
  }
  .spec-header-cell {
    padding: 0.65rem 0.8rem;
  }
}

@container (max-width: 440px) {
  .spec-header-topbar {
    grid-template-columns: 1fr;
  }
  .spec-header-topbar-col:first-child {
    border-right: none;
    border-bottom: 1px solid var(--lightgray);
  }
  .spec-header-meta-grid {
    grid-template-columns: 1fr;
  }
  .spec-header-cell-wide {
    grid-column: span 1;
  }
  .spec-header-cell:nth-child(odd) {
    border-right: none;
  }
  .spec-header-cell {
    border-bottom: 1px solid var(--lightgray);
  }
  .spec-header-cell:last-child {
    border-bottom: none;
  }
}

/* Suppress redundant plain title, content-meta, outer breadcrumbs, and outer tag-list when spec-header is rendered */
.popover-hint:has(.spec-header-wrapper) > .breadcrumb-container,
.spec-header-wrapper ~ .breadcrumb-container,
.popover-hint:has(.spec-header-wrapper) > .article-title,
.popover-hint:has(.spec-header-wrapper) > .content-meta,
.popover-hint:has(.spec-header-wrapper) > .tags,
.spec-header-wrapper ~ .article-title,
.spec-header-wrapper ~ .content-meta,
.spec-header-wrapper ~ .tags {
  display: none !important;
}
`;

  return SpecHeader;
}) satisfies QuartzComponentConstructor;
