# Mobile Layout Refinements (Phase 3)

Fix the "narrow text" issue by resolving width-stretching overflows (code blocks/images) and maximizing the available content area. Refine typography for better mobile density.

## Proposed Changes

### Global Styles & Overflow Fixes
#### [MODIFY] [global.css](file:///Users/divya/Documents/projects/astro-blog/src/styles/global.css)
- Ensure a robust reset for code blocks:
    ```css
    pre, code, .astro-code {
        max-width: 100% !important;
        overflow-x: auto !important;
        white-space: pre !important; 
    }
    ```
- Ensure all images are responsive:
    ```css
    img {
        max-width: 100%;
        height: auto;
    }
    ```
- Reduce `.container` padding to `0.4rem` on mobile.

### Single Post View
#### [MODIFY] [[...slug].astro](file:///Users/divya/Documents/projects/astro-blog/src/pages/posts/%5B...slug%5D.astro)
- **Width**: Set `.post-single` padding to `0.25rem` on mobile to maximize text reach.
- **Titles**: 
    - `.post-title` (H1): Set to `1rem` (matching body text) on mobile.
- **Section Headers (H2, H3)**:
    - `text-transform: uppercase`.
    - `font-size: 1.05rem` (just slightly larger than body).
    - `margin-top: 1rem`, `margin-bottom: 0.25rem` (compact vertical spacing).
- **Paragraphs**: `margin-bottom: 0.5rem`.
- **Hero Image**: Ensure `max-height: 240px` and `width: 100%`.

### Listing Pages
#### [MODIFY] [index.astro](file:///Users/divya/Documents/projects/astro-blog/src/pages/index.astro) (and other listing pages)
- Adjust mobile thumbnail height to `2.4em` for better 2-line alignment.

## Verification Plan

### Automated Tests
- Browser subagent to:
    - Check computed width of `.post-content` (should be ~360px on a 375px viewport).
    - Verify horizontal scroll on code blocks (no body overflow).
    - Verify headers are all-caps and compact.

### Manual Verification
- Confirm with screenshot that text now spans nearly edge-to-edge.
