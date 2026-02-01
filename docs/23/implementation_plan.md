# Implementation Plan - Issue #23: Upgrade LinkedIn script: Monthly/Weekly TIL summaries

## Problem
The current LinkedIn script only processes blog posts individually. It needs to be upgraded to aggregate TIL posts into weekly or monthly summaries for LinkedIn.

## Proposed Changes

1.  **CLI Argument Parsing**:
    -   Add support for `--period` argument (values: `month`, `week`).
    -   Default to `month`.

2.  **TIL Processing**:
    -   Scan `src/content/til` recursively.
    -   Read frontmatter (especially `pubDate`, `title`, and `description`).
    -   Group TILs by the selected period (Month or Week starting Monday).

3.  **Summary Generation**:
    -   Create a summary string for each period.
    -   Format:
        ```text
        [Short Intro about TILs from yyyy-mm-dd to yyyy-mm-dd]

        - Title: Summary (URL)
        - Title: Summary (URL)
        ```
    -   URL prefix: `https://www.wanmahajan.de`. Note: User said `wanmahajan` in point 5 but `vanmahajan` in previous requests. I will use `https://www.vanmahajan.de` as it matches the existing script and site URL, but I'll double check the prompt. The prompt specifically said `https://www.wanmahajan.de` in point 5 of the previous message. I will stick to what the user explicitly requested for the TIL links: `https://www.wanmahajan.de`.

4.  **Output File Management**:
    -   Create directories: `linkedin/til/monthly` and `linkedin/til/week`.
    -   Path: `linkedin/til/monthly/post-{yyyy-mm}.txt`
    -   Path: `linkedin/til/week/post-{yyyy-mm-dd}.txt`

## Verification Plan
- [ ] Run `node scripts/generate-linkedin.js --period=month`
- [ ] Run `node scripts/generate-linkedin.js --period=week`
- [ ] Verify the content of the generated files.
