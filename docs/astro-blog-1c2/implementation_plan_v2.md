# Mobile Layout Refinements (Phase 2)

Further optimize the mobile experience by redesigning the header, adjusting content density, and fixing code block overflow.

## Proposed Changes

### Header
#### [MODIFY] [Header.astro](file:///Users/divya/Documents/projects/astro-blog/src/components/Header.astro)
- Move `#menu-toggle` below the title on mobile.
- Wrap `#menu-toggle` in a black bar (`.menu-bar`).
- Remove the hamburger icon spans, leaving only the text "MENU".
- Style `.menu-bar` to be full-width and black on mobile.

### Listing Pages
#### [MODIFY] [index.astro](file:///Users/divya/Documents/projects/astro-blog/src/pages/index.astro)
#### [MODIFY] [tags/[tag].astro](file:///Users/divya/Documents/projects/astro-blog/src/pages/tags/%5Btag%5D.astro)
#### [MODIFY] [categories/[category].astro](file:///Users/divya/Documents/projects/astro-blog/src/pages/categories/%5Bcategory%5D.astro)
#### [MODIFY] [series/[series].astro](file:///Users/divya/Documents/projects/astro-blog/src/pages/series/%5Bseries%5D.astro)
- Adjust `.entry-thumbnail` height to `2.5em` (approx 2 lines of text height) in mobile media query.

### Single Post View
#### [MODIFY] [[...slug].astro](file:///Users/divya/Documents/projects/astro-blog/src/pages/posts/%5B...slug%5D.astro)
- Reduce `.post-single` side padding and `.container` side padding (via global or component override) to increase content width.
- Headers inside `.post-content`: `text-transform: uppercase`, font-size slightly larger than body (~1.25rem).
- Section titles: Same uppercase styling and size.
- Reduce vertical margins between paragraphs and headers.
- Restrict post hero image (if present) to `max-height: 240px` with `object-fit: cover`.
- Ensure code blocks (`pre`, `code`) have `max-width: 100%` and `overflow-x: auto` to prevent stretching the page width.

### Global Styles
#### [MODIFY] [global.css](file:///Users/divya/Documents/projects/astro-blog/src/styles/global.css)
- Reduce `.container` side padding to `0.5rem` on mobile to maximize content area.
- Ensure code block overflow is handled globally.

## Verification Plan

### Automated Tests
- Capture screenshots of:
    - Homepage (verify black menu bar below title, 2-line height thumbnails).
    - Single post (verify content width, uppercase headers, max-height hero image).
    - Single post with code blocks (verify no horizontal scroll on body).

### Manual Verification
- Check menu functionality with the new layout.
- Verify readability of the refined typography.
