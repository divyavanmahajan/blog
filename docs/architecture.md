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
│   ├── components/     # UI building blocks (Header, Sidebar, Footer)
│   ├── content/        # Markdown content source
│   │   └── blog/       # Blog posts
│   │   └── config.ts   # Content Collection Schema (Zod)
│   ├── layouts/        # Page wrappers (BaseLayout.astro)
│   ├── pages/          # File-based routing
│   │   ├── index.astro         # Homepage
│   │   ├── [category].astro    # Dynamic Category pages
│   │   └── posts/
│   │       └── [...slug].astro # Dynamic Post pages
│   └── styles/         # Global CSS (Variables, Reset)
├── astro.config.mjs    # Astro configuration (Site URL, Base path)
└── .github/            # CI/CD Workflows
```

## 3. Data Flow

1.  **Authoring**: Content is written in Markdown files in `src/content/blog/`.
2.  **Validation**: `src/content/config.ts` defines a **Zod schema**. Astro validates all frontmatter at build time, preventing broken builds due to missing fields (e.g., missing `title` or invalid `date`).
3.  **Collection API**: Pages query data using `getCollection('blog')`.
4.  **Routing**:
    -   `[...slug].astro` generates a unique page for every post found in the collection.
    -   `[category].astro` and `[tag].astro` analyze all posts to generate unique static pages for every distinct category and tag found.

## 4. Deployment Pipeline

The site is designed for **Multi-Target Deployment**.

### A. GitHub Pages (Primary)
-   **Configuration**: `astro.config.mjs` sets `base: '/blog'` to support subdirectory serving.
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

## 5. Styling Architecture

-   **Global Styles**: `src/styles/global.css` defines CSS Variables (`--color-primary`, `--font-sans`) which control the widespread look and feel (The "Mainroad" theme).
-   **Scoped Styles**: Each `.astro` component has a `<style>` block. These styles are scoped to the component (hashed classes) to prevent side-effects, ensuring modularity.
