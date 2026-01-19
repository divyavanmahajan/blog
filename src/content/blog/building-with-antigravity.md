---
title: "Building This Blog with Antigravity"
description: "A behind-the-scenes look at how this blog was architected and built."
pubDate: 2026-01-19
author: "Divya van Mahajan"
categories: ["Coding"]
tags: ["antigravity", "astro", "architecture","genai"]
draft: false
---

Welcome to a meta-post about how I created this blog. I used a structured vibe-coding approach with Google Antigravity. The blog was carefully specified, architected, and built using **Antigravity**. Here is the story of how it came to be. In the text below - "we" refers to me and Antigravity, since this was a pair programming exercise.

## 1. The Specification

Before writing a single line of code, I defined exactly what this blog should be. I wanted a lightweight, easy-to-manage site that prioritizes performance. 

Key requirements from our [Spec](https://github.com/divyavanmahajan/astro-blog/blob/main/docs/spec.md):
- **Workflow**: Direct markdown editing in VS Code. No complex headless CMS.
- **Theme**: A clean, "Mainroad" inspired design with a high-contrast navigation bar and a content-focused layout.
- **Structure**: A clear hierarchy with Categories (like "Coding") and Tags for easy navigation.

## 2. The Architecture

I chose **[Astro](https://astro.build/)** for its "Zero JS by default" philosophy. This ensures the site is incredibly fast.

### Core Stack
- **Framework**: Astro v4
- **Styling**: Vanilla CSS with scoped components. Also see [Styling Doc](https://github.com/divyavanmahajan/astro-blog/blob/main/docs/styling.md).
- **Content**: Type-safe Markdown using Astro Content Collections.

As detailed in our [Architecture Doc](https://github.com/divyavanmahajan/astro-blog/blob/main/docs/architecture.md), the project structure is organized to keep content separate from logic:

```text
src/
├── components/     # UI building blocks (Header, Sidebar)
├── content/        # Markdown posts live here
├── layouts/        # Page wrappers
├── pages/          # File-based routing
└── styles/         # Global styles
```

### Deployment
We designed a robust multi-target deployment pipeline. The site is automatically built and deployed to **GitHub Pages** (our primary host) and **Cloudflare Pages** simultaneously whenever code is pushed to the `main` branch.

## 3. The Authoring Workflow

As a user, you can simply add a new markdown file to `src/content/blog/` and the deployment workflow will automatically build and deploy the site to both GitHub Pages and Cloudflare Pages. But I have a poor memory, so it made sense to write a user manual. As described in the [User Manual](https://github.com/divyavanmahajan/astro-blog/blob/main/docs/user-manual.md), creating a post is as simple as adding a new Markdown file to `src/content/blog/`.

```yaml
---
title: "My New Post"
description: "A short summary."
pubDate: 2024-01-20
categories: ["Coding"]
---
```

Astro's content collections validate this frontmatter automatically, ensuring we never accidentally break the build with a missing date or title.

## 4. The Deployment Workflow

The deployment workflow is handled by GitHub Actions, which is configured in the `.github/workflows/deploy.yml` file. The workflow is triggered on every push to the `main` branch and builds the site using Astro, then deploys it to both [GitHub Pages](https://github.com/divyavanmahajan/astro-blog/blob/main/docs/deploy-github.md) and [Cloudflare Pages](https://github.com/divyavanmahajan/astro-blog/blob/main/docs/deploy-cloudflare.md).

Currently accessible at [https://divyavanmahajan.github.io/](https://divyavanmahajan.github.io/) and [https://vanmahajan.de](https://vanmahajan.de).

## 5. Accessing the Local Site Externally

During development, you might want to access your local Astro dev server from another device or share it with others. SSH tunneling services like [tuns.sh](https://tuns.sh) make this easy, but Vite (which powers Astro's dev server) blocks requests from unknown host headers by default.

To allow external access through a custom domain, add the domain to Vite's `allowedHosts` configuration in `astro.config.mjs`:

```javascript
export default defineConfig({
    site: process.env.SITE || 'https://divyavanmahajan.github.io',
    base: process.env.BASE || '/',
    vite: {
        server: {
            allowedHosts: ['picodvm-blog.tuns.sh', '.tuns.sh', 'localhost', '127.0.0.1'],
        },
    },
});
```

Then create an SSH tunnel:

```bash
ssh -R blog:80:localhost:4321 ash.tuns.sh
```

This configuration explicitly allows requests with the tunnel's host header, preventing the "Blocked request" error that would otherwise occur.

## 6. The Future


I plan to continue using Astro for this blog, and I will keep updating it with new posts and features. I will also continue to use GitHub Actions for deployment, and I will keep using Cloudflare Pages for hosting.

## Conclusion

Building this blog with Antigravity was an interesting exercise. On one hand Antigravity is rapidly able to create 90% of the code and site, but it struggled trying to correct the CSS styling. If it was a person, I would be scracthing my head, wondering how such a smart programmer struggled with simple problems but did great at complex problems. 

By keeping the blog simple, typed, and automated, I can focus on what matters most: the content.
