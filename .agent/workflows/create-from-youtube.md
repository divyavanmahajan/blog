---
description: Create a new blog post or TIL from a YouTube video using yt-instruct.
---

Follow these steps to turn a YouTube video into a blog post or TIL:

## Step 1 — Gather information

Ask the user for the following (all required):

1. **YouTube URL** — full URL, e.g. `https://www.youtube.com/watch?v=Xyh1EqcjGME`
2. **Post type** — `blog` or `til`
3. **Content type** — choose one:
   - `auto` — let the LLM detect (default)
   - `lecture` — tech talks, conference presentations, academic talks
   - `tutorial` — how-to / step-by-step videos
   - `ib` — IB student subject videos

## Step 2 — Load API keys and run yt-instruct

API keys are stored in `.env.local` (git-ignored). Load them and run the tool:

```bash
set -a && source .env.local && set +a && \
uvx yt-instruct "{URL}" \
  --content-type {content_type} \
  --keep \
  --output-dir experiments/
```

> **Note:** `--keep` retains the intermediate `*_transcript.txt` file alongside the generated markdown, which enables `--resume` if the run is interrupted.
>
> `.env.local` must exist and contain `MISTRAL_API_KEY` and `ANTHROPIC_API_KEY`. If it is missing, copy `.env.local.example` to `.env.local` and fill in the real keys. Run `uvx yt-instruct --help` to see all options.

The tool will generate a file named `{video_id}_instructions.md` inside `experiments/`.

## Step 3 — Identify the generated file

The output filename is derived from the YouTube video ID. For example:
- URL `https://www.youtube.com/watch?v=Xyh1EqcjGME` → `experiments/xyh1eqcjgme_instructions.md`

Read the generated file. It contains:
- YAML frontmatter: `title`, `url`, `description`, `date`, `draft`
- Structured sections: Overview, Prerequisites, Main Points, Key Concepts, Summary

## Step 4 — Create the blog or TIL

Use the content from the generated `_instructions.md` file as the **source material**. Then invoke the appropriate existing workflow:

### If post type is `blog`:
Follow the `/create-blog` workflow.
- Use the `title` from the generated frontmatter as the starting point for the blog title.
- Use the `description` from the frontmatter as the basis for the meta description.
- Use the `url` field to add a **Source** link at the top or bottom of the post.
- Synthesise the Overview, Main Points, Key Concepts and Summary sections into blog sections — do not copy verbatim; rewrite in the blog voice.
- Run `/blog-image` to generate a hero image after drafting.

### If post type is `til`:
Follow the `/create-til` workflow.
- Keep the TIL concise — focus on the single most important insight from the video.
- Include the source video URL as a reference link.
- Structure around: **The Problem / Context**, **The Solution / Insight**, **Why This Matters**.

## Step 5 — Instructions

- **Do NOT create a Github issue or docs/issue or beads issue** for this workflow.
- Set `draft: false` in the frontmatter.
- Set `pubDate` to today's date (YYYY-MM-DD).
- The generated `experiments/{video_id}_instructions.md` file is **source material only** — do not commit it.
- Do not commit the new blog/TIL file either (per the existing workflow rules).
