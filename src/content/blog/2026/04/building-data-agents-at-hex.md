---
title: "Building Data Agents at Hex: From Text-to-SQL to Multi-Agent Systems"
description: "My learnings from the Max Agency podcast with Izzy Miller—how Hex evolved from single-shot SQL to a full multi-agent notebook platform, and what it took to get there."
pubDate: 2026-04-12
author: "Divya van Mahajan"
categories: ["AI"]
tags: ["ai-agent", "agents", "data-analytics", "evaluation", "llm", "hex", "notebooks"]
heroImage: "/images/building-data-agents-at-hex-hero.png"
linkedin: true
linkedinMessage: "How do you build agents that actually reason about data? My notes from the Max Agency podcast with Izzy Miller at Hex—covering multi-agent architecture, evaluation philosophy, and a 90-day simulation benchmark."
series: "ai_agents-009"
draft: false
---

# Introduction

I've been listening to the **Max Agency** podcast — a series from LangChain focused on the deep technical details of agent building. This post is me recording my learnings from the inaugural episode, where the guest is **Izzy Miller**, AI Engineer at **Hex**.

Hex is a notebook-based data analytics platform, and Izzy walks through how they evolved from simple cell-scoped text-to-SQL into a suite of converging multi-agent systems. There's a lot of wisdom here about context design, evaluation, and what it actually takes to build agents for a domain as messy and iterative as data analytics.

