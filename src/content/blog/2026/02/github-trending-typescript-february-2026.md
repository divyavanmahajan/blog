---
title: "Jan 2026 Top TypeScript Repos on GitHub"
description: "The top 17 TypeScript repos on GitHub for January 2026—AI coding agents, personal assistants, MCP, and the tools that support them."
pubDate: 2026-02-01
author: "Divya van Mahajan"
categories: ["Coding"]
tags: ["typescript", "github", "ai-agents", "open-source", "mcp"]
heroImage: "/images/github_trending_typescript_jan2026.png"
draft: false
---
The Jan 2026 top TypeScript repos on GitHub are a strong signal for where the ecosystem is heading. [https://github.com/trending/typescript?since=monthly](https://github.com/trending/typescript?since=monthly)

---

## 1. [openclaw/openclaw](https://github.com/openclaw/openclaw)

**One-line description:** Your own personal AI assistant. Any OS. Any Platform. The lobster way. 🦞

**Summary:**
- OpenClaw is a personal AI assistant you run on your own devices, answering on the channels you already use (WhatsApp, Telegram, Slack, Discord, Google Chat, Signal, iMessage, Microsoft Teams, WebChat, and more).
- It includes a Gateway control plane, multi-channel inbox, voice wake/talk mode for macOS/iOS/Android, and a live Canvas you can control; the Pi agent runs in RPC mode with tool and block streaming.
- Install via `openclaw onboard --install-daemon`; works with npm, pnpm, or bun and supports OAuth for Anthropic and OpenAI.

---

## 2. [anomalyco/opencode](https://github.com/anomalyco/opencode)

**One-line description:** The open source coding agent.

**Summary:**
- OpenCode is an open source AI coding agent similar in capability to Claude Code, with 100% open source code and no lock-in to a single provider (works with Claude, OpenAI, Google, or local models).
- It ships with two built-in agents: **build** (full access for development) and **plan** (read-only for analysis and exploration, with permission prompts before bash).
- Available as CLI (`curl -fsSL https://opencode.ai/install | bash`) and as a desktop app (BETA) for macOS, Windows, and Linux.

---

## 3. [remotion-dev/remotion](https://github.com/remotion-dev/remotion)

**One-line description:** Make videos programmatically with React.

**Summary:**
- Remotion is a framework for creating videos using React: you use components, composition, and the web stack (CSS, Canvas, SVG, WebGL) to define frames and timelines.
- You get variables, functions, APIs, and the npm ecosystem instead of a traditional video editor; Fast Refresh and the React model apply to video composition.
- Get started with `npx create-video@latest`; note that Remotion has a special license and may require a company license in some cases.

---

## 4. [Lissy93/web-check](https://github.com/Lissy93/web-check)

**One-line description:** All-in-one OSINT tool for analysing any website.

**Summary:**
- Web-Check gives a single dashboard to inspect a site’s infrastructure and security: IP info, SSL chain, DNS records, cookies, headers, crawl rules, server location, redirect chain, open ports, traceroute, DNSSEC, performance, trackers, carbon footprint, and more.
- It helps you understand, optimize, and secure a website; optional API keys (e.g. Google, Shodan, WhoAPI) unlock extra checks and higher rate limits.
- Deploy via Netlify, Vercel, Docker (`docker run -p 3000:3000 lissy93/web-check`), or from source; live demo at [web-check.xyz](https://web-check.xyz/).

---

## 5. [bytedance/UI-TARS-desktop](https://github.com/bytedance/UI-TARS-desktop)

**One-line description:** The Open-Source Multimodal AI Agent Stack: Connecting Cutting-Edge AI Models and Agent Infra.

**Summary:**
- The repo ships two things: **Agent TARS** (multimodal AI agent with CLI and Web UI, GUI + vision, MCP tools) and **UI-TARS Desktop** (native desktop app that controls your computer via natural language and the UI-TARS / Seed-1.5-VL models).
- Agent TARS can book flights, hotels, and draw charts using real browsers and MCP; UI-TARS Desktop supports local and remote computer/browser operators with screenshot recognition and precise mouse/keyboard control.
- Run with `npx @agent-tars/cli@latest` or install the desktop app; supports Volcengine/Anthropic and others.

---

## 6. [virattt/dexter](https://github.com/virattt/dexter)

**One-line description:** An autonomous agent for deep financial research.

**Summary:**
- Dexter turns complex financial questions into step-by-step research plans, runs them with live market data, and refines answers with self-validation and loop/step limits.
- It uses intelligent task planning, autonomous tool execution, and access to income statements, balance sheets, and cash flows; optional Exa or Tavily keys improve web search.
- Built with Bun; run `bun start` for interactive mode; evals and LangSmith logging are included; tool calls are logged to `.dexter/scratchpad/` for debugging.

---

## 7. [badlogic/pi-mono](https://github.com/badlogic/pi-mono)

**One-line description:** AI agent toolkit: coding agent CLI, unified LLM API, TUI & web UI libraries, Slack bot, vLLM pods.

**Summary:**
- Pi monorepo provides a unified multi-provider LLM API (pi-ai), agent runtime with tools (pi-agent-core), interactive coding agent CLI (pi-coding-agent), Slack bot (pi-mom), TUI library (pi-tui), web chat components (pi-web-ui), and vLLM pod management (pi-pods).
- It’s the foundation used by OpenClaw and similar projects; you get one stack for building and running AI coding agents and UIs.
- Develop with `npm install`, `npm run build`, `npm run check`; run the coding agent from repo root with `./pi-test.sh`.

---

## 8. [numman-ali/openskills](https://github.com/numman-ali/openskills)

**One-line description:** Universal skills loader for AI coding agents — npm i -g openskills.

**Summary:**
- OpenSkills brings Anthropic’s skills system (SKILL.md) to every AI coding agent (Claude Code, Cursor, Windsurf, Aider, Codex, etc.) via a universal installer that syncs skills into AGENTS.md.
- You install from the Anthropic marketplace, any GitHub repo, or local path; agents load skills on demand with `npx openskills read <name>`, keeping context small.
- Use `npx openskills install anthropics/skills` and `npx openskills sync`; supports `--universal` for `.agent/skills/` in multi-agent setups.

---

## 9. [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin)

**One-line description:** Official Claude Code compound engineering plugin.

**Summary:**
- Compound Marketplace is a Claude Code plugin that implements compound engineering: Plan → Work → Review → Compound, so each unit of work makes the next easier via planning, review, and codified learnings.
- Commands include `/workflows:plan` (feature → implementation plans), `/workflows:work` (execute with worktrees/tasks), `/workflows:review` (multi-agent code review), and `/workflows:compound` (document learnings).
- Install in Claude Code with `/plugin marketplace add https://github.com/EveryInc/compound-engineering-plugin` and `/plugin install compound-engineering`; experimental OpenCode/Codex conversion via Bun CLI is included.

---

## 10. [cjpais/Handy](https://github.com/cjpais/Handy)

**One-line description:** A free, open source, and extensible speech-to-text application that works completely offline.

**Summary:**
- Handy is a cross-platform desktop app (Tauri: Rust + React/TypeScript) for privacy-focused speech-to-text: press a shortcut, speak, and have text pasted into any field without sending audio to the cloud.
- It uses local VAD (Silero), then Whisper or Parakeet models for transcription, with GPU acceleration when available; supports Windows, macOS, and Linux.
- Download from the releases page or [handy.computer](https://handy.computer); designed to be simple and forkable for accessibility and extensibility.

---

## 11. [danielmiessler/Personal_AI_Infrastructure](https://github.com/danielmiessler/Personal_AI_Infrastructure)

**One-line description:** Agentic AI Infrastructure for magnifying HUMAN capabilities.

**Summary:**
- PAI (Personal AI Infrastructure) is a goal-oriented, human-centric platform that turns Claude Code (or other agents) into a persistent assistant with memory, skills, and continuous learning rather than a stateless task runner.
- It uses TELOS (10 files for mission, goals, beliefs, etc.), a skill system (CODE → CLI → prompt → skill), memory and hooks, and installable Packs/Bundles; full release install copies a complete `.claude/` in minutes.
- Install via full release (recommended), Bundle + packs, or individual packs; supports voice (ElevenLabs), notifications (ntfy, Discord), and a terminal status line; goal is to activate people and make strong AI infrastructure widely accessible.

---

## 12. [darrenhinde/OpenAgentsControl](https://github.com/darrenhinde/OpenAgentsControl)

**One-line description:** AI agent framework for plan-first development workflows with approval-based execution. Multi-language support (TypeScript, Python, Go, Rust) with automatic testing, code review, and validation built for OpenCode.

**Summary:**
- OpenAgentsControl (OAC) teaches agents your coding patterns via a context system (ContextScout); agents propose plans, you approve, then they implement with validation—aiming for production-ready code without heavy refactoring.
- It emphasizes approval gates (no execution without your OK), MVI token efficiency, editable agents (markdown), and team-shared context in `.opencode/context/project/` committed to the repo.
- Install with `curl -fsSL .../install.sh | bash -s developer`; use `opencode --agent OpenAgent` or OpenCoder; works with any model and integrates with OpenCode.

---

## 13. [lobehub/lobehub](https://github.com/lobehub/lobehub)

**One-line description:** The ultimate space for work and life — to find, build, and collaborate with agent teammates that grow with you.

**Summary:**
- LobeHub is a work-and-life space for creating and collaborating with AI agents: agents as the unit of work, Agent Groups for teamwork, Pages/Schedule/Project/Workspace, and Personal Memory so agents learn from how you work.
- It offers 10,000+ skills/MCP plugins, multi-model and local LLM support (e.g. Ollama), Chain of Thought, branching conversations, artifacts, file/knowledge base, TTS/STT, text-to-image, and PWA/desktop.
- Self-host on Vercel, Zeabur, Sealos, Alibaba Cloud, or Docker; supports Better Auth and optional server-side DB; ecosystem includes @lobehub/ui, icons, TTS, and lint packages.

---

## 14. [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp)

**One-line description:** Chrome DevTools for coding agents.

**Summary:**
- chrome-devtools-mcp is an MCP server that gives AI coding assistants (Gemini, Claude, Cursor, Copilot, etc.) control over a live Chrome instance: automation, performance traces, network inspection, screenshots, and console messages.
- It uses Puppeteer for reliable automation and Chrome DevTools for performance insights; you can connect to an existing Chrome (e.g. `--browser-url=http://127.0.0.1:9222`) or let it launch its own.
- Add to any MCP client with `npx -y chrome-devtools-mcp@latest`; supports headless, viewport, proxy, and category toggles; note that browser content is exposed to the MCP client.

---

## 15. [nocodb/nocodb](https://github.com/nocodb/nocodb)

**One-line description:** A Free & Self-hostable Airtable Alternative.

**Summary:**
- NocoDB turns MySQL, PostgreSQL, SQL Server, SQLite, and MariaDB into a smart spreadsheet UI: grids, gallery, form, Kanban, calendar, sharing, roles, and rich cell types (lookup, rollup, formula, attachment, etc.).
- It includes an App Store for workflow automations (chat, email, storage), REST APIs, and an SDK; you keep your data in your own DB and avoid vendor lock-in.
- Run with Docker (SQLite or PG), auto-upstall script, or binaries; mission is to be the most powerful no-code database interface for every internet business.

---

## 16. [modelcontextprotocol/ext-apps](https://github.com/modelcontextprotocol/ext-apps)

**One-line description:** Official repo for spec & SDK of MCP Apps protocol — standard for UIs embedded in AI chatbots, served by MCP servers.

**Summary:**
- MCP Apps extend MCP so tools can declare interactive UI resources (`ui://`); the host fetches and renders them in a sandboxed iframe, with bidirectional communication between UI and host.
- The repo provides the spec (SEP-1865), SDK for app developers (`@modelcontextprotocol/ext-apps` and React hooks), and SDK for hosts (`app-bridge`); inspired by MCP-UI and OpenAI Apps SDK.
- Install with `npm install -S @modelcontextprotocol/ext-apps`; examples include map, Three.js, Sheet Music, budget allocator, PDF, and more; optional Claude Code plugin for building MCP Apps.

---

## 17. [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)

**One-line description:** A Claude Code plugin that automatically captures everything Claude does during your coding sessions, compresses it with AI, and injects relevant context back into future sessions.

**Summary:**
- Claude-Mem keeps context across sessions by capturing tool-use observations, generating semantic summaries, and storing them in SQLite (with optional Chroma for hybrid search); future sessions get relevant context automatically.
- It uses lifecycle hooks (SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd), a worker on port 37777 with web viewer and search API, and a mem-search skill plus MCP tools (search, timeline, get_observations) with progressive disclosure for token efficiency.
- Install via `/plugin marketplace add thedotmack/claude-mem` and `/plugin install claude-mem`; supports `\<private>` tags, configurable context injection, and beta features like Endless Mode; requires Node 18+, Claude Code, Bun, and optionally uv for vector search.

---

*Source: GitHub trending TypeScript (monthly). Summaries based on project READMEs for January 2026.*
