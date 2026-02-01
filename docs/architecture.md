# Astro Blog Architecture

## 1. Technical Overview

This project is a static site generated using **[Astro](https://astro.build/)**. It prioritizes performance by shipping zero JavaScript to the client by default, hydrating components only when necessary (though this project currently uses vanilla HTML/CSS).

### Core Stack
-   **Framework**: Astro v4
-   **Templating**: `.astro` components (JSX-like syntax)
-   **Styling**: CSS Variables (Theme-based) + Scoped CSS
-   **Content**: Markdown with Frontmatter + Astro Content Collections

## 2. Project Structure

```text
/
├── public/             # Static assets (images, favicon)
├── src/
│   ├── components/     # UI building blocks
│   │   ├── Header.astro        # Site header with navigation
│   │   ├── Footer.astro        # Site footer with social links
│   │   ├── Sidebar.astro       # Sidebar with widgets
│   │   ├── Search.astro        # Client-side search component
│   │   ├── TableOfContents.astro # Post navigation TOC
│   │   ├── SeriesNav.astro     # Series navigation for multi-part posts
│   │   ├── FontToggle.astro    # Toggle between Sans and Mono fonts
│   │   └── ProfileImage.astro  # Circular profile image
│   ├── content/        # Markdown content source
│   │   ├── blog/       # Blog posts (organized by YYYY/MM/)
│   │   └── til/        # TIL notes
│   │   └── config.ts   # Content Collection Schema (Zod)
│   ├── layouts/        # Page wrappers (BaseLayout.astro)
│   ├── pages/          # File-based routing
│   │   ├── index.astro         # Homepage
│   │   ├── about.astro         # About page
│   │   ├── categories/         # Category discovery
│   │   ├── series/             # Series discovery
│   │   ├── til/                # TIL index and dynamic pages
│   │   └── posts/
│   │       └── [...slug].astro # Dynamic Post pages
│   └── styles/         # Global CSS (Variables, Reset)
├── docs/               # Project documentation
│   ├── architecture.md # Technical architecture
│   ├── spec.md         # Requirements specification
│   ├── styling.md      # Design system
│   └── {issue-number}/ # Task-specific documentation (task, plan, walkthrough)
├── astro.config.mjs    # Astro configuration
└── .github/            # CI/CD Workflows
```

## 3. Data Flow

1.  **Authoring**: Content is written in Markdown files. Blog posts are organized in `src/content/blog/YYYY/MM/`, while quick notes go in `src/content/til/`.
2.  **Validation**: `src/content/config.ts` defines **Zod schemas** for both `blog` and `til` collections. Astro validates all frontmatter at build time.
3.  **Collection API**: Pages query data using `getCollection('blog')` or `getCollection('til')`.
4.  **Routing**:
    -   `index.astro`: Displays blog posts with series badges.
    -   `posts/[...slug].astro`: Dynamic pages for blog posts.
    -   `til/index.astro` & `til/[...slug].astro`: Index and dynamic pages for TIL notes.
    -   `categories/` & `series/`: Dynamic discovery pages for taxonomies.
    -   `til/tags/`: Dynamic discovery pages for TIL-specific tags.

## 4. Deployment Pipeline

The site is designed for **Multi-Target Deployment**.

### A. GitHub Pages (Primary)
-   **Configuration**: `astro.config.mjs` sets `base: '/'` to support root path serving.
-   **Workflow**: `.github/workflows/deploy.yml`
    1.  **Trigger**: Push to `main`.
    2.  **Build**: separate job runs `npm run build` on Ubuntu.
    3.  **Upload**: Build artifacts (`dist/` folder) are uploaded to GitHub Actions.
    4.  **Deploy**: GitHub Pages Deployment action pushes artifacts to the static website environment.

### B. Cloudflare Pages (Simultaneous)
-   **Configuration**: Connects directly to the GitHub Repository.
-   **Build Command**: `divya npm run build` (or `npm run build`)
-   **Output Directory**: `dist`
-   **Note on Base Path**: If serving from a distinct domain (e.g., `blog.example.com`), Cloudflare builds might need a different `base` path configuration or environment variable overrides compared to the GitHub Pages subdirectory setup.

## 5. Search Functionality

The blog includes a lightweight client-side search feature implemented in `src/components/Search.astro`.

**Key Features:**
- Real-time search with debounced input (300ms)
- Searches post titles and descriptions
- Displays up to 5 results in a dropdown
- Highlights matching text
- No external dependencies (vanilla JavaScript)

See [search.md](./search.md) for detailed implementation.

## 6. Series Navigation

The blog supports multi-part series posts through the `SeriesNav` component, allowing readers to navigate between related posts in a logical sequence.

**Key Features:**
- Automatic series detection from frontmatter `series` field
- Sequential ordering based on series ID format (`name-###`)
- Visual indication of current position in series
- Renders only when 2+ posts exist in a series
- Displays before TOC and after post content
- Site-wide series overview page at `/series`
- Series indicators on the homepage post list
- Support for spaces in series titles (replaces `_` and `-`)

**Implementation:**
- Component: `src/components/SeriesNav.astro`
- Overview Page: `src/pages/series/index.astro`
- Individual Pages: `src/pages/series/[series].astro`
- Series ID Format: `{series-name}-{sequence}` (e.g., `mainframe-modernization-001`)
- Layout Integration: `src/pages/posts/[...slug].astro` and `src/pages/index.astro`

**Technical Details:**
- Queries all posts via `getCollection('blog')`
- Filters by series name prefix
- Sorts by parsed sequence number
- Highlights current post with "You are here" badge
- Provides navigation links to all other posts in series

See [series-navigation.md](./series-navigation.md) for complete documentation.

## 7. Styling Architecture

-   **Global Styles**: `src/styles/global.css` defines CSS Variables controling the widespread look and feel. It includes a global `box-sizing: border-box` reset and layout constraints for responsiveness.
-   **Scoped Styles**: These styles are scoped to the component (hashed classes) to prevent side-effects, ensuring modularity.

## 8. TIL (Today I Learned)

The TIL section is designed for quick, bite-sized learnings that don't warrant a full blog post.

**Key Features:**
- Separate content collection (`til`) with a simplified schema.
- Dedicated RSS feed (`til/rss.xml`).
- Tag-based discovery sidebar with post counts.
- Standardized styling that matches the blog's mobile typography.
- **Font Switching**: Integrated `FontToggle` component using `localStorage` for persistence and `!important` CSS overrides for the `IBM Plex Mono` font.

## 9. Mobile-First Layout

The blog employs several strategies to ensure a premium experience on small screens:

- **Constraint-Based Grid**: Uses `minmax(0, 1fr)` for mobile columns to prevent wide content (like code blocks) from stretching the viewport.
- **Header Standardization**: All post and TIL headers (H1, H2, H3) are standardized to 1rem/1.05rem, uppercase, and bold for a clean, consistent look.
- **Padding Normalization**: Uses a site-wide `1rem` container padding on mobile to align text perfectly with navigation elements.
- **Hero Image Scaling**: Hero images are displayed on mobile but constrained to a height of `240px` to maintain page density.
- **Internal Scrolling**: Code blocks (`pre`/`code`) use `max-width: 100%` and `overflow-x: auto` to allow internal scrolling without horizontal page scroll.
