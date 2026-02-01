---
title: "Concurrent Subagents in Cursor and Gemini CLI"
description: "TIL about achieving parallel execution with subagents in modern AI development workflows."
pubDate: 2026-02-01
tags: ["ai", "subagents", "cursor", "gemini", "devtools"]
draft: false
---

Achieving concurrency with AI subagents is a significant step toward faster and more efficient development cycles. Both Cursor and Gemini CLI provide ways to handle complex tasks by delegating them to multiple subagents.

### Multiple Subagents in Cursor CLI

Cursor CLI has deep support for parallel execution of subagents. This allows you to break down a large feature or refactor into smaller, independent sub-tasks that can be worked on simultaneously.

- **Parallel Subagents**: Cursor 2.4+ allows you to spawn autonomous subagents that work in parallel. Each subagent maintains its own isolated context window, preventing the main conversation from becoming cluttered.
- **Git Worktree Integration**: To avoid file system conflicts, Cursor leverages Git worktrees. Each concurrent agent runs in its own worktree, allowing them to edit, build, and test code without interfering with other agents.
- **Independent Loops**: Subagents run their own tool-calling loops (researching, terminal commands, etc.), only returning to the main agent when their specific task is complete.

### Concurrency in Gemini CLI

While native subagent tool calls in Gemini CLI are currently sequential by default, there are several ways to achieve true parallel execution.

- **Agent Development Kit (ADK)**: The ADK provides a `ParallelAgent` class. You can compose multiple subagents under a `ParallelAgent`, which then manages their concurrent execution and aggregates their findings.
- **Spawning CLI Instances**: A common pattern is using the `shell` tool within Gemini CLI to launch new `gemini-cli` instances for sub-tasks. By running these instances in "YOLO mode" (`--yolo`), they can auto-approve tools and operate independently in parallel processes.
- **Remote Subagents**: Gemini CLI supports the Agent-to-Agent (A2A) protocol, allowing it to delegate work to remote subagents across the network.
- **Containerization**: For high-trust environments, subagents can be spawned in separate containers, providing both concurrency and strict environment isolation.

By leveraging these patterns, you can signicantly reduce the wall-clock time required for complex AI-driven code migrations and research tasks.
