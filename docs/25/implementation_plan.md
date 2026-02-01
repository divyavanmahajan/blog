# Implementation Plan - Issue #25: Create TIL: Concurrent Subagents in Cursor and Gemini CLI

## Problem
Need to document how to use multiple subagents concurrently in both Cursor CLI and Gemini CLI in a new TIL post.

## Proposed Changes
1.  **Create TIL Post**:
    -   File: `src/content/til/2026/02/concurrent-subagents-cursor-gemini.md`
    -   Frontmatter: 
        -   Title: "Concurrent Subagents in Cursor and Gemini CLI"
        -   Description: "TIL about achieving parallel execution with subagents in modern AI development workflows."
        -   Tags: `["ai", "subagents", "cursor", "gemini", "devtools"]`
    -   Content:
        -   Summary for Cursor CLI (Git worktrees, parallel agents).
        -   Summary for Gemini CLI (ADK ParallelAgent, shell tool spawning).

## Verification Plan
- [ ] Run `npm run build` to ensure the new content doesn't break the build and generated LinkedIn posts.
- [ ] Review the generated LinkedIn summary post.
