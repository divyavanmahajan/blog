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
draft: false                 # Prevents build in production
---
```

## 4. Design & UI Requirements
**Reference**: [glukhov.org](https://www.glukhov.org) ("Mainroad" theme style)

- **Layout**: 
    - **Header**: Bold, capitalized site title with clear subtitle.
    - **Navigation**: High contrast bar (Dark background, white text, Red accent) with links: Home, Categories, Tags, About.
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
- **Pages**: About
- **Overview Pages**: 
    - **/categories**: List of all categories with post count, latest post date, and link to latest post. Supports sorting by alphabetical order or recent activity.
    - **/tags**: List of all tags with post count, latest post date, and link to latest post. Supports sorting by alphabetical order or recent activity.
