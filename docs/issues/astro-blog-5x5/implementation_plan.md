# Implementation Plan - Refine iMac Disk Recovery Blog Post

## 1. Edit the Blog Post
- Modify `src/content/blog/2026/02/imac-disk-recovery-external-ssd-rsync.md`.
- Update the main `rsync` command to include `-c`.
- Add the `-c` flag description to the list of flags.
- Update the "Performance Notes" section to include the `--min-size=5M` command block and explanation of why it was faster.

## 2. Review and Verification
- Run `npm run build` to ensure no regressions.
- Verify the markdown formatting.

## 3. Completion
- Create a walkthrough of the changes.
- Close the issue and push the changes.
