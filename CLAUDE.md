# CLAUDE.md: AI Assistant Guide

This document provides AI assistants (primarily Claude Copilot) with essential context for working effectively on this Astro blog project.

## Project Overview

**Divya's Blog** is a minimalist technical blog built with **Astro v4**, hosted on GitHub Pages, and authored in Markdown.

- **Framework**: Astro v5.16.11 (static site generation)
- **Content**: Markdown with Frontmatter in `src/content/`
- **Styling**: CSS Variables + Scoped CSS
- **Deployment**: GitHub Pages (auto-deploy on `main` push) + Cloudflare Pages
- **Live Site**: https://divyavanmahajan.github.io/

## Project Structure Quick Reference

```
src/
├── components/          # UI building blocks (.astro)
│   ├── Header.astro, Footer.astro
│   ├── Search.astro (client-side search)
│   ├── SeriesNav.astro (multi-part series navigation)
│   ├── TableOfContents.astro
│   └── FontToggle.astro (Sans/Mono font switch)
├── content/
│   ├── blog/           # Blog posts (organized: YYYY/MM/slug.md)
│   ├── til/            # TIL notes (Quick learnings - YYYY/MM/slug.md)
│   └── config.ts       # Zod schemas for collections
├── layouts/
│   └── BaseLayout.astro # Page wrapper
├── pages/              # File-based routing
│   ├── index.astro (homepage - shows blog posts + series badges)
│   ├── about.astro
│   ├── posts/[...slug].astro (dynamic blog posts)
│   ├── til/index.astro & til/[...slug].astro (TIL pages)
│   ├── series/ (series discovery)
│   ├── categories/ (category discovery)
│   └── tags/ (tag discovery)
└── styles/
    └── global.css      # CSS Variables, resets, responsive constraints

docs/                   # Project documentation
├── architecture.md     # Technical deep-dive
├── spec.md            # Original design specifications
├── user-manual.md     # Content authoring guide
├── styling.md         # Design system
└── {issue-number}/    # Task-specific docs (task.md, implementation_plan.md, walkthrough.md)
```

## NPM Scripts

```bash
npm run dev      # Start dev server (http://localhost:4321/blog/)
npm run build    # Build + generate LinkedIn content
npm run preview  # Preview production build locally
npm run astro    # Raw astro CLI access
```

## Content Authoring Patterns

### Blog Posts
- **Location**: `src/content/blog/YYYY/MM/slug.md`
- **Frontmatter Fields**: `title`, `description`, `pubDate`, `author`, `image`, `categories`, `tags`, `draft`, `series` (optional)
- **Categories**: ["Coding", "Personal", etc.] - controls homepage taxonomy
- **Series**: Use format `{series-name}-{seq}` (e.g., `mainframe-modernization-001`) for multi-part posts
- **Images**: Store in `public/images/` and reference as `/images/filename.jpg`
- **Archive**: Already-published posts define the supported category/tag values

### TIL Entries
- **Location**: `src/content/til/YYYY/MM/slug.md`
- **Frontmatter Fields**: `title`, `description`, `pubDate`, `tags`, `draft`
- **Purpose**: Short bite-sized learnings (1-2 paragraphs)
- **Discoverable by**: `/til/` (index) and `/til/tags/[tag]/` (tag pages)
- **RSS Feed**: `/til/rss.xml`

## Key Technical Details

### Content Validation
- All frontmatter is validated at build-time via `src/content/config.ts` (Zod schemas)
- Invalid frontmatter will cause build failure with clear error messages
- Check this file if adding new collection types or changing field requirements

### Series Navigation
- SeriesNav component (`src/components/SeriesNav.astro`) automatically detects multi-part posts
- Requires 2+ posts with matching series prefix
- Format: `{series-name}-{sequence}` (e.g., `deep-dive-001`, `deep-dive-002`)
- Displays links to all posts in series + "You are here" badge

### Search
- Lightweight client-side search in `src/components/Search.astro`
- Debounced 300ms, searches titles and descriptions
- Returns up to 5 results
- No external dependencies (vanilla JS)

