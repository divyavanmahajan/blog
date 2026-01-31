# Mobile Layout Width and Alignment Fix

## Problem Description
1.  **Horizontal Overflow**: Code blocks are stretching the `.grid-layout` container because `1fr` defaults to `minmax(auto, 1fr)` on mobile, allowing it to expand beyond the viewport width.
2.  **Alignment Mismatch**: The post content (text) is more indented than the navigation bar and title because of nested padding (`.container` plus `.post-single` padding).
3.  **Visual Width**: The "MENU" bar and other navigation elements don't seem to span the full expected width because the underlying page has been widened by overflow.

## Proposed Changes

### 1. Global Styles (Layout Constraint)
#### [MODIFY] [global.css](file:///Users/divya/Documents/projects/astro-blog/src/styles/global.css)
- Change `@media (max-width: 768px)` rules for `.grid-layout` to use `grid-template-columns: minmax(0, 1fr)`. This is a crucial fix for flex/grid containers holding code blocks.
- Ensure `.container` padding is consistent.

### 2. Post Template (Alignment and Padding)
#### [MODIFY] [[...slug].astro](file:///Users/divya/Documents/projects/astro-blog/src/pages/posts/[...slug].astro)
- Reduce mobile padding on `.post-single` to match the visual alignment of the Header's navigation text.
- Since the Header "Menu" button has `0.4rem` global padding and `0` internal padding, and the post content is currently at `0.4rem + 1rem`, I will reduce the `.post-single` internal padding to move the text closer to the edge, matching the listing pages' `1rem` which the user likes.
- Wait, I'll set `.post-single` padding to `0.75rem 0.5rem` or similar to balance with the container's `0.4rem`. Total will be `0.9rem`.

### 3. Component Normalization
- Check `SeriesNav` and `TableOfContents` to ensure they don't have overlapping margins that cause shifts.

## Verification Plan

### Automated Tests
- No automated UI tests available.

### Manual Verification
1.  Run `npm run dev` and use the browser tool to simulate mobile view (375px).
2.  Inspect the page width and check for horizontal scroll.
3.  Verify that the code block is scrollable and doesn't push the container.
4.  Compare alignment of "MENU" text with the Post Title and paragraph text.
5.  Ask the user to verify on their device.
