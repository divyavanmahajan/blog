# Divya's Blog

A minimalist technical blog built with [Astro](https://astro.build).

## Project Overview

This blog uses:
- **Astro v4** for static site generation.
- **Markdown** for content authoring.
- **GitHub Pages** for deployment.
- **GitHub Actions** for CI/CD.

## Documentation

- **[User Manual](./docs/user-manual.md)**: How to write posts and deploy.
- **[Architecture](./docs/architecture.md)**: Technical overview of the codebase.
- **[Project Spec](./docs/spec.md)**: Original design specifications.

## Local Development

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the dev server:
    ```bash
    npm run dev
    ```
4.  Visit `http://localhost:4321/blog/`

## Deployment

Pushes to the `main` branch automatically trigger a deploy to GitHub Pages via GitHub Actions.