### Mobile-First Design
- Constraint-based grid with `minmax(0, 1fr)` prevents overflow
- Standard H1-H3 headers: `1rem` size, uppercase, bold
- Container padding: `1rem` on mobile
- Hero images: limited to `240px` height on mobile
- Code blocks: internal scroll, no horizontal page scroll

### Styling Architecture
- Global CSS Variables in `src/styles/global.css` control theme
- Scoped component styles prevent side effects
- FontToggle uses localStorage + `!important` CSS for Mono font override

## Issue Tracking & Workflow

This project uses **bd** (beads) for issue tracking. Detailed workflow in AGENTS.md.

### Quick Commands
```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --status in_progress  # Claim work
bd close <id>         # Complete work
bd sync               # Sync with git
```

## Landing the Plane: Session Completion Checklist

**When ending a work session, ALWAYS follow this mandatory workflow:**

1. ✅ **File remaining issues** - Create issues for follow-up work
2. ✅ **Run quality gates** (if code changed)
   ```bash
   npm run build    # Must succeed
   npm run dev      # Verify dev server starts
   ```
3. ✅ **Update issue status**
   ```bash
   bd close <id>           # Close finished work
   bd update <id> --status in_progress  # If partial
   ```
4. ✅ **Push to remote** (MANDATORY - work is NOT complete until push succeeds)
   ```bash
   git pull --rebase
   bd sync
   git push
   git status  # MUST show "up to date with origin"
   ```
5. ✅ **Clean up**
   ```bash
   git stash           # Clear any stashes
   git remote prune origin  # Clean remote branches
   ```
6. ✅ **Verify** - All changes committed AND pushed

**CRITICAL**: Work is NOT complete until `git push` succeeds and `git status` shows "up to date with origin".

## Common Development Tasks

### Creating a New Blog Post
```bash
# Create file in correct location
src/content/blog/2026/02/my-post.md

# Add frontmatter:
---
title: "Post Title"
description: "Summary"
pubDate: 2026-02-19
author: "Divya"
categories: ["Coding"]
tags: ["tag1", "tag2"]
draft: false
---

# Content below...
```

### Creating a Multi-Part Series
1. Create posts with `series: "series-name-001"`, `series: "series-name-002"`, etc.
2. SeriesNav component automatically detects and renders navigation
3. No manual configuration needed - component queries all posts and filters by series prefix

### Modifying Styles
1. Check `src/styles/global.css` for global CSS Variables (colors, fonts, spacing)
2. Modify component styles in scoped `<style>` blocks within `.astro` files
3. Changes take effect immediately in dev server

### Running a Build
```bash
npm run build  # Builds dist/ and runs LinkedIn script
npm run preview  # Test production build locally
```

## Code Patterns & Conventions

### Astro Component Structure
```astro
---
// Script section: imports, data fetching, logic
import { getCollection } from 'astro:content';
const posts = await getCollection('blog');
---

<!-- Template section: HTML/JSX -->
<BaseLayout title="Blog">
  {posts.map(post => <article>{post.data.title}</article>)}
</BaseLayout>

<style>
  /* Scoped styles */
  article { margin: 1rem 0; }
</style>
```

### Frontmatter Examples
**Blog Post:**
```yaml
---
title: "Understanding Astro's Static Generation"
description: "A deep dive into how Astro builds static sites."
pubDate: 2026-02-19
author: "Divya"
image: "/images/astro-cover.jpg"
categories: ["Coding"]
tags: ["astro", "static-generation"]
draft: false
series: "astro-fundamentals-001"  # For multi-part posts
---
```

**TIL Entry:**
```yaml
---
title: "CSS Grid minmax() for Responsive Layouts"
description: "How to use minmax(0, 1fr) to prevent overflow"
pubDate: 2026-02-19
tags: ["css", "responsive"]
draft: false
---
```

## Testing & Validation

### Build Validation
- `npm run build` will fail if:
  - Content has invalid frontmatter (Zod schema violation)
  - TypeScript/syntax errors exist
  - Missing dependencies
- Fix errors and retry

