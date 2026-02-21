# Implementation Plan - iMac Disk Recovery Blog Post

## 1. Create the Blog Post File
- Create `src/content/blog/2026/02/imac-disk-recovery-external-ssd-rsync.md`.
- File content will follow the site's standard blog post format.

## 2. Content Structure
- **Introduction**: Describe the situation with the failing Fusion Drive on the 2016 iMac.
- **Preparation**: Connecting the Sandisk Extreme SSD and setting up APFS volumes.
- **Technical Deep Dive**:
    - Explain APFS volumes vs. partitions.
    - Explain the `rsync` command and its flags (`-a`, `-E`, `-H`, `-P`).
    - Note on `--min-size`/`--max-size` attempts.
- **Recovery Process**:
    - Reinstalling macOS Monterey on the external drive.
    - Using Migration Assistant to bring back the data.
- **Conclusion**: Final thoughts on using external SSDs as primary drives for older iMacs.

## 3. Review and Polish
- Ensure SEO best practices (title tags, meta descriptions, headings).
- Verify formatting and readability.

## 4. Documentation
- Create a walkthrough of the implementation.
- Update issue status and push changes.
