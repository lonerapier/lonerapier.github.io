import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { SimpleSlug } from "./quartz/util/path"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/lonerapier",
      Twitter: "https://twitter.com/lonerapier"
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
    // Component.DesktopOnly(
    //   Component.RecentNotes({
    //     title: "Recent Writing",
    //     limit: 4,
    //     filter: (f) =>
    //       f.slug!.startsWith("posts/") && f.slug! !== "posts/index" && !f.frontmatter?.noindex,
    //     sort: (f1, f2) =>
    //       (f2.dates?.created.getTime() ?? Number.MAX_SAFE_INTEGER) -
    //       (f1.dates?.created.getTime() ?? Number.MAX_SAFE_INTEGER),
    //     linkToMore: "posts/" as SimpleSlug,
    //   }),
    // ),
    // Component.DesktopOnly(
    //   Component.RecentNotes({
    //     title: "Recent Notes",
    //     limit: 2,
    //     filter: (f) => f.slug!.startsWith("thoughts/"),
    //     linkToMore: "thoughts/" as SimpleSlug,
    //   }),
    // ),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
}
