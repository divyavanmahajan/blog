---
title: "Spec Engineering and Harness Engineering: The Future of AI-Native Development"
description: "From 'vibe coding' to structured spec engineering and harness engineering as the foundation for building with AI agents."
pubDate: 2026-03-10
author: "Divya van Mahajan"
categories: ["AI"]
tags: ["spec-engineering", "harness-engineering", "ai-agents", "software-development"]
heroImage: "/images/spec-and-harness-engineering-hero.png"
linkedin: true
linkedinMessage: "Beyond 'vibe coding': Discover how Spec-Driven Development and Harness Engineering are reshaping the way we build production software with AI agents."
series: "ai_agents-007"
draft: false
---

# Introduction

Building software with AI agents has undergone a rapid evolution. We started with \"code completion\" then moved o \"vibe coding\"—a conversational flow where you gave the intent and code appeared. But as we move from quick prototypes to complex, production-grade systems, the \"vibes\" alone aren't enough. We need something more persistent, rigorous, and scalable. Welcome to the era of **Spec Engineering** and **Harness Engineering**.

## From Vibe Coding to Spec Engineering

Here, I've gathered ideas from a few blog posts - which I recommend that you read if this is interesing for you. 

[Vibe Coding Meets Spec Engineering – What Building With AI Agents Really Looks Like](https://chinnychukwudozie.com/2026/03/10/vibe-coding-meets-spec-engineering-what-building-with-ai-agents-really-looks-like/) by Chinny Chukwudozie.

Vibe coding is the practice of coding by intent rather than implementation. You describe what you want, and iterate through feedback loops. While it’s perfect for rapid exploration and overcoming the initial \"activation energy\" of a project, it hits a wall as complexity grows. The AI agent lacks \"institutional memory\"; it forgets past bugs, project-specific conventions, and the rationale behind previous decisions. Every session feels like starting from zero, often leading to re-correcting the agent on the same technical debt or architectural mistakes.

Spec engineering solves this by treating specifications as persistent instructions for AI agents. By maintaining structured markdown files like `AGENTS.md` (for repo maps and rules) or `LESSONS.md` (for accumulated pitfalls) directly in the repository, you create a dedicated memory layer. The agent reads these files automatically every session, ensuring it adheres to your non-negotiable standards—like using specific tools (e.g., `uv`) or security protocols—without needing to be re-prompted.

The power of this approach lies in the combination: use vibe coding to explore and discover \"what's possible,\" then use spec engineering to capture and accumulate \"what's right.\" It transforms the AI agent from a fleeting collaborator into a deeply integrated team member that understands the project's long-term soul and constraints.

## Spec-Driven Development (SDD)

Building on these concepts, [Spec-Driven Development (SDD)](https://agentfactory.panaversity.org/docs/General-Agents-Foundations/spec-driven-development) represents a fundamental paradigm shift. In SDD, the specification is the primary artifact of software development, while the code is merely a generated output derived from those high-quality specs.

Rather than discovering requirements through iterative conversation, SDD demands comprehensive specifications upfront. This ensures the agent receives a complete picture of the \"what,\" the \"why,\" and the \"what NOT to build.\" Frameworks implementing this approach often utilize a \"Project Constitution\" (like a `CLAUDE.md` file) to govern all sessions and subagents. For a visual breakdown of this workflow, see the [SDD Teaching Aid Slides](https://pub-80f166e40b854371ac7b05053b435162.r2.dev/books/ai-native-dev/static/slides/part-1/chapter-05/spec-driven-development.pdf).

Key patterns in SDD include:
- **Spec-First**: Designing the entire specification before any code is written.
- **Dependency-Aware Orchestration**: Using systems (like the native Tasks system in Claude Code) to handle implementation delegation with ordered dependencies and atomic commits.
- **Parallel Research**: Utilizing subagents to explore different parts of a problem space before converging on a final specification.

### Practical Spec-Driven Development: Claude Kiro

For those using Claude Code, a prime example of this methodology in action is [Claude Kiro](https://angelsen.github.io/claude-kiro/). It provides a structured CLI and slash-command interface to manage the SDD lifecycle within your repository.

The Kiro workflow follows a rigorous three-phase process:
1.  **Phase 1: Requirements**: Uses [EARS notation](https://angelsen.github.io/claude-kiro/examples.html#ears-template) (`WHEN [condition] THE SYSTEM SHALL [behavior]`) to define functional needs without ambiguity.
2.  **Phase 2: Design**: Maps out the architecture, data models, and testing strategy before any code is generated.
3.  **Phase 3: Tasks**: Breaks down the design into discrete, dependency-aware implementation tasks with clear acceptance criteria.

By using commands like `/spec:create` and `/spec:implement`, developers can maintain a persistent history of features in a `.claude/specs/` directory. This ensures that every coding session is anchored in a verified specification, preventing the "context drift" that often plagues long-lived projects.

### Superpowers: Enforcing Senior Developer Disciplines

While Kiro focuses on the specification lifecycle, [Superpowers](https://github.com/obra/superpowers) (by Jesse Vincent) takes the concept of an "agent harness" even further. It transforms coding agents from reactive assistants into disciplined "senior developers" by enforcing a specific set of agentic skills and workflows.

The magic of Superpowers lies in its ability to:
- **Enforce TDD**: It mandates a strict RED-GREEN-REFACTOR cycle. The agent *must* write a failing test before touching the application code.
- **Composable Skills**: It uses "skills"—folders of instructions—that the agent loads dynamically. This minimizes context bloat while providing deep expertise for specific tasks like brainstorming, planning, or refactoring.
- **Autonomous Subagents**: It can orchestrate parallel engineering tasks via subagents, each governed by two-stage reviews for both spec compliance and code quality.

Superpowers effectively acts as a pre-built harness for your project. Instead of you manually checking if the agent used the right package manager or wrote a test, the framework itself makes those professional habits non-negotiable.

## Harness Engineering: Building the Agent Environment

While Spec Engineering focuses on *what* the agent should do, **Harness Engineering** focuses on *how* it is supported and constrained. As detailed in OpenAI's [Harness Engineering](https://openai.com/index/harness-engineering/) post, this methodology shifts the human engineer's role from writing code to designing the environments where agents can thrive.

OpenAI's team demonstrated this by building a product with **zero human-written lines of code**. The work wasn't just about prompting; it was about building a \"harness\"—a suite of scaffolding, constraints, and feedback loops. Harness Engineering is generally organized into three key practices:

1. **Context Engineering**: Ensuring the agent has the right dynamic and static information at the right time. This includes repo maps, API contracts, and even live observability data like logs and CI/CD status. If an agent can't \"see\" it in context, it doesn't exist.
2. **Architectural Constraints**: Instead of hoping an agent writes \"good code,\" you mechanically enforce it. This involves deterministic linters, LLM-based auditors, and structural tests that block violations of architectural layers before they can be merged.
3. **Entropy Management (Garbage Collection)**: AI agents can generate code with massive velocity, which can lead to rapid technical debt. Background agents are used to scan for divergence, update documentation, and automatically open refactoring pull requests to maintain architectural integrity.

### Practical Practices for Harness Engineering

To implement a robust harness, OpenAI recommends several practical practices:
- **Build the \"Agent Constitution\"**: Just as we have `spec.md`, the harness needs an `AGENTS.md` file that defines non-negotiable rules (e.g., \"No secrets in code\", \"Use uv for package management\").
- **LLM-Based Auditing**: Use a \"second opinion\" agent to audit PRs specifically for architectural divergence or security flaws that static linters might miss.
- **Structural Testing**: Implement tests that validate the *structure* of the code (e.g., package layering) rather than just the logic.
- **Continuous Garbage Collection**: Treat technical debt as a background process. If an agent notices an outdated pattern, its first task should be to refactor it across the repository.

By focusing on the harness, engineers enable agents to execute with extreme velocity while maintaining a level of quality and consistency that was previously only possible through manual human oversight.

***

# References

1. [Vibe Coding Meets Spec Engineering](https://chinnychukwudozie.com/2026/03/10/vibe-coding-meets-spec-engineering-what-building-with-ai-agents-really-looks-like/) - Chinny Chukwudozie
2. [Spec-Driven Development with Claude Code](https://agentfactory.panaversity.org/docs/General-Agents-Foundations/spec-driven-development) - Agent Factory
3. [Claude Kiro](https://angelsen.github.io/claude-kiro/) - Spec-Driven Development CLI
4. [Superpowers](https://github.com/obra/superpowers) - Agentic skills framework
5. [Specification Grounding: The Missing Link in Vibe Coding](https://unstract.com/blog/specification-grounding-vibe-coding/) - Unstract
6. [Harness Engineering](https://openai.com/index/harness-engineering/) - OpenAI

