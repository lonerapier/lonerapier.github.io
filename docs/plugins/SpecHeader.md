---
title: SpecHeader
description: Engineering blueprint style title and metadata block for notes.
tags:
  - plugin/component
image:
repository: "[local:quartz/plugins/spec-header]"
enabled: true
required: false
---

The `SpecHeader` plugin renders an engineering blueprint / datasheet title block at the top of content notes and articles. It unifies the title, subtitle, breadcrumbs, tags, and key metadata into a single CAD-inspired container, followed by a bold dividing line before the post body.

> [!note]
> For information on how to add, remove, or configure plugins, see the [[configuration#Plugins|Configuration]] page.

---

## Frontmatter Metadata Reference

You can customize the metadata displayed in the title block on any individual note using frontmatter fields:

| Field                       | Description                                      | Example                                                                | Default                 |
| :-------------------------- | :----------------------------------------------- | :--------------------------------------------------------------------- | :---------------------- |
| `title`                     | The main headline displayed in the title section | `title: "JEPA: A Primer"`                                              | Note title / filename   |
| `subtitle` or `description` | Subtitle text displayed below the title          | `subtitle: "A deep dive into Joint-Embedding Predictive Architecture"` | *(None)*                |
| `date`                      | Creation date of the note (ISO format)           | `date: 2026-03-12`                                                     | Git / Filesystem date   |
| `lastmod` or `updated`      | Explicit override for the modified date          | `lastmod: 2026-10-16`                                                  | Latest Git commit date  |
| `author`                    | The author of the note                           | `author: "Sambhav Dusad"`                                              | `"SAMBHAV DUSAD"`       |
| `status`                    | The lifecycle or maturity stage of the note      | `status: "Seedling"`                                                   | `"EVERGREEN"`           |
| `collection` or `series`    | Name of the collection in the top-left bar       | `collection: "DEEP DIVES"`                                             | `"FIELD NOTES"`         |
| `tags`                      | Tags associated with the note                    | `tags: [machine-learning, rl]`                                         | `[]`                    |
| `specHeader`                | Toggle the spec header on or off for this page   | `specHeader: false`                                                    | `true` on content notes |

### Example Note Frontmatter

```yaml
---
title: "Reinforcement Learning Basics"
subtitle: "From MDPs and Bellman Equations to Policy Gradients and PPO"
date: 2026-03-12
author: "Sambhav Dusad"
status: "Evergreen"
collection: "FIELD NOTES"
tags:
  - reinforcement-learning
  - machine-learning
---
```

---

## Block Structure

1. **Top Bar**:
   - **Left**: `COLLECTION` (e.g. `FIELD NOTES`).
   - **Right**: Monospace `BREADCRUMBS` (e.g. `HOME / THOUGHTS / RL`) with clickable relative links to ancestor folders.
2. **Left Panel**:
   - `TITLE`: Bold blueprint title (scales dynamically with container queries).
   - `SUBTITLE`: Optional explanatory subtitle.
   - `TAGS`: Monospace tag pills (`#tag`) linking to `/tags/<tag>`.
3. **Right Panel (CAD Metadata Grid)**:
   - `AUTHOR`: Note author.
   - `DATE`: Creation date (e.g. `MAR 12, 2026`).
   - `READING TIME`: Auto-calculated from content word count (e.g. `12 MIN`).
   - `STATUS`: Publication stage (e.g. `EVERGREEN`, `WIP`, `SEEDLING`).
   - `LAST UPDATED`: Pulled automatically from the latest Git commit date.
4. **Divider**:
   - A bold horizontal rule (`<hr class="spec-header-hr">`) demarcating the spec block from the post body.

---

## Configuration

In `quartz.config.yaml`, the component is placed in the `beforeBody` layout:

```yaml title="quartz.config.yaml"
plugins:
  - source: ./quartz/plugins/spec-header
    enabled: true
    options:
      defaultAuthor: "SAMBHAV DUSAD"
      defaultStatus: "EVERGREEN"
      defaultCollection: "FIELD NOTES"
    layout:
      position: beforeBody
      priority: 8
```

### Global Options

- `defaultAuthor`: Fallback author name when not specified in frontmatter. Defaults to `"SAMBHAV DUSAD"`.
- `defaultStatus`: Fallback status when not specified in frontmatter. Defaults to `"EVERGREEN"`.
- `defaultCollection`: Fallback collection name for the top-left cell. Defaults to `"FIELD NOTES"`.

---

## How to Modify in the Future

The plugin source code lives locally inside the workspace:

```
quartz/plugins/spec-header/
├── package.json
├── tsconfig.json
├── dist/                          # Compiled JS output used by Quartz
└── src/
    ├── index.ts                   # Plugin export entry point
    └── components/
        └── SpecHeader.tsx         # Component markup, layout & CSS styles
```

### Development Workflow

1. **Modify Markup or Styles**:
   - Edit [`quartz/plugins/spec-header/src/components/SpecHeader.tsx`](file:///Users/apple/Projects/lonerapier/lonerapier.github.io/quartz/plugins/spec-header/src/components/SpecHeader.tsx).
   - The JSX structure and the CSS styles (`SpecHeader.css`) are located directly within this file.

2. **Compile the Plugin**:
   Whenever you edit files in `src/`, compile TypeScript to `dist/`:
   ```bash
   npx tsc -p quartz/plugins/spec-header/tsconfig.json
   ```

3. **Rebuild / Preview Quartz**:
   ```bash
   npm run quartz build
   # or for live local preview:
   npx quartz build --serve
   ```
   *(Note: When modifying plugin code, restart `npx quartz build --serve` with `Ctrl+C` to clear node's module cache).*
