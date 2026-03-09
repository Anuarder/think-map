# Task P3-02: Export System

**Phase:** 3 — Advanced Features  
**Estimate:** 2-3 days  
**Dependencies:** Phase 2 complete  
**PRD Reference:** Sections 6.4 (PM-05, PM-06, PM-07)

---

## Goal

Export mind maps in multiple formats: PNG image, SVG vector, nested Markdown, and raw JSON. Uses Tauri's native file dialog for save location.

---

## Subtasks

### 2.1 Export menu
- [ ] Add export button in top bar or File menu
- [ ] Dropdown: "Export as PNG", "Export as SVG", "Export as Markdown", "Export as JSON"
- [ ] Each opens Tauri's native save dialog with appropriate file extension

### 2.2 PNG export
- [ ] Use `html-to-image` library (`toPng()`) on the React Flow container
- [ ] Include: all nodes, edges, background
- [ ] Exclude: controls, minimap, UI chrome
- [ ] Resolution: 2x for retina quality
- [ ] Save via Tauri file dialog (`save` from `@tauri-apps/plugin-dialog`)

### 2.3 SVG export
- [ ] Use `html-to-image` (`toSvg()`) or React Flow's built-in SVG export
- [ ] Scalable vector output
- [ ] Save via Tauri file dialog

### 2.4 Markdown export
- [ ] Convert mind map tree to nested markdown:
```markdown
# Artisan Marketplace
Brief description...

## Target Artisans
Description...

### Pottery Makers
### Textile Artists

## Revenue Model
Description...

### Subscription Tiers
### Commission Based

## Open Questions
- How to handle shipping?
- What's the minimum viable product?
```
- [ ] Node types as indicators: ❓ for questions, ✅ for actions, ⚠️ for risks
- [ ] Save as `.md` file via Tauri file dialog

### 2.5 JSON export
- [ ] Export the raw project data structure (nodes, edges, messages)
- [ ] Pretty-printed JSON
- [ ] Can be re-imported later (future feature)
- [ ] Save as `.json` file

### 2.6 Export chat history
- [ ] Separate option: "Export conversation as Markdown"
- [ ] Formats chat messages as a readable markdown document
- [ ] Includes user and AI messages with timestamps

---

## Acceptance Criteria

- [ ] Can export mind map as PNG (readable, high quality)
- [ ] Can export as SVG (scalable, clean)
- [ ] Can export as nested Markdown (correct hierarchy)
- [ ] Can export as JSON (valid, complete data)
- [ ] Native file save dialog works on macOS and Linux
- [ ] Exported files are correctly formatted and usable