### Dev Server Verification
- `npm run dev` starts on `http://localhost:4321/blog/`
- Check homepage renders correctly
- Test category and tag pages load
- Verify series navigation displays (if applicable)
- Check mobile responsiveness (DevTools mobile view)

## File Locations for Common Changes

| Task | File |
|------|------|
| Add/modify global styles | `src/styles/global.css` |
| Change header/footer | `src/components/Header.astro` / `Footer.astro` |
| Add new page route | `src/pages/new-page.astro` |
| Modify content schema | `src/content/config.ts` |
| Update search behavior | `src/components/Search.astro` |
| Modify series nav | `src/components/SeriesNav.astro` |
| Add/edit blog post | `src/content/blog/YYYY/MM/slug.md` |
| Add/edit TIL entry | `src/content/til/YYYY/MM/slug.md` |

## Documentation Files

- **[README.md](README.md)**: Project overview and quick start
- **[docs/architecture.md](docs/architecture.md)**: Technical deep-dive (read this first!)
- **[docs/spec.md](docs/spec.md)**: Original design specifications
- **[docs/user-manual.md](docs/user-manual.md)**: Content authoring guide
- **[docs/styling.md](docs/styling.md)**: Design system and CSS variables
- **[docs/{issue-number}/](docs/)**: Issue-specific documentation
  - `task.md`: Issue description and acceptance criteria
  - `implementation_plan.md`: Technical approach and steps
  - `walkthrough.md`: Detailed step-by-step guide
- **[AGENTS.md](AGENTS.md)**: Issue tracking workflow (bd commands, git workflow)
- **[CLAUDE.md](CLAUDE.md)**: This file!

## Useful Diagnostic Commands

```bash
# Check for build errors before committing
npm run build

# See what's changed
git status
git diff

# View issue details
bd show <id>

# Start fresh dev environment
npm install  # If dependencies might be missing
npm run dev

# Search codebase for pattern
grep -r "pattern" src/

# Test production build locally
npm run build && npm run preview
```

## Working with Git

```bash
# Standard workflow
git pull --rebase  # Update from remote
git status         # Check changes
git add .          # Stage changes
git commit -m "Clear message describing changes"
git push           # Push to remote

# Troubleshooting
git log --oneline -5  # See recent commits
git diff              # See unstaged changes
git stash             # Temporarily save changes
```

## Deployment

- **Primary**: GitHub Pages (auto-deploy on `main` push)
- **Secondary**: Cloudflare Pages (connected to repo, same build command)
- **Build Command**: `npm run build`
- **Output Directory**: `dist/`
- **Site URL**: https://divyavanmahajan.github.io/

Changes are live ~2 minutes after `git push main` succeeds.

## Key Decisions & Gotchas

1. **No image optimization during build** - Static assets are copied as-is. Run image optimization separately before committing.
2. **Content must be in correct folders** - Posts in `src/content/blog/`, TIL in `src/content/til/`. Wrong location = content won't be discovered.
3. **Series format is strict** - Must be `name-NNN` (3-digit sequence). `name-01` works, but sorting expects numeric suffixes.
4. **Categories are taxonomy-based** - The homepage renders all available categories from existing posts. Review existing posts to understand supported categories.
5. **Mobile-first design** - All changes should be tested on mobile view in DevTools.
6. **Draft posts are hidden** - Set `draft: false` in frontmatter to publish. `draft: true` hides from homepage and feeds.
7. **Always push before ending session** - Local changes are lost if not pushed. Git workflow is mandatory.

## Questions? Start Here

1. **How do I add a post?** → See "Creating a New Blog Post" above, or check `docs/user-manual.md`
2. **How do I add a series?** → See "Creating a Multi-Part Series" above, and `docs/series-navigation.md`
3. **How do I style something?** → Check `src/styles/global.css` for theme variables, then modify component styles in `.astro` files
4. **How do I debug a build error?** → Read the error message carefully, check `src/content/config.ts` for schema, verify frontmatter matches
5. **How do I push changes?** → Follow "Landing the Plane" workflow above - includes `git pull --rebase`, `bd sync`, `git push`
6. **Where's the architecture doc?** → `docs/architecture.md` - read this first for deep understanding
