# Project Specification: Astro Blog

## 1. Overview
A lightweight, easy-to-manage blog site built with Astro.

## 2. Authoring Workflow
- **Editor**: Code Editor (e.g., VS Code)
- **Format**: Markdown with Frontmatter
- **Content Management**: Direct file editing, no headless CMS.

## 3. Content Structure (Frontmatter)
To support the "Mainroad" theme style (categories, tags, thumbnails):

```yaml
---
title: "My Blog Post"
pubDate: 2024-01-20
description: "A short summary displayed in the post list."
author: "Author Name"        # Optional if single author
image: "/images/cover.jpg"   # For post thumbnail and SEO
categories: ["Tech", "Life"] # Maps to main navigation
tags: ["astro", "guide"]     # Maps to sidebar tag cloud
series: "series-name-001"    # Optional: Series ID for multi-part posts (format: name-###)
draft: false                 # Prevents build in production
---
```

**Series Navigation**: For multi-part blog posts, use the `series` field to link related posts. Format: `{series-name}-{sequence}` (e.g., `react-guide-001`). See [series-navigation.md](./series-navigation.md) for details.

## 4. Design & UI Requirements
**Reference**: [glukhov.org](https://www.glukhov.org) ("Mainroad" theme style)

- **Layout**: 
    - **Header**: Bold, capitalized site title with clear subtitle.
    - **Navigation**: High contrast bar (Dark background, white text, Red accent) with links: Home, Categories, Series, Tags, About.
    - **Content**: Clean list of posts with thumbnails.
    - **Sidebar** (Right): 
        - **Search**: Client-side search with real-time filtering
        - **Recent Posts**: Latest 5 posts
        - **Tag Cloud**: All tags with links
- **Typography**: 
    - Sans-serif (Open Sans style).
    - High readability (16px+ body text).
    - Clear hierarchy with bold black headings.
- **Color Palette**:
    - **Background**: Light Gray (`#f7f7f7`)
    - **Text**: Dark Gray/Black (`#111`)
    - **Accent**: Vivid Red (`#e22d30`) for links and highlights.
    - **Secondary**: Dark Gray for navigation/tags.

## 5. Deployment
- **Hosts**: 
    - Cloudflare Pages
    - GitHub Pages
- **CI/CD**: GitHub Actions for automated updates on commit (Multi-target deploy).

## 6. Site Structure (Expanded)
- **Home**: Blog Feed
- **TIL**: Today I Learned quick notes
- **Pages**: About
- **Overview Pages**: 
    - **/categories**: List of all categories with post count, latest post date, and link to latest post. Supports sorting by alphabetical order or recent activity.
    - **/series**: List of all blog series with part count and latest update. Supports sorting by alphabetical order or recent activity.
    - **/tags**: List of all tags with post count, latest post date, and link to latest post. Supports sorting by alphabetical order or recent activity.
    - **/til**: TIL index with topic tag cloud and recent entries.
    - **/til/tags/[tag]**: TIL entries filtered by tag.

## 7. TIL Content Structure

TIL (Today I Learned) is a lightweight section for quick notes and learnings.

### Frontmatter Schema
```yaml
---
title: "Quick Tip Title"
description: "Brief description"
pubDate: 2026-01-30
updatedDate: 2026-01-31      # Optional
tags: ["topic1", "topic2"]   # Required, no categories
draft: false
---
```

### Key Differences from Blog Posts
- **No categories**: Uses tags only
- **No series**: Standalone entries
- **No hero images**: Simpler layout
- **Shorter content**: Quick notes, not long-form articles

### Navigation
- **Header**: "TIL" link in main navigation
- **Index**: `/til/` with tag cloud and recent entries
- **RSS**: `/til/rss.xml` for feed readers

