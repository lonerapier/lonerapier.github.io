import type { Element, ElementContent, Root, Text } from "hast"
import type { QuartzTransformerPlugin } from "@quartz-community/types"
import { visit } from "unist-util-visit"
import YAML from "yaml"
import type { SpecFigureOptions, SpecFigureData } from "./types.js"
import { specFigureStyles } from "./styles.js"

export * from "./types.js"

const defaultOptions: Required<SpecFigureOptions> = {
  defaultFigPrefix: "FIG.",
  autoNumber: true,
  defaultDate: "",
  invertOnDark: false,
}

const isElement = (node: unknown): node is Element =>
  typeof node === "object" &&
  node !== null &&
  "type" in node &&
  node.type === "element" &&
  "tagName" in node

function getTextContent(node: ElementContent): string {
  if ("value" in node && typeof node.value === "string") {
    return node.value
  }
  if (isElement(node)) {
    return node.children.map(getTextContent).join("")
  }
  return ""
}

function parseFigureContent(rawText: string): SpecFigureData {
  const trimmed = rawText.trim()
  if (!trimmed) return {}

  // Check if there is explicit frontmatter delimiter (---)
  const frontmatterMatch = trimmed.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (frontmatterMatch) {
    try {
      const parsed = (YAML.parse(frontmatterMatch[1]) ?? {}) as Record<string, any>
      return {
        ...parsed,
        body: frontmatterMatch[2].trim(),
      }
    } catch {
      // Fallback
    }
  }

  // Try parsing full YAML
  try {
    const parsed = YAML.parse(trimmed)
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as SpecFigureData
    }
  } catch {
    // If YAML parse fails, parse line-by-line for key: value
  }

  // Line-by-line fallback parser
  const lines = trimmed.split(/\r?\n/)
  const data: Record<string, any> = {}
  const bodyLines: string[] = []
  let parsingHeaders = true

  for (const line of lines) {
    if (parsingHeaders) {
      if (line.trim() === "---") {
        parsingHeaders = false
        continue
      }
      const kvMatch = line.match(/^([a-zA-Z0-9_-]+)\s*:\s*(.*)$/)
      if (kvMatch) {
        const key = kvMatch[1].toLowerCase()
        let val = kvMatch[2].trim()
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1)
        }
        data[key] = val
        continue
      } else if (line.trim() === "") {
        // Empty line after headers might switch to body if next lines are not key:value
        continue
      } else {
        parsingHeaders = false
      }
    }
    bodyLines.push(line)
  }

  if (bodyLines.length > 0) {
    data.body = bodyLines.join("\n").trim()
  }

  return data as SpecFigureData
}

function parseMarkdownLink(text: string): { label: string; url: string } | null {
  const match = text.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
  if (match) {
    return { label: match[1], url: match[2] }
  }
  if (/^https?:\/\//i.test(text)) {
    return { label: text, url: text }
  }
  return null
}

function createTextOrLinkNodes(val: string): ElementContent[] {
  const trimmed = val.trim()
  const link = parseMarkdownLink(trimmed)
  if (link) {
    return [
      {
        type: "element",
        tagName: "a",
        properties: {
          href: link.url,
          className: ["spec-figure-link"],
          target: "_blank",
          rel: "noopener noreferrer",
        },
        children: [{ type: "text", value: link.label }],
      },
    ]
  }
  return [{ type: "text", value: trimmed }]
}

