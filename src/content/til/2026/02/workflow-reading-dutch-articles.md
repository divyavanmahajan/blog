---
title: "TIL: Workflow for Reading and Translating Dutch Physical Articles"
description: "A multi-step workflow using Mistral Document AI and custom scripts to digitize and translate magazine or newspaper articles."
pubDate: 2026-02-21
categories: ["Workflows", "AI"]
tags: ["Mistral-AI", "OCR", "Translation", "Productivity"]
draft: false
---

Reading articles in a unfamiliar language is a pain. I'm documenting the working that worked for me to read a multi-page Dutch article. Digitizing physical articles for translation is cumbersome. This workflow leverages Mistral AI's Document AI features to handle OCR and translation efficiently.

## The Digitization Workflow

### 1. Capture and Upload
Start by taking clear photos of the article pages.
- **Upload**: Use the [Mistral AI Studio Document AI Playground](https://console.mistral.ai/playground/document).
- **Processing**: Upload the images to extract text. Note that if you have more than one page in a single photo frame, you may need to spot-check the output.

### 2. Annotation and Cleanup
- **Page Numbers**: Manually insert page numbers at the top of the generated markdown files to maintain order during the merge process.
- **Editing**: Correct any OCR errors directly in the playground before downloading.

### 3. Merging Markdown Files
Once the markdown files are downloaded for each page, use a script to combine them. This ensures the document stays continuous and coherent.
- **Script**: Run a Python script to combine files in alphabetical/numerical order.
- **Reference**: [Combination Script Gist](https://gist.github.com/divyavanmahajan/df917ea361dd6ae5361ac4ec449ae556)

### 4. Translation
Take the `combined_markdown.md` file back to the Mistral AI Studio.
- **Goal**: Use the large context window and high reasoning capabilities of Mistral models to translate the entire Dutch article into your target language.
- **Benefit**: Translating the *combined* file (rather than individual pages) helps the AI maintain context and terminology consistency across the whole article.

This method transforms a stack of physical papers into a searchable, translated digital asset in minutes.
