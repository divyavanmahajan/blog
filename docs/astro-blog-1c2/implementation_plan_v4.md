# Mobile Layout Refinements (Phase 4)

Finalize mobile density and readability by standardizing content headers, hiding large images, and making layout widgets collapsible.

## Proposed Changes

### Single Post View
#### [MODIFY] [[...slug].astro](file:///Users/divya/Documents/projects/astro-blog/src/pages/posts/%5B...slug%5D.astro)
- **H1 inside content**: Update mobile CSS to style all headers (h1, h2, h3) inside `.post-content` as all-caps, compact, and slightly larger than body text.
- **Hero Image**: Hide `.post-hero` on mobile using `display: none`.
- **Spacing**: Further reduce header margins.

### Collapsible Components
#### [MODIFY] [TableOfContents.astro](file:///Users/divya/Documents/projects/astro-blog/src/components/TableOfContents.astro)
#### [MODIFY] [SeriesNav.astro](file:///Users/divya/Documents/projects/astro-blog/src/components/SeriesNav.astro)
- Add a toggle button/summary mechanism for mobile users.
- Default to "collapsed" on mobile viewports.

### Listing Pages
#### [MODIFY] [index.astro](file:///Users/divya/Documents/projects/astro-blog/src/pages/index.astro) (and categories/tags/series)
- Standardize `.entry-thumbnail` height to `36px` on mobile.

## Verification Plan

### Manual Verification
- Verify headers are uniform and all-caps on mobile.
- Verify TOC and Series Nav can be expanded/collapsed.
- Verify no hero image is shown on mobile posts.
- Verify thumbnails in list view are 36px tall.