function buildFigureHast(
  data: SpecFigureData,
  figIndex: number,
  options: Required<SpecFigureOptions>,
): Element {
  // 1. Resolve figure number / id
  let figId = data.id ?? (data as any).fig ?? (data as any).num ?? (data as any).number
  if (!figId && options.autoNumber) {
    figId = String(figIndex).padStart(2, "0")
  }
  const figIdStr = figId ? String(figId).toUpperCase() : ""

  // 2. Resolve title
  const title = (data.title ?? (data as any).Title ?? (data as any).name ?? "").toUpperCase()

  // 3. Resolve date
  const date = (data.date ?? (data as any).Date ?? options.defaultDate ?? "").toUpperCase()

  // 4. Resolve image / src
  let src = data.src ?? (data as any).Src ?? (data as any).image ?? (data as any).img
  let alt = data.alt ?? (data as any).Alt ?? data.caption ?? title ?? ""

  // If no src but body contains markdown image ![alt](url)
  if (!src && data.body) {
    const mdImgMatch = data.body.match(/!\[([^\]]*)\]\(([^)]+)\)/)
    if (mdImgMatch) {
      if (!alt) alt = mdImgMatch[1]
      src = mdImgMatch[2]
      data.body = data.body.replace(mdImgMatch[0], "").trim()
    }
  }

  // If still no src, but file looks like an image file
  if (!src && data.file && /\.(svg|png|jpe?g|webp|gif|avif)$/i.test(data.file)) {
    src = data.file
  }

  // 5. Caption
  const caption = data.caption ?? (data as any).Caption ?? (data as any).desc ?? (data as any).description

  // 6. Source & File (optional fields)
  const source = data.source ?? (data as any).Source
  const file = data.file ?? (data as any).File

  // 7. Width & Align
  const width = data.width
  const align = data.align ?? "center"
  const invertOnDark = data.invertOnDark ?? options.invertOnDark

  // Build Header element
  const headerChildren: ElementContent[] = []

  // Fig box (left)
  headerChildren.push({
    type: "element",
    tagName: "div",
    properties: { className: ["spec-figure-fig-box"] },
    children: [
      {
        type: "element",
        tagName: "span",
        properties: { className: ["spec-figure-fig-label"] },
        children: [{ type: "text", value: options.defaultFigPrefix }],
      },
      ...(figIdStr
        ? [
            {
              type: "element" as const,
              tagName: "span",
              properties: { className: ["spec-figure-fig-num"] },
              children: [{ type: "text" as const, value: figIdStr }],
            },
          ]
        : []),
    ],
  })

  // Title box (center)
  headerChildren.push({
    type: "element",
    tagName: "div",
    properties: { className: ["spec-figure-title-box"] },
    children: [
      {
        type: "element",
        tagName: "span",
        properties: { className: ["spec-figure-title"] },
        children: [{ type: "text", value: title }],
      },
    ],
  })

  // Date box (right) - only if date exists
  if (date) {
    headerChildren.push({
      type: "element",
      tagName: "div",
      properties: { className: ["spec-figure-date-box"] },
      children: [
        {
          type: "element",
          tagName: "span",
          properties: { className: ["spec-figure-date"] },
          children: [{ type: "text", value: date }],
        },
      ],
    })
  }

  const headerElement: Element = {
    type: "element",
    tagName: "div",
    properties: {
      className: ["spec-figure-header", date ? "has-date" : "no-date"],
    },
    children: headerChildren,
  }

  // Build Canvas element
  const canvasChildren: ElementContent[] = []
  if (src) {
    const imgProps: Record<string, any> = {
      className: ["spec-figure-img"],
      src,
      alt,
      loading: "lazy",
    }
    if (width) {
      imgProps.style = `max-width: ${width};`
    }
    canvasChildren.push({
      type: "element",
      tagName: "img",
      properties: imgProps,
      children: [],
    })
  }

  if (data.body) {
    // If raw SVG / HTML is present in body
    canvasChildren.push({
      type: "element",
      tagName: "div",
      properties: { className: ["spec-figure-body-content"] },
      children: [{ type: "text", value: data.body }],
    })
  }

  const canvasElement: Element = {
    type: "element",
    tagName: "div",
    properties: {
      className: ["spec-figure-canvas", `align-${align}`],
    },
    children: canvasChildren,
  }

  // Build Caption Row (if caption provided)
  let captionElement: Element | null = null
  if (caption) {
    captionElement = {
      type: "element",
      tagName: "div",
      properties: { className: ["spec-figure-caption-row"] },
      children: [
        {
          type: "element",
          tagName: "div",
          properties: { className: ["spec-figure-cell-label"] },
          children: [{ type: "text", value: "CAPTION" }],
        },
        {
          type: "element",
          tagName: "div",
          properties: { className: ["spec-figure-caption-text"] },
          children: createTextOrLinkNodes(String(caption)),
        },
      ],
    }
  }

  // Build Optional Meta Row (SOURCE and FILE)
  let metaRowElement: Element | null = null
  if (source || file) {
    const metaCells: ElementContent[] = []

    if (source) {
      metaCells.push({
        type: "element",
        tagName: "div",
        properties: { className: ["spec-figure-meta-cell", "spec-figure-source-cell"] },
        children: [
          {
            type: "element",
            tagName: "div",
            properties: { className: ["spec-figure-cell-label"] },
            children: [{ type: "text", value: "SOURCE" }],
          },
          {
            type: "element",
            tagName: "div",
            properties: { className: ["spec-figure-cell-value"] },
            children: createTextOrLinkNodes(String(source)),
          },
        ],
      })
    }

    if (file) {
      metaCells.push({
        type: "element",
        tagName: "div",
        properties: { className: ["spec-figure-meta-cell", "spec-figure-file-cell"] },
        children: [
          {
            type: "element",
            tagName: "div",
            properties: { className: ["spec-figure-cell-label"] },
            children: [{ type: "text", value: "FILE" }],
          },
          {
            type: "element",
            tagName: "div",
            properties: { className: ["spec-figure-cell-value"] },
            children: createTextOrLinkNodes(String(file)),
          },
        ],
      })
    }

    metaRowElement = {
      type: "element",
      tagName: "div",
      properties: {
        className: [
          "spec-figure-meta-row",
          source && file ? "has-both" : "has-one",
        ],
      },
      children: metaCells,
    }
  }

  // Outer frame
  const frameClasses = ["spec-figure-frame"]
  if (invertOnDark) {
    frameClasses.push("invert-dark")
  }

  const frameElement: Element = {
    type: "element",
    tagName: "figure",
    properties: {
      className: frameClasses,
    },
    children: [
      headerElement,
      canvasElement,
      ...(captionElement ? [captionElement] : []),
      ...(metaRowElement ? [metaRowElement] : []),
    ],
  }

  return {
    type: "element",
    tagName: "div",
    properties: { className: ["spec-figure-wrapper"] },
    children: [frameElement],
  }
}

