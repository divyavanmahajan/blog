---
description: Create a new blog post.
---

Follow these steps to create a new blog post:

1.  **Draft the Content**: Identify the topic and key sections. 
2.  **Determine the Path**: Blog posts are stored in `src/content/blog/YYYY/MM/filename.md`. Use the current year and month. For example, for February 2026, it would be `src/content/blog/2026/02/`.
3.  **Template**: Use the following structure, which adheres to the `blog` collection schema:

```markdown
---
title: "TITLE"
description: "DESCRIPTION"
pubDate: YYYY-MM-DD
author: "Divya van Mahajan"
categories: ["AI"]
tags: ["tag1", "tag2"]
heroImage: "/images/filename-hero.png"
linkedin: true
linkedinMessage: "Short catchy message for LinkedIn sharing."
series: "series-name-001"
draft: false
---

# Introduction

[Engaging introduction]

## [Section Heading]

[Main content]

***

## The AI Agent Roadmap

This post is part of a series on [Topic]. Continue reading the next parts here:

1. **[Next Post Title]** - [Brief description].
```

4.  **Instructions**:
    *   **Do NOT create a Github issue or docs/issue or beads issue** for this workflow.
    *   Set `draft: false` in the frontmatter.
    *   Set `pubDate` to the current date (YYYY-MM-DD).
    *   Create any necessary parent directories (e.g., the month folder).
    *   **Images**: Run the `/blog-image` workflow to generate and save a hero image after the text is drafted.
    *   **SEO & Quality**: Keep the description under 160 characters. Use semantic HTML headers (##, ###).
    *   **LinkedIn**: Ensure `linkedinMessage` is drafted for social sharing. Optionally run `/evaluate-for-linkedin` later.
    *   **Do not commit the change.**