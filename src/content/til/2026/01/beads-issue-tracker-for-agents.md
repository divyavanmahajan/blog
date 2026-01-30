---
title: "Beads: A Memory Upgrade for AI Coding Agents"
description: "TIL about beads (bd), a git-backed issue tracker designed for AI coding agents like Cursor."
pubDate: 2026-01-30
tags: ["cursor", "ai", "devtools", "git"]
draft: false
---

Today I learned about [Beads](https://github.com/steveyegge/beads) (`bd`)—a distributed, git-backed issue tracker specifically designed for AI coding agents. It provides persistent, structured memory so agents can handle long-horizon tasks without losing context.

## The Problem

AI coding agents struggle with complex, multi-step tasks because they lose context between sessions. Beads replaces messy markdown plans with a dependency-aware graph that persists across sessions and syncs via git.

## Installation

```bash
# One-liner install
curl -fsSL https://raw.githubusercontent.com/steveyegge/beads/main/scripts/install.sh | bash

# Or via package managers
brew install beads
npm install -g @beads/bd
```

## Setting Up with Cursor

1. **Initialize in your project:**
   ```bash
   cd your-project
   bd init
   bd migrate sync beads-sync
   ```

2. **Tell Cursor about it**:
   ```bash
   bd setup cursor
   ```

3. **For open-source work** on forked repos, use contributor mode:
   ```bash
   bd init --contributor
   ```
   This routes planning issues to `~/.beads-planning` to keep experimental work out of PRs.

## Essential Commands

```bash
bd ready                    # Find available work
bd create "Title" -p 0      # Create a priority 0 task
bd show <id>                # View issue details
bd update <id> --status in_progress  # Claim work
bd close <id>               # Complete work
bd sync                     # Sync with git
```

## Key Features

- **Git as database** - Issues stored as JSONL in `.beads/`, versioned like code
- **Hash-based IDs** (e.g., `bd-a1b2`) prevent merge conflicts in multi-agent workflows
- **Hierarchical tasks** - Epics → Tasks → Sub-tasks (`bd-a3f8` → `bd-a3f8.1` → `bd-a3f8.1.1`)
- **Memory decay** - Semantic compaction summarizes old closed tasks to save context window
- **Stealth mode** - `bd init --stealth` for local-only use without committing to repo

## Status with Antigravity

I haven't yet figured out how to make beads work with Google's Antigravity agent. The integration seems straightforward for Cursor and GitHub Copilot, but Antigravity's memory system works differently. Still exploring options—if you've cracked this, let me know!


