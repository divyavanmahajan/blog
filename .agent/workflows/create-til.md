---
description: Create a new TIL (Today I Learned) post.
---

Follow these steps to create a new TIL post:

1.  **Draft the Content**: Identify the topic and what was learned.
2.  **Determine the Path**: TILs are stored in `src/content/til/YYYY/MM/filename.md`. Use the current year and month. For example, for February 2026, it would be `src/content/til/2026/02/`.
3.  **Template**: Use the following structure, inspired by existing TILs:

```markdown
---
title: "TITLE"
description: "DESCRIPTION"
pubDate: YYYY-MM-DD
tags: ["tag1", "tag2"]
draft: false
---

Today I learned [summary of learning].

## The Problem

[Describe the context or the specific problem being addressed]

## The Solution

[Detail the steps, scripts, or techniques used to solve it]

```bash
# Example commands or code
```

## Why This Matters

[Explain the impact, such as token savings, performance, or simplified workflows]

## Complete Workflow

[Optional: A final summary of commands or steps]
```

4.  **Instructions**:
    *   **Do NOT create a Github issue or docs/issue or beads issue** for this workflow.
    *   Set `draft: false` in the frontmatter.
    *   Set `pubDate` to the current date (YYYY-MM-DD).
    *   Create any necessary parent directories (e.g., the month folder).
    *   Choose descriptive tags.
    *   Do not commit the change.
