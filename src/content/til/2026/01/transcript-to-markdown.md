---
title: "Converting Firefly Transcripts to LLM-Friendly Markdown"
description: "TIL a two-step workflow to convert HTML transcripts to clean markdown for LLM processing."
pubDate: 2026-01-30
tags: ["python", "pandoc", "llm", "productivity"]
draft: false
---

Today I learned how to convert Firefly meeting transcripts (which export as HTML) into clean, simplified markdown that's much easier for LLMs to process.

## The Problem

Firefly transcripts come as HTML files packed with inline `data:image` tags (profile pictures, avatars), emoji characters, and HTML formatting. This bloat makes them slow to process and wastes tokens when feeding them to LLMs.

## The Solution: Two Scripts

### Step 1: HTML to Markdown with Pandoc

Use the `convert_html.py` script which wraps Pandoc for clean conversion:

```bash
# Basic conversion
python scripts/convert_html.py transcript.html

# Strip all HTML tags for cleaner output
python scripts/convert_html.py transcript.html --clean
```

**Prerequisites**: Install Pandoc first with `brew install pandoc`.

The `--clean` flag uses Pandoc's `-t gfm-raw_html` option, which outputs GitHub Flavored Markdown while stripping any residual HTML tags. This produces much cleaner output for LLM consumption.

### Step 2: Remove Embedded Images and Emojis

The converted markdown may still contain embedded `data:image` URIs and emoji characters. Clean these with `remove-images.py`:

```bash
# Remove data:image tags and emojis (default)
python scripts/remove-images.py transcript.md

# Preview what would be removed
python scripts/remove-images.py transcript.md --dry-run -v

# Keep emojis if needed
python scripts/remove-images.py transcript.md --keep-emojis
```

**Key options:**
- `--all-images`: Remove all images, not just data URIs
- `--no-backup`: Skip creating a `.bak` file
- `-d, --dry-run`: Preview changes without modifying the file

## Why This Matters

Firefly transcripts can contain hundreds of embedded profile images as base64 strings. A single avatar might be 50KB+ of text. Removing these drops the file size dramatically—often by 90% or more—making LLM processing faster and cheaper.

The cleanup also removes Unicode emoji characters that can cause encoding issues with some tools.

## Complete Workflow

```bash
# Convert HTML to Markdown
python scripts/convert_html.py meeting.html --clean

# Clean the result
python scripts/remove-images.py meeting.md --no-backup

# Now feed to your LLM!
```
