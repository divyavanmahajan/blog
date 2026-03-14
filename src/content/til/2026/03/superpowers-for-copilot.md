---
title: "Agentic Superpowers for Copilot CLI"
description: "How to install and use the Superpowers skills framework to give Copilot CLI a structured, agentic software development workflow."
pubDate: 2026-03-14
tags: ["copilot", "ai", "workflows", "agents"]
draft: false
---

Today I learned about **Superpowers**, an agentic skills framework and software development methodology originally created by [Jesse Vincent](https://github.com/obra/superpowers), and its specific port for the Copilot CLI by [jsloat](https://github.com/jsloat/superpowers-for-copilot).

## The Problem

Out of the box, AI coding assistants often lack a structured, reliable workflow. Left to their own devices, they might skip tests, charge into writing code without a plan, or hallucinate fixes during debugging. You need a way to enforce rigorous software engineering practices (like TDD, systematically debugging, and writing plans) across your AI agents.

## The Solution

**Superpowers** is a complete software development workflow built on top of composable "skills." These skills are essentially markdown documents containing strict instructions that the agent must read and follow before executing certain tasks.

The [superpowers-for-copilot](https://github.com/jsloat/superpowers-for-copilot) fork adapts this framework to work specifically with GitHub Copilot CLI.

### Installing in Copilot

Here are the steps to integrate the skills into Copilot CLI:

1. **Clone the repository and create a symlink:**
   It is recommended to create a stable path so your configuration remains intact regardless of where you clone the repo.
   ```bash
   git clone https://github.com/jsloat/superpowers-for-copilot.git ~/projects/superpowers-for-copilot
   ln -s ~/projects/superpowers-for-copilot/skills ~/.copilot/superpowers-skills
   ```

2. **Update Copilot Instructions:**
   You can add these instructions globally (`~/.copilot/copilot-instructions.md`) or per-repository (`.github/copilot-instructions.md`).
   
   Add the following snippet to your instructions file:
   ```markdown
   # Superpowers Skills System
   Before starting any significant work, check if a relevant skill applies from the superpowers library.
   Skills location: ~/.copilot/superpowers-skills/
   
   ## Core Skills to Consider
   - **using-superpowers**: Read first - explains how skills work
   - **brainstorming**: Use before any creative work (features, components, modifications)
   - **test-driven-development**: Use when implementing any feature or bugfix
   - **systematic-debugging**: Use when encountering any bug or unexpected behavior
   - **writing-plans**: Use when you have specs for multi-step tasks
   - **verification-before-completion**: Use before claiming work is complete
   
   When a skill might apply (even 1% chance), read the SKILL.md file and follow it. Skills are NOT optional. If a skill applies, use it.
   ```

3. **Alternative method using the `/skills` command:**
   Alternatively, you can manually add skills within the Copilot CLI interface:
   ```bash
   /skills add ~/.copilot/superpowers-skills/using-superpowers
   /skills add ~/.copilot/superpowers-skills/test-driven-development
   ```

## Why This Matters

By forcing the AI to consult a `SKILL.md` file before starting work, you shift the AI from being a passive autocomplete tool into a disciplined software engineer. It forces the agent to brainstorm, write plans, use standard debugging practices, and employ Test-Driven Development (TDD) consistently, leading to much higher quality, reliable code generation.
