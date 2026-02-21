# Walkthrough - Refine iMac Disk Recovery Blog Post

## Changes Made

### 1. Updated Blog Content
- **File**: `src/content/blog/2026/02/imac-disk-recovery-external-ssd-rsync.md`
- **Updated Main Command**: Added the `-c` (checksum) flag to the example `rsync` command.
- **Added Flag Documentation**: Explained that `-c` is essential when filesystem errors make modification times unreliable.
- **Added Optimization Example**: Provided a specific command using `--min-size=5M` to illustrate how to prioritize large files for faster initial transfer.
- **Refined Performance Notes**: Clarified that large files transfer faster and that a multi-stage `rsync` approach can be beneficial.

## Verification
- Verified the markdown syntax for the new code block.
- Ran build check to confirm the page generates correctly.

## References
- Issue: astro-blog-5x5
