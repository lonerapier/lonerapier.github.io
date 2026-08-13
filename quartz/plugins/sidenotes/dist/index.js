import { visit } from "unist-util-visit";
import { visitParents } from "unist-util-visit-parents";
const footnoteSectionSelector = (node) => isElement(node) && node.tagName === "section" && "dataFootnotes" in node.properties;
const isElement = (node) => typeof node === "object" &&
    node !== null &&
    "type" in node &&
    node.type === "element" &&
    "tagName" in node;
// Ancestors from visit-parents may include the hast `root` node (e.g. a
// top-level <table> is a direct child of root, not of another element), so
// splicing into an ancestor's children needs to accept both.
const isParentNode = (node) => isElement(node) ||
    (typeof node === "object" &&
        node !== null &&
        "type" in node &&
        node.type === "root" &&
        "children" in node);
const clone = (value) => structuredClone(value);
const getId = (node) => {
    const id = node.properties.id;
    return typeof id === "string" ? id : undefined;
};
const getHref = (node) => {
    const href = node.properties.href;
    return typeof href === "string" ? href : undefined;
};
const classNames = (node) => {
    const className = node.properties.className;
    if (Array.isArray(className)) {
        return className.map(String);
    }
    if (typeof className === "string") {
        return className.split(/\s+/);
    }
    return [];
};
const removeBackrefs = (node) => {
    if (!isElement(node)) {
        return node;
    }
    if (classNames(node).includes("data-footnote-backref")) {
        return null;
    }
    if (node.tagName === "a" && classNames(node).includes("data-footnote-backref")) {
        return null;
    }
    node.children = node.children
        .map((child) => removeBackrefs(child))
        .filter((child) => child !== null);
    return node;
};
const stripBackrefs = (children) => children
    .map((child) => removeBackrefs(clone(child)))
    .filter((child) => child !== null);
const inlineFootnoteContent = (children) => {
    const inlineChildren = [];
    for (const child of children) {
        if ("value" in child && typeof child.value === "string" && child.value.trim() === "") {
            continue;
        }
        if (isElement(child) && child.tagName === "p") {
            if (inlineChildren.length > 0) {
                inlineChildren.push({ type: "element", tagName: "br", properties: {}, children: [] });
            }
            inlineChildren.push(...child.children);
        }
        else {
            inlineChildren.push(child);
        }
    }
    return inlineChildren;
};
const findFootnoteContent = (section) => {
    const notes = new Map();
    visit(section, "element", (node) => {
        if (node.tagName !== "li") {
            return;
        }
        const id = getId(node);
        if (!id) {
            return;
        }
        notes.set(id, inlineFootnoteContent(stripBackrefs(node.children)));
    });
    return notes;
};
const createSidenote = (label, children) => ({
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
});
export const Sidenotes = () => ({
    name: "Sidenotes",
    htmlPlugins() {
        return [
            () => {
                return (tree) => {
                    let footnoteSection;
                    visit(tree, "element", (node) => {
                        if (footnoteSectionSelector(node)) {
                            footnoteSection = node;
                        }
                    });
                    if (!footnoteSection) {
                        return;
                    }
                    const notes = findFootnoteContent(footnoteSection);
                    if (notes.size === 0) {
                        return;
                    }
                    // Footnotes referenced from inside a table cell have no room to
                    // float into the page margin there, so their sidenote is placed
                    // as a sibling right after the table instead, where it can float
                    // into the margin the normal way. Track how many have already
                    // been appended after each table so multiple notes stack in order.
                    const tableInsertOffsets = new Map();
                    visitParents(tree, "element", (node, ancestors) => {
                        if (node.tagName !== "sup" || node.children.length === 0) {
                            return;
                        }
                        const parent = ancestors[ancestors.length - 1];
                        if (!isElement(parent)) {
                            return;
                        }
                        const index = parent.children.indexOf(node);
                        if (index === -1) {
                            return;
                        }
                        const tableIndex = ancestors.findIndex((ancestor) => isElement(ancestor) && ancestor.tagName === "table");
                        const table = tableIndex === -1 ? undefined : ancestors[tableIndex];
                        const tableParent = tableIndex <= 0 ? undefined : ancestors[tableIndex - 1];
                        const ref = node.children.find((child) => isElement(child) &&
                            child.tagName === "a" &&
                            "dataFootnoteRef" in child.properties);
                        if (!ref) {
                            return;
                        }
                        const href = getHref(ref);
                        if (!href?.startsWith("#")) {
                            return;
                        }
                        const id = href.slice(1);
                        const children = notes.get(id);
                        if (!children) {
                            return;
                        }
                        const label = ref.children
                            .map((child) => ("value" in child && typeof child.value === "string" ? child.value : ""))
                            .join("")
                            .trim();
                        const sidenote = createSidenote(label, children);
                        if (table && isParentNode(tableParent)) {
                            const tableIndexInParent = tableParent.children.indexOf(table);
                            if (tableIndexInParent !== -1) {
                                const offset = tableInsertOffsets.get(table) ?? 0;
                                tableParent.children.splice(tableIndexInParent + 1 + offset, 0, sidenote);
                                tableInsertOffsets.set(table, offset + 1);
                                return;
                            }
                        }
                        parent.children.splice(index + 1, 0, sidenote);
                    });
                };
            },
        ];
    },
});
export default Sidenotes;