function extractCodeText(codeNode: Element): string {
  // Check if it has data-line children (from rehype-pretty-code)
  const lineSpans = codeNode.children.filter(
    (c): c is Element => isElement(c) && (c.tagName === "span" && "dataLine" in c.properties),
  )
  if (lineSpans.length > 0) {
    return lineSpans.map(getTextContent).join("\n")
  }
  return codeNode.children.map(getTextContent).join("")
}

export const SpecFigure: QuartzTransformerPlugin<Partial<SpecFigureOptions>> = (userOpts) => {
  const options: Required<SpecFigureOptions> = { ...defaultOptions, ...userOpts }

  return {
    name: "SpecFigure",
    htmlPlugins() {
      return [
        () => {
          return (tree: Root) => {
            let figureCounter = 1

            // 1. Process Code Blocks: either raw pre>code or wrapped by rehype-pretty-code (<figure data-rehype-pretty-code-figure>)
            visit(tree, "element", (node, index, parent) => {
              if (!parent || typeof index !== "number") return

              let codeNode: Element | undefined
              let targetNodeToReplace: Element | undefined

              // Case A: Wrapped in <figure data-rehype-pretty-code-figure>
              if (node.tagName === "figure" && "dataRehypePrettyCodeFigure" in node.properties) {
                const pre = node.children.find(
                  (c): c is Element => isElement(c) && c.tagName === "pre",
                )
                if (pre) {
                  const code = pre.children.find(
                    (c): c is Element => isElement(c) && c.tagName === "code",
                  )
                  const lang = String(
                    pre.properties?.dataLanguage ?? code?.properties?.dataLanguage ?? "",
                  ).toLowerCase()
                  if (lang === "figure" || lang === "fig") {
                    codeNode = code ?? pre
                    targetNodeToReplace = node
                  }
                }
              }

              // Case B: Raw <pre>
              if (!targetNodeToReplace && node.tagName === "pre") {
                const code = node.children.find(
                  (c): c is Element => isElement(c) && c.tagName === "code",
                )
                const lang = String(
                  node.properties?.dataLanguage ?? code?.properties?.dataLanguage ?? "",
                ).toLowerCase()

                const className = code?.properties?.className
                const classList = Array.isArray(className)
                  ? className.map(String)
                  : typeof className === "string"
                    ? className.split(/\s+/)
                    : []

                const isFig =
                  lang === "figure" ||
                  lang === "fig" ||
                  classList.some((cls) =>
                    ["language-figure", "language-fig", "figure", "fig"].includes(cls),
                  )

                if (isFig) {
                  codeNode = code ?? node
                  targetNodeToReplace = node
                }
              }

              if (codeNode && targetNodeToReplace) {
                const rawText = extractCodeText(codeNode)
                const figureData = parseFigureContent(rawText)
                const figureHast = buildFigureHast(figureData, figureCounter++, options)
                parent.children[index] = figureHast
                return
              }

              // 2. Process Obsidian Callouts: > [!figure] or > [!fig]
              if (node.tagName === "blockquote") {
                const calloutType = String(node.properties?.dataCallout ?? "").toLowerCase()
                if (calloutType === "figure" || calloutType === "fig") {
                  const rawText = node.children.map(getTextContent).join("\n")
                  const figureData = parseFigureContent(rawText)

                  // Check if callout title had FIG ID or title
                  const titleElement = node.children.find(
                    (c): c is Element =>
                      isElement(c) &&
                      Array.isArray(c.properties?.className) &&
                      c.properties.className.includes("callout-title"),
                  )
                  if (titleElement && !figureData.title) {
                    const titleText = getTextContent(titleElement)
                      .replace(/^[!?[a-zA-Z0-9_-]+\]?/i, "")
                      .trim()
                    if (titleText) {
                      const parts = titleText.split("|").map((s) => s.trim())
                      if (parts.length > 1) {
                        const idMatch = parts[0].match(/FIG\.?\s*([0-9A-Za-z_-]+)/i)
                        if (idMatch) figureData.id = idMatch[1]
                        figureData.title = parts[1]
                      } else {
                        figureData.title = titleText
                      }
                    }
                  }

                  const figureHast = buildFigureHast(figureData, figureCounter++, options)
                  parent.children[index] = figureHast
                  return
                }
              }
            })
          }
        },
      ]
    },
    externalResources() {
      return {
        css: [
          {
            content: specFigureStyles,
            inline: true,
          },
        ],
      }
    },
  }
}

export default SpecFigure
