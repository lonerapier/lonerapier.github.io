# @lonerapier/quartz-spec-figure

An engineering blueprint / CAD datasheet style figure frame plugin for Quartz digital gardens.

## Overview

Renders figures and technical diagrams with the look and feel of an engineering schematic:
- **Header Block**: 
  - `FIG. [ID]`: Technical figure identifier (auto-numbered or customized).
  - Title: Centered uppercase technical category / description.
  - Date: Optional technical date stamp (e.g. `OCT 2026`).
- **Figure Canvas**: Generous technical frame with clean borders and responsive image rendering.
- **Caption Block**: Full-width caption bar with uppercase technical metadata label.
- **Source & File**: Optional technical footer metadata cells (`SOURCE` attribution and `FILE` path/link).
- **Responsive & Dark Mode**: Container queries for fluid mobile adaptation; automatically harmonizes with Quartz light/dark themes.

---

## Usage in Markdown

### 1. Fenced Code Block (`figure` or `fig`)

You can write figures using a `figure` or `fig` code block with YAML key-value fields:

````markdown
```figure
id: "02"
title: GPU COMPUTING / MEMORY HIERARCHY
date: OCT 2026
src: thoughts/images/gpu-memory-hierarchy.svg
caption: GPU memory hierarchy showing typical capacity and bandwidth at each level.
source: NVIDIA CUDA Programming Guide (v12.5)
file: gpu-memory-hierarchy.svg
```
````

### 2. Optional Fields

`source` and `file` are completely optional:
- If both are present, they display side-by-side in the footer.
- If only one is present, it spans the footer width.
- If neither is present, the bottom metadata row is cleanly omitted.

````markdown
```figure
id: "03"
title: SYSTEM TOPOLOGY
src: thoughts/images/system-topology.svg
caption: Block diagram of compute and interconnect architecture.
```
````

### 3. Body Content / Markdown Images

You can also include an image directly inside the body:

````markdown
```figure
title: ROOFLINE ANALYSIS
caption: Theoretical peak performance vs arithmetic intensity.
source: Berkeley Roofline Model

![Roofline Plot](thoughts/images/roofline.svg)
```
````

### 4. Obsidian Callouts

The plugin also supports Obsidian callout syntax:

````markdown
> [!figure] FIG. 02 | GPU COMPUTING / MEMORY HIERARCHY
> ![Memory Hierarchy](thoughts/images/gpu-memory-hierarchy.svg)
> caption: GPU memory hierarchy showing typical capacity and bandwidth at each level.
> source: NVIDIA CUDA Programming Guide (v12.5)
> file: gpu-memory-hierarchy.svg
````

---

## Configuration (`quartz.config.yaml`)

Add the plugin to `quartz.config.yaml` under `plugins.transformers`:

```yaml
  - source: ./quartz/plugins/spec-figure
    enabled: true
    order: 42
    options:
      defaultFigPrefix: "FIG."
      autoNumber: true
      invertOnDark: false
```
