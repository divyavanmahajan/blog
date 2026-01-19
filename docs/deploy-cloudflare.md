# Deploy to Cloudflare Pages

This guide explains how to deploy your Astro blog to [Cloudflare Pages](https://pages.cloudflare.com/), which offers a fast, global CDN and seamless Git integration.

## Prerequisites

- A Cloudflare account.
- Your code pushed to a GitHub repository.

## Step-by-Step Guide

1.  **Log in** to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2.  Go to **Workers & Pages** > **Create Application** > **Pages** > **Connect to Git**.
3.  Select your **GitHub repository** (`astro-blog`).
4.  **Configure the Build**:
    -   **Project Name**: Choose a name (e.g., `my-astro-blog`).
    -   **Production Branch**: `main`.
    -   **Framework Preset**: Select `Astro`.
    -   **Build command**: `npm run build`
    -   **Build output directory**: `dist`
5.  Click **Save and Deploy**.

## Important Configuration Notes

### Base Path & Custom Domains

We have updated `astro.config.mjs` to use environment variables, making it easy to support different configurations for GitHub Pages (subdirectory) and Cloudflare Pages (typically root).

#### For Cloudflare Pages (Root Domain)

If your site is at `https://my-blog.pages.dev` or a custom domain, you likely want the `base` path to be `/` (root).

1.  In your Cloudflare Pages project, go to **Settings** > **Environment variables**.
2.  Add the following variables:
    -   `BASE`: `/`
    -   `SITE`: `https://your-custom-domain.com` (or your `.pages.dev` URL)
3.  **Redeploy** the latest commit for changes to take effect.

#### For Cloudflare Pages (Subdirectory)

If you want to host your blog at `https://your-site.com/my-blog/`, you can use a subdirectory path.

1.  In Cloudflare Pages **Settings** > **Environment variables**:
    -   `BASE`: `/my-blog/`
    -   `SITE`: `https://your-site.com`
2.  **Redeploy**.



*Note: Cloudflare Pages naturally serves from the root. To serve from a strict subdirectory like this, you typically need to use Cloudflare Workers or a specific routing configuration, but setting the `BASE` variable ensures Astro generates the correct asset links.*

## Triggering a New Deployment (Forced Deploy)

If you need to trigger a new build without making code changes (e.g., to pick up new environment variables), you can push an **empty commit**:

```bash
git commit --allow-empty -m "chore: trigger deployment"
git push
```

This will trigger both GitHub Actions and Cloudflare Pages to rebuild your site.

#### Default Fallback

If these variables are not set, the config defaults to the GitHub Pages setup:
-   `BASE`: `/blog/`
-   `SITE`: `https://divyavanmahajan.github.io`

