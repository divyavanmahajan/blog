# Astro Blog User Manual

This guide explains how to manage content on your Astro blog, hosted at:
**[https://divyavanmahajan.github.io/blog/](https://divyavanmahajan.github.io/blog/)**

---

## 1. Creating a New Post

All blog posts are Markdown files located in `src/content/blog/`.

### Step-by-Step
1.  Open your project in VS Code.
2.  Navigate to `src/content/blog/`.
3.  Create a new file with a `.md` extension (e.g., `my-new-post.md`).
4.  Copy and paste the following **Frontmatter** at the top of the file:

```yaml
---
title: "Your Post Title"
description: "A short summary of the post."
pubDate: 2024-01-20
author: "Your Name" 
image: "/images/optional-cover.jpg"   
categories: ["Coding"]     # Choose: Coding, Personal, etc.
tags: ["tutorial", "astro"]
draft: false               # Set to true to hide from the live site
---
```

5.  Write your content below the second `---` using standard Markdown.

### Content Tips
-   **Code Blocks**: Use triple backticks (\`\`\`) to create syntax-highlighted code blocks.
-   **Internal Links**: Use standard markdown links `[Title](/blog/path/to/page)`.

---

## 2. Adding Static Assets (Images & Files)

To include images, PDFs, or other downloadable files in your posts, follow these steps:

### 1. Store the File
Place your file in the **`public/`** directory. You can organize them into subfolders (e.g., `public/images/`, `public/docs/`).

-   **Images**: Place images in `public/images/` and reference them like `/blog/images/filename.jpg` (Must include the `/blog` prefix).


**Image Syntax**:
```markdown
![Description of image](/blog/images/my-photo.jpg)
```

**File Download Link**:
```markdown
[Download PDF](/blog/docs/my-document.pdf)
```

> **Important**: Do not start paths with `../` or `src/`. Always use the absolute path starting with `/blog/` which maps to your `public/` folder.

---

## 2. Publishing Changes

Once you have saved your Markdown file, you need to push it to GitHub to go live.

1.  Open the **Source Control** tab in VS Code (or use the terminal).
2.  **Stage** your changes (click the `+` icon next to the file).
3.  **Commit** with a message (e.g., "feat: add new post about astro").
4.  **Sync/Push** the changes to the `main` branch.

**Deployment Timeline**: 
-   GitHub Actions will automatically pick up the change.
-   The site usually updates within **1-2 minutes**.

---

## 3. Troubleshooting

If your changes aren't showing up, check the following:

### 1. Check the Build Status
-   Go to your [GitHub Repository Actions Tab](https://github.com/divyavanmahajan/astro-blog/actions).
-   Look for the latest workflow run "Deploy to GitHub Pages".
-   **Green Check**: Success.
-   **Red X**: The build failed. Click on it to see the error log.

### 2. Common Errors
-   **Frontmatter Errors**: If the build fails, check your `.md` file. Ensure `pubDate` is a valid date and `title` is present.
-   **Broken Links**: Ensure internal links use the correct base path. 
    -   *Incorrect*: `[Link](/about)`
    -   *Correct*: `[Link](/blog/about)`
-   **Draft Mode**: If the post is missing locally or remotely, check if `draft: true` is set in the frontmatter.

### 3. Local Preview
Before pushing, you can preview the site on your computer to catch errors early.
Open your terminal and run:
```bash
npm run dev
```
Open the localhost link shown (usually `http://localhost:4321/blog/`).
