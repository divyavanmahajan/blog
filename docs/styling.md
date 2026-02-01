# Styling & Design System

This document outlines the design decisions, CSS variables, and layout systems used in the blog. The styling is primarily handled by vanilla CSS in `src/styles/global.css` and scoped component styles.

### 1. Typography

We use a four-tier typography system with distinct fonts for the site title, headings, body text, and technical/TIL content.

-   **Site Title**: Times New Roman (serif)
    -   Weight: `500` (Medium)
    -   Usage: Main site heading (`.site-title`)
    -   Purpose: Classic, elegant serif for the primary brand element.
-   **Headings**: [Open Sans](https://fonts.google.com/specimen/Open+Sans)
    -   Weight: `800` (ExtraBold)
    -   Usage: `h1` through `h6`, table of contents
    -   Purpose: Strong, geometric headers that stand out.
-   **Body**: [Inter](https://fonts.google.com/specimen/Inter)
    -   Weight: `400` (Regular)
    -   Usage: Standard text, metadata, navigation.
    -   Purpose: Highly legible UI font optimized for screens.
-   **Technical (TIL)**: [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono)
    -   Weight: `400` (Regular)
    -   Usage: TIL content (when toggled), code blocks.
    -   Purpose: Distinct, professional monospaced font for technical notes.

### CSS configuration
```css
:root {
    --font-title: 'Times New Roman', serif;
    --font-header: 'Open Sans', sans-serif;
    --font-body: 'Inter', sans-serif;
    --font-mono: 'IBM Plex Mono', monospace;
    --weight-title: 500;
    --weight-header: 800;
    --weight-body: 400;
    --tracking-header: -0.02em;
    --tracking-body: -0.02em;
}
```

## 2. Color Palette

The design uses a minimal monochrome base with a strong primary accent color.

| Variable | Color | Hex | Usage |
| :--- | :--- | :--- | :--- |
| `--color-primary` | RED | `#e22d30` | Links, accents, brand elements. |
| `--color-bg` | OFF-WHITE | `#f7f7f7` | Global background. |
| `--color-surface` | WHITE | `#ffffff` | Content cards (posts, sidebar). |
| `--color-text` | BLACK | `#111111` | Primary text. |
| `--color-text-light`| GREY | `#555555` | Metadata, dates, secondary text. |
| `--color-secondary` | DARK-GREY | `#222222` | Footer background. |
| `--color-border` | LIGHT-GREY| `#e6e6e6` | Card borders, dividers. |

## 3. Layout System

### Grid
The main layout utilizes CSS Grid with a responsive sidebar strategy.

-   **Desktop**: `grid-template-columns: 1fr 300px` (Content + Sidebar)
-   **Mobile**: `grid-template-columns: 1fr` (Stacked)

### Container & Spacing
-   **Max Width**: `1200px` (`--max-width`).
-   **Box Sizing**: Globally set to `border-box` to ensure padding doesn't affect width calculations.

## 4. Font Toggle (TIL Section)

The TIL section includes a font switcher to toggle between `Sans` (Inter) and `Mono` (IBM Plex Mono).

### Implementation Details
- **Toggle State**: Managed via a `.use-mono-font` class on the `<html>` element.
- **Persistence**: Saved in `localStorage` as `til-font-preference`.
- **Default Behavior**: Defaults to `Mono` for the TIL section if no preference is stored.
- **Scoping**:
    - **Mono Applied to**: `.content`, articles, headings within content, lists, and paragraphs.
    - **Excluded**: Site header (`.site-header`), main navigation (`.main-nav`), and site title (`.site-title`). These maintain their original fonts to preserve branding.

### CSS Overrides
When active, the `.use-mono-font` class uses `!important` to override internal component styles and ensure a consistent monospaced experience across various content structures.

## 5. Mobile Responsiveness

Specific adaptations are made for smaller screens (< 768px):

-   **Padding**:
    -   Containers use `1.25rem` padding (reduced from desktop) to maximize content width while maintaining breathing room.
    -   Blog post cards (`.post-single`) use reduced internal padding.
-   **Text Safety**:
    -   `overflow-wrap: break-word` is enforced on content to prevent long URLs or code strings from breaking the layout.
    -   `pre` blocks (code snippets) show a scrollbar (`overflow-x: auto`) rather than expanding the container.
-   **Overflow**:
    -   `body` has `overflow-x: hidden` to prevent accidental horizontal scrollbars.
-   **Header Adaptations**:
    -   **Site Title**: Scales down from `2.5rem` to `1.8rem` to fit on narrow screens (e.g., iPhone SE at 375px).
    -   **Navigation**: Menu items have reduced padding (`0.8rem 1rem`) and slightly smaller font size to fit on a single line.
    -   **Spacing**: Vertical padding is reduced to save screen real estate.

