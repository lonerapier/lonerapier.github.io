# @lonerapier/quartz-spec-header

An engineering blueprint / CAD datasheet style title block and metadata component for Quartz digital gardens.

## Overview

Replaces the standard title and metadata of content notes with a unified, technical datasheet block inspired by engineering schematics:
- **Top Bar**: Collection title on left, breadcrumbs with relative links on right.
- **Left Panel**: Title (responsive fluid sizing), optional subtitle/description, tag pills (`#tag-name`).
- **Right Panel**: 2x3 CAD metadata grid (`AUTHOR`, `DATE`, `READING TIME`, `STATUS`, and a wide `LAST UPDATED` row).
- **Divider**: Bold horizontal rule (`<hr class="spec-header-hr">`) before the post body.
- **Auto-Suppression**: Automatically suppresses redundant default `.article-title`, `.content-meta`, outer `.tags`, and outer `.breadcrumb-container`.

---

## Frontmatter Fields

Add any of the following to your markdown note frontmatter:

```yaml
---
title: "Note Title"
subtitle: "Explaining the core concepts"    # Optional subtitle
date: 2026-03-12                             # Created date
lastmod: 2026-10-16                          # Optional override (defaults to Git commit date)
author: "Sambhav Dusad"                      # Optional (defaults to SAMBHAV DUSAD)
status: "Evergreen"                          # e.g. Evergreen, Seedling, WIP
collection: "FIELD NOTES"                    # Top-left cell header
tags:
  - machine-learning
  - deep-learning
specHeader: true                             # true by default on notes, set false to disable
---
```

---

## Configuration (`quartz.config.yaml`)

```yaml
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

---

## Modifying the Plugin

1. Edit [`src/components/SpecHeader.tsx`](./src/components/SpecHeader.tsx).
2. Recompile TypeScript:
   ```bash
   npx tsc -p tsconfig.json
   ```
3. Rebuild Quartz:
   ```bash
   npm run quartz build
   ```
