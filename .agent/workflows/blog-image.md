---
description: Create a blog hero image.
---

Follow these steps to generate and integrate a hero image for a blog post:

1.  **Analyze Context**: Read the blog post's `title` and `description` from the frontmatter.
2.  **Draft Prompt**: Create a prompt for `generate_image`. The style should be:
    *   Clear, pastel colors.
    *   Professional and easy to view.
    *   Matches a modern, premium blog aesthetic.
    *   Avoid generic or cluttered designs.
3.  **Confirm with User**: Present the drafted prompt to the user and ask if they want any specific adjustments or if they are ready for generation.
4.  **Generate**: Once confirmed, use `generate_image` to create the asset.
5.  **Save Assets**:
    *   Save the original image to `public/images/` with a slugified-filename-hero.png.
    *   Create a secondary version with a **max 150px height** and save it to `public/images/icon/` with the same name.
6.  **Update Post**:
    *   Add the path to the `heroImage` field in the frontmatter (e.g., `heroImage: "/images/post-hero.png"`).
    *   Do not insert any image markdown tag.

**Instructions**:
*   **Do NOT create a Github issue or docs/issue or beads issue** for this workflow.
*   **Do not commit the change.**