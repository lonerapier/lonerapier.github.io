interface TocSection {
  parentLi: HTMLElement
  subheadings: HTMLElement[]
  slugs: Set<string>
}

let activeScrollHandler: (() => void) | null = null

function setupProgressiveToc() {
  const tocList = document.querySelector(".toc .toc-content") as HTMLElement | null
  if (!tocList) return

  const listItems = Array.from(tocList.querySelectorAll(":scope > li")) as HTMLElement[]
  if (listItems.length === 0) return

  // Determine top-level depth class (usually depth-0)
  let minDepth = 6
  for (const li of listItems) {
    for (let d = 0; d <= 6; d++) {
      if (li.classList.contains(`depth-${d}`)) {
        if (d < minDepth) minDepth = d
        break
      }
    }
  }

  const topLevelClass = `depth-${minDepth}`
  const sections: TocSection[] = []
  let currentSection: TocSection | null = null

  for (const li of listItems) {
    const isTopLevel = li.classList.contains(topLevelClass)
    const anchor = li.querySelector("a")
    const slug =
      anchor?.getAttribute("data-for") || anchor?.getAttribute("href")?.replace(/^#/, "") || ""

    if (isTopLevel) {
      currentSection = {
        parentLi: li,
        subheadings: [],
        slugs: new Set(slug ? [slug] : []),
      }
      sections.push(currentSection)
    } else if (currentSection) {
      currentSection.subheadings.push(li)
      if (slug) currentSection.slugs.add(slug)
    }
  }

  function setActiveSection(activeSection: TocSection | null) {
    for (const section of sections) {
      const isOpen = section === activeSection
      for (const subLi of section.subheadings) {
        if (isOpen) {
          subLi.classList.add("open")
        } else {
          subLi.classList.remove("open")
        }
      }
    }
  }

  function highlightActiveLink(slug: string | null) {
    const allLinks = tocList?.querySelectorAll("a") ?? []
    allLinks.forEach((a) => {
      const linkSlug = a.getAttribute("data-for") || a.getAttribute("href")?.replace(/^#/, "")
      if (slug && linkSlug === slug) {
        a.classList.add("active-heading")
      } else {
        a.classList.remove("active-heading")
      }
    })
  }

  // Find all article content headers
  const contentHeaders = Array.from(
    document.querySelectorAll("article :is(h1, h2, h3, h4, h5, h6)[id]"),
  ) as HTMLElement[]

  const headers =
    contentHeaders.length > 0
      ? contentHeaders
      : (Array.from(
          document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]"),
        ) as HTMLElement[])

  function update() {
    const scrollY = window.scrollY || window.pageYOffset
    const viewportHeight = window.innerHeight
    const docHeight = document.documentElement.scrollHeight

    // If near bottom of the page, expand and highlight the last section
    if (scrollY + viewportHeight >= docHeight - 40 && sections.length > 0) {
      const lastSection = sections[sections.length - 1]
      setActiveSection(lastSection)
      if (headers.length > 0) {
        highlightActiveLink(headers[headers.length - 1].id)
      }
      return
    }

    const threshold = Math.max(90, viewportHeight * 0.22)
    let activeHeader: HTMLElement | null = null

    for (const header of headers) {
      const rect = header.getBoundingClientRect()
      if (rect.top <= threshold) {
        activeHeader = header
      } else {
        break
      }
    }

    if (activeHeader) {
      const activeSlug = activeHeader.id
      highlightActiveLink(activeSlug)
      const matchingSection = sections.find((s) => s.slugs.has(activeSlug))
      if (matchingSection) {
        setActiveSection(matchingSection)
      }
    } else {
      // At the top of the page (before first header)
      highlightActiveLink(null)
      setActiveSection(null)
    }
  }

  // Remove previous scroll listener if any
  if (activeScrollHandler) {
    window.removeEventListener("scroll", activeScrollHandler)
    activeScrollHandler = null
  }

  let ticking = false
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        update()
        ticking = false
      })
      ticking = true
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true })
  activeScrollHandler = onScroll

  // Initial update
  if (window.location.hash) {
    const targetSlug = decodeURIComponent(window.location.hash.slice(1))
    const section = sections.find((s) => s.slugs.has(targetSlug))
    if (section) {
      setActiveSection(section)
      highlightActiveLink(targetSlug)
    } else {
      update()
    }
  } else {
    update()
  }

  // Register cleanup with SPA router if available
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((window as any).addCleanup) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).addCleanup(() => {
      if (activeScrollHandler) {
        window.removeEventListener("scroll", activeScrollHandler)
        activeScrollHandler = null
      }
    })
  }
}

document.addEventListener("nav", setupProgressiveToc)
document.addEventListener("render", setupProgressiveToc)

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupProgressiveToc)
} else {
  setupProgressiveToc()
}
