export const specFigureStyles = `
.spec-figure-wrapper {
  container-type: inline-size;
  margin: 2.2rem 0;
  width: 100%;
}

.spec-figure-frame {
  border: 1px solid var(--lightgray);
  background-color: var(--light);
  color: var(--dark);
  font-family: var(--codeFont), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
  width: 100%;
}

.spec-figure-frame:hover {
  border-color: var(--gray);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

/* Header bar */
.spec-figure-header {
  display: grid;
  border-bottom: 1px solid var(--lightgray);
  background-color: var(--light);
  min-height: 2.4rem;
}

.spec-figure-header.has-date {
  grid-template-columns: auto minmax(0, 1fr) auto;
}

.spec-figure-header.no-date {
  grid-template-columns: auto minmax(0, 1fr);
}

.spec-figure-fig-box {
  display: flex;
  align-items: baseline;
  gap: 0.65rem;
  padding: 0.55rem 1.15rem;
  border-right: 1px solid var(--lightgray);
  white-space: nowrap;
  flex-shrink: 0;
}

.spec-figure-fig-label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--darkgray);
}

.spec-figure-fig-num {
  font-size: 1.22rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--dark);
  font-variant-numeric: tabular-nums;
  line-height: 1;
}

.spec-figure-title-box {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0.55rem 1.25rem;
  min-width: 0;
}

.spec-figure-title {
  font-size: 0.88rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--dark);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.spec-figure-date-box {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0.55rem 1.15rem;
  border-left: 1px solid var(--lightgray);
  white-space: nowrap;
  flex-shrink: 0;
}

.spec-figure-date {
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--darkgray);
}

/* Canvas / Body */
.spec-figure-canvas {
  padding: 2.25rem 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--light);
  overflow-x: auto;
  position: relative;
}

.spec-figure-canvas.align-left {
  justify-content: flex-start;
}

.spec-figure-canvas.align-right {
  justify-content: flex-end;
}

.spec-figure-canvas.align-center {
  justify-content: center;
}

.spec-figure-img {
  max-width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
  margin: 0 auto;
  border-radius: 0 !important;
  box-shadow: none !important;
  transition: opacity 0.2s ease;
}

.spec-figure-frame.invert-dark img.spec-figure-img {
  transition: filter 0.2s ease;
}

:root[saved-theme="dark"] .spec-figure-frame.invert-dark img.spec-figure-img {
  filter: invert(0.92) hue-rotate(180deg);
}

/* Caption Row */
.spec-figure-caption-row {
  border-top: 1px solid var(--lightgray);
  padding: 0.7rem 1.15rem;
  background-color: var(--light);
}

.spec-figure-cell-label {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gray);
  margin-bottom: 0.28rem;
  line-height: 1;
}

.spec-figure-caption-text {
  font-size: 0.84rem;
  line-height: 1.55;
  color: var(--dark);
  font-weight: 400;
}

/* Optional Source & File Row */
.spec-figure-meta-row {
  border-top: 1px solid var(--lightgray);
  display: grid;
  background-color: var(--light);
}

.spec-figure-meta-row.has-both {
  grid-template-columns: minmax(0, 1.85fr) minmax(0, 1fr);
}

.spec-figure-meta-row.has-one {
  grid-template-columns: minmax(0, 1fr);
}

.spec-figure-meta-cell {
  padding: 0.6rem 1.15rem;
  min-width: 0;
}

.spec-figure-source-cell {
  border-right: 1px solid var(--lightgray);
}

.spec-figure-meta-row.has-one .spec-figure-source-cell {
  border-right: none;
}

.spec-figure-cell-value {
  font-size: 0.82rem;
  color: var(--dark);
  line-height: 1.45;
  word-break: break-word;
}

.spec-figure-link {
  color: var(--dark);
  text-decoration: underline;
  text-underline-offset: 2.5px;
  text-decoration-thickness: 1px;
  transition: color 0.15s ease;
}

.spec-figure-link:hover {
  color: var(--secondary) !important;
}

/* Responsive Container Queries */
@container (max-width: 620px) {
  .spec-figure-header.has-date,
  .spec-figure-header.no-date {
    grid-template-columns: 1fr;
  }

  .spec-figure-fig-box {
    border-right: none;
    border-bottom: 1px solid var(--lightgray);
    justify-content: space-between;
  }

  .spec-figure-title-box {
    border-bottom: 1px solid var(--lightgray);
    justify-content: flex-start;
    text-align: left;
    padding: 0.55rem 1rem;
  }

  .spec-figure-date-box {
    border-left: none;
    justify-content: flex-start;
    padding: 0.45rem 1rem;
  }

  .spec-figure-meta-row.has-both {
    grid-template-columns: 1fr;
  }

  .spec-figure-source-cell {
    border-right: none;
    border-bottom: 1px solid var(--lightgray);
  }

  .spec-figure-canvas {
    padding: 1.5rem 1rem;
  }
}
`;
