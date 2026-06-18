import type { Element, ElementContent, Root } from "hast"
import type { QuartzTransformerPlugin } from "@quartz-community/types"
import { visit } from "unist-util-visit"

const footnoteSectionSelector = (node: unknown): node is Element =>
  isElement(node) && node.tagName === "section" && "dataFootnotes" in node.properties

const isElement = (node: unknown): node is Element =>
  typeof node === "object" &&
  node !== null &&
  "type" in node &&
  node.type === "element" &&
  "tagName" in node

const clone = <T>(value: T): T => structuredClone(value)

const getId = (node: Element): string | undefined => {
  const id = node.properties.id
  return typeof id === "string" ? id : undefined
}

const getHref = (node: Element): string | undefined => {
  const href = node.properties.href
  return typeof href === "string" ? href : undefined
}

const classNames = (node: Element): string[] => {
  const className = node.properties.className
  if (Array.isArray(className)) {
    return className.map(String)
  }
  if (typeof className === "string") {
    return className.split(/\s+/)
  }
  return []
}

const removeBackrefs = (node: ElementContent): ElementContent | null => {
  if (!isElement(node)) {
    return node
  }

  if (classNames(node).includes("data-footnote-backref")) {
    return null
  }

  if (node.tagName === "a" && classNames(node).includes("data-footnote-backref")) {
    return null
  }

  node.children = node.children
    .map((child) => removeBackrefs(child))
    .filter((child): child is ElementContent => child !== null)

  return node
}

const stripBackrefs = (children: ElementContent[]): ElementContent[] =>
  children
    .map((child) => removeBackrefs(clone(child)))
    .filter((child): child is ElementContent => child !== null)

const inlineFootnoteContent = (children: ElementContent[]): ElementContent[] => {
  const inlineChildren: ElementContent[] = []

  for (const child of children) {
    if ("value" in child && typeof child.value === "string" && child.value.trim() === "") {
      continue
    }

    if (isElement(child) && child.tagName === "p") {
      if (inlineChildren.length > 0) {
        inlineChildren.push({ type: "element", tagName: "br", properties: {}, children: [] })
      }

      inlineChildren.push(...child.children)
    } else {
      inlineChildren.push(child)
    }
  }

  return inlineChildren
}

const findFootnoteContent = (section: Element): Map<string, ElementContent[]> => {
  const notes = new Map<string, ElementContent[]>()

  visit(section, "element", (node) => {
    if (node.tagName !== "li") {
      return
    }

    const id = getId(node)
    if (!id) {
      return
    }

    notes.set(id, inlineFootnoteContent(stripBackrefs(node.children)))
  })

  return notes
}

const createSidenote = (label: string, children: ElementContent[]): Element => ({
  type: "element",
  tagName: "span",
  properties: {
    className: ["sidenote"],
  },
  children: [
    {
      type: "element",
      tagName: "span",
      properties: {
        className: ["sidenote-label"],
        ariaHidden: "true",
      },
      children: [{ type: "text", value: `${label}. ` }],
    },
    ...children,
  ],
})

export const Sidenotes: QuartzTransformerPlugin = () => ({
  name: "Sidenotes",
  htmlPlugins() {
    return [
      () => {
        return (tree: Root) => {
          let footnoteSection: Element | undefined

          visit(tree, "element", (node) => {
            if (footnoteSectionSelector(node)) {
              footnoteSection = node
            }
          })

          if (!footnoteSection) {
            return
          }

          const notes = findFootnoteContent(footnoteSection)
          if (notes.size === 0) {
            return
          }

          visit(tree, "element", (node, index, parent) => {
            if (node.tagName !== "sup" || node.children.length === 0) {
              return
            }

            if (index === undefined || parent === undefined) {
              return
            }

            const ref = node.children.find(
              (child): child is Element =>
                isElement(child) &&
                child.tagName === "a" &&
                "dataFootnoteRef" in child.properties,
            )

            if (!ref) {
              return
            }

            const href = getHref(ref)
            if (!href?.startsWith("#")) {
              return
            }

            const id = href.slice(1)
            const children = notes.get(id)
            if (!children) {
              return
            }

            const label = ref.children
              .map((child) => ("value" in child && typeof child.value === "string" ? child.value : ""))
              .join("")
              .trim()

            parent.children.splice(index + 1, 0, createSidenote(label, children))
          })
        }
      },
    ]
  },
})

export default Sidenotes
