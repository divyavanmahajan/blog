# Astro Blog Implementation Walkthrough

I have successfully initialized your new Astro blog with a design inspired by **glukhov.org**. 

## 1. Project Overview
- **Framework**: Astro (Static Site Generator)
- **Styling**: Vanilla CSS (Variables defined in `src/styles/global.css`)
- **Content**: Markdown + Frontmatter (`src/content/blog/`)
- **Deployment**: GitHub Actions configured for GitHub Pages.

## 2. How to Write a New Post
1. Create a new `.md` file in `src/content/blog/`.
2. Add the required Frontmatter:
   ```yaml
   ---
   title: "My New Post"
   description: "Short summary..."
   pubDate: 2024-01-20
   categories: ["Coding"]
   tags: ["tutorial"]
   draft: false
   ---
   ```
3. Write your content below the dashes.

## 3. Project Structure
- **`src/content/blog/`**: Your markdown posts live here.
- **`src/layouts/`**: `BaseLayout.astro` controls the page structure.
- **`src/components/`**: 
    - `Header.astro`: Site title and navigation.
    - `Sidebar.astro`: Recent posts and tags widget.
- **`src/styles/global.css`**: Define colors, fonts, and layout grid.

## 4. Deployment Setup

### GitHub Pages
1. Push this code to a GitHub Repository.
2. Go to **Settings > Pages** in your repo.
3. Under **Build and deployment**, select **GitHub Actions** as the source.
4. The included `.github/workflows/deploy.yml` will automatically build and deploy your site on every commit.

### Cloudflare Pages (Simultaneous)
1. Go to the **Cloudflare Dashboard > Pages**.
2. Click **Connect to Git** and select your GitHub repository.
3. **Build Settings**:
    - **Framework Preset**: `Astro`
    - **Build Command**: `divya npm run build` (or `npm run build`)
    - **Output Directory**: `dist`
4. Cloudflare will now also build and deploy your site on every commit.

## 5. Next Steps
- **Edit `astro.config.mjs`**: Update the `site` URL once you have your domain.
- **Customize Header**: Edit `src/components/Header.astro` to update the Nav links.
- **Start Bloggin!**