[Source Video: https://www.youtube.com/watch?v=Xyh1EqcjGME](https://www.youtube.com/watch?v=Xyh1EqcjGME)

---

## From Single-Shot Text-to-SQL to Agentic Notebooks

Hex started with cell-scoped AI: open a SQL cell, describe what you want, get a query back. This worked for simple lookups but was described as "uniquely cursed" for data analytics—because **data work is inherently iterative**. An answer to one question almost always raises follow-up questions.

Two catalysts pushed Hex toward full agentic notebooks:
1. Model capability had raced ahead of how they were using it — like "a high-horsepower beast driving 25 in a school zone."
2. Single-shot just wasn't good enough.

When the notebook agent (this worked on the context of the whole notebook rather than just one cell)shipped internally overnight, the team "freaked out" — it was a step-change in experience.

---

## What the Notebook Agent Does

The notebook agent operates inside the Hex notebook, writing SQL cells, Python cells, charts, and text cells in real time — just like a human analyst would. One interesting wrinkle: it can also issue **ephemeral (scratchpad) SQL queries** that are invisible to the user. These are used for fast investigative checks (column formats, join validity) *before* committing to a visible query.

The goal is to expose every capability of Hex — every button in the proverbial Microsoft Word — through a single natural language entry point.

### The Ephemeral Query Trade-off

Ephemeral queries help the agent write a more correct visible query on the first attempt. But there's a cost: the agent can spiral into 50+ ephemeral queries on complex questions, then surface only a plain-text answer with no chart or code cell — essentially saying "take my word for it." That frustrates users who expect to see work. There is also a trade off on how much visibility you want to give the user vs how much you want the agent to be able to do on its own. As tasks become more complex, the agent needs more visibility into the data to be able to reason about it correctly, but this could easily overwhelm the user. Izzy talks about this conundrum in the podcast.

---

## Architecture: Context Over Loop Complexity

The core loop is an LLM running in a loop calling tools. As Izzy puts it: "fine piece of engineering but it does kind of boil down to just that."

The *real* engineering effort goes into:

- **Context harvesting** — dynamic context (harvested at runtime from notebooks, threads, conversations) vs. static context (system prompt, guides, skills).
- **Behavioral finicky details** — last-turn wrapping, iteration ceilings, compaction timing.
- **Orchestration** — Hex built its own orchestrator first, then migrated to **Temporal** for proper long-running workflow management.

Notably, many early compensations (complex ID-remapping to prevent artifact hallucination in large notebooks) are being *removed* because modern models no longer need them.

---

## Multiple Agents, Then Unification

Hex has several agents:

| Agent | Audience | Capabilities |
|---|---|---|
| **Notebook Agent** | Technical users | Full Python/SQL/chart; visible cells |
| **Threads Agent** | Non-technical users | Chat-style; code is hidden; interactive artifacts |
| **Semantic Authoring Agent** | Data teams | Writes YAML for semantic models |
| **Context Agent** (internal) | Internal | Synthesizes context across workspace |
| **Chat-with-App Agent** | End users | Threads-like on top of a published Hex app |

Users started noticing capability inconsistencies across agents ("why can't Threads write Python?"). The solution: **capability bundles** — tools + static context + prompts + behavioral rules packaged together and selectively applied per agent.

---

## Tool Management at Scale

Hex's total tool token footprint: "not quite 100,000 tokens worth of tools" — which Izzy acknowledges is too many. Reduction strategies include:

1. **Consolidation** — create/update/delete chart → single chart tool.
2. **Tool search/retrieval** — present only a relevant subset of tools per turn, avoiding the full context overhead.

Specific tools over generic "run arbitrary code" tools are preferred because they allow behavioral guidance — but this creates tool explosion. Modern models left unconstrained can reach for unexpected patterns (Izzy mentions GPT-5.4 spontaneously using Perl commands), which is an argument for explicit tooling.

---

## Context, Memory, and the Danger of Conflicting Information

One of the more striking findings: **injecting contradictory context into Claude Sonnet caused the model to enter a "collapse mode"** — spending 30 minutes oscillating and pondering rather than acting.

The governance hierarchy Hex uses:
1. Admin semantic models
2. Team guides
3. (cautiously) User memory

User-level memory is kept strictly separate from admin-level context precisely to avoid contamination.

Agents can also retrieve **guides** (skills/rules files) progressively as they run — similar to how a human might check a playbook mid-task.

---

## Observability and the Feedback Loop

Production observability uses **LLM-as-judge** to cluster failure types, with a privacy-preserving design: insights are derived from clustered patterns, not raw conversations.

**Context Studio** is the admin-facing interface: data teams can see question clusters, flagged conflicts with semantic models, and improvement recommendations. The question - is whether admins really want to be in the business of wading through the mass of conversations running in their organization.

Today's loop is human-in-the-loop: agent acts → error flagged → data team updates guides/semantic models. The future direction is a **context agent** that autonomously self-updates guides and semantic models.

Internal eval tooling lives in something called **the Shoebox** (named to be temporary; it stuck). It's being refactored from a high-priesthood internal tool into something any engineer can use.

---

## Evaluation Philosophy

Izzy is sharply critical of most public data benchmarks:

- Incorrect ground truths
- Bad grading scripts
- Conflating SQL syntax retrieval with genuine analytical reasoning
- Single-shot framing that doesn't reflect iterative data work

One benchmark he calls out reduces largely to a single esoteric rule (empty array vs. null) — not representative of real analytical skill.

His preferred eval structure:
- **Small, handcrafted, artisanal sets** (30–50 questions) covering distinct failure modes, run with multiple repetitions.
- **Two tiers**: (1) normal regression sets, and (2) aspirational hard sets where current models score ~20% at best.

The favorite: an internal sales quota dashboard with an **intentionally injected fan-out bug** that inflates all AE attainment to 900%. Every model celebrates "the best quarter ever" — and misses the bug. But if told "that doesn't seem right," they catch it in 10 seconds.

---

## Metric City: Long-Horizon Evaluation

Izzy is building **Metric City**, a benchmark motivated by a simple insight: one-try evals aren't honest for a platform designed to compound value over 90 days of use.

**Setup:**
- A Snowflake warehouse populated with realistic, messy business data for a fictional company ("Shoreline Commerce").
- Hand-injected data quality problems.
- DBT models tick the warehouse forward daily — new rows, broken pipelines, new products, fraud.
- The agent receives stakeholder email tickets to answer.
- After each ticket, the agent gets an optional "proactive knowledge work" turn — document findings, update a wiki, follow loose threads — before ending its turn.

**Results:**
- **Claude Sonnet 4.6: 4% on day 0, 24% on day 90.**
- Very expensive to run, but it measures something real and hard.

The benchmark is partly observational: watching how models choose to organize stored knowledge, what they retrieve, what they miss. Inspired by Anthropic/Andon Labs' **Vending Bench** (closed source). Izzy plans to open-source Metric City.

---

## Key Concepts

| Concept | Definition |
|---|---|
| **Ephemeral SQL** | Scratchpad queries used for fast data investigation, not written into the notebook. |
| **Capability Bundle** | Packaged set of tools, prompts, and behavioral rules — assignable to any agent for consistent cross-agent features. |
| **Dynamic vs. Static Context** | Dynamic is harvested at runtime; static is pre-loaded in the system prompt or capability definition. |
| **Guides** | Skills/rules files the agent can retrieve progressively while running. |
| **Context Studio** | Admin-facing observability interface for question clusters, agent errors, and semantic model conflicts. |
| **Tool Search** | Retrieval mechanism to present a relevant subset of tools on each turn, reducing context overhead. |
| **Metric City** | Izzy's 90-day long-horizon eval simulating a compounding business data environment. |
| **Vending Bench** | A long-horizon benchmark by Anthropic/Andon Labs, which inspired Metric City. |
| **LLM-as-Judge** | Using a language model to evaluate agent outputs or cluster failure types. |
| **Effort (model parameter)** | A dial for reasoning intensity — OpenAI internally calls it "juice." |
| **Shoebox** | Hex's internal eval runner, being refactored for broad engineering use. |

---

## Summary

Izzy Miller traces Hex's evolution from cell-scoped, single-shot text-to-SQL to a suite of converging agents capable of autonomous, multi-step data analysis across an entire notebook workspace.

The core architectural insight: **data work is irreducibly iterative, and agents succeed not because of a clever orchestration loop, but because of careful context design** — harvesting dynamic workspace context, organizing tools into capability bundles, tuning behavioral edge cases, and building tight observability feedback loops that let data teams continuously improve the context the agent operates on.

His answer to benchmark inadequacy is Metric City: a 90-day simulation where an agent accumulates knowledge and is scored on whether it reaches expert performance by day 90. Claude Sonnet 4.6 scoring 24% at day 90 isn't a failure — it's evidence the benchmark is measuring something genuinely hard.

