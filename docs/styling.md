# Styling & Design System

This document outlines the design decisions, CSS variables, and layout systems used in the blog. The styling is primarily handled by vanilla CSS in `src/styles/global.css` and scoped component styles.

## 1. Typography

We use a high-contrast font pairing from Google Fonts to balance impact and readability.

-   **Headings**: [Open Sans](https://fonts.google.com/specimen/Open+Sans)
    -   Weight: `800` (ExtraBold)
    -   Usage: `h1` through `h6`
    -   Purpose: Strong, geometric headers that stand out.
-   **Body**: [Inter](https://fonts.google.com/specimen/Inter)
    -   Weight: `400` (Regular)
    -   Usage: Standard text, metadata, navigation.
    -   Purpose: Highly legible UI font optimized for screens.

### CSS configuration
```css
:root {
    --font-header: 'Open Sans', sans-serif;
    --font-body: 'Inter', sans-serif;
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

## 4. Mobile Responsiveness

Specific adaptations are made for smaller screens (< 768px):

-   **Padding**:
    -   Containers use `1.25rem` padding (reduced from desktop) to maximize content width while maintaining breathing room.
    -   Blog post cards (`.post-single`) use reduced internal padding.
-   **Text Safety**:
    -   `overflow-wrap: break-word` is enforced on content to prevent long URLs or code strings from breaking the layout.
    -   `pre` blocks (code snippets) show a scrollbar (`overflow-x: auto`) rather than expanding the container.
-   **Overflow**:
    -   `body` has `overflow-x: hidden` to prevent accidental horizontal scrollbars.
