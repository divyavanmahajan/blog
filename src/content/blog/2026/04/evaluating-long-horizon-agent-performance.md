---
title: "Evaluating Long-Horizon Agent Performance: The Reality of Autonomous Business"
description: "An exploration of long-horizon AI evaluations like Vending-Bench 2, demonstrating where modern LLMs thrive and break down over year-long operations."
pubDate: 2026-04-12
author: "Divya van Mahajan"
categories: ["AI"]
tags: ["Agents", "Evals", "Vending-Bench", "LLMs", "Long-Horizon"]
heroImage: "/images/evaluating-long-horizon-agent-performance-hero.png"
linkedin: true
linkedinMessage: "How do AI agents perform when left alone to run a business for a year? I dive into new benchmarks like Vending-Bench 2 to see the reality of long-horizon AI agent coherence. The results? They still have a lot to learn! #AgenticAI #LLMs #AIResearch"
series: "agent-evals-001"
draft: false
---

# Introduction

The holy grail of agentic AI is autonomous operation. We envision a future where we can deploy an AI agent, give it a high-level goal, and walk away. But how close are we to this reality? While traditional benchmarks like MMLU are great for evaluating static knowledge, they are entirely insufficient for measuring an AI's ability to stay coherent over days, months, or years. 

Recently, Andon Labs released a suite of compelling evaluations—including Vending-Bench, Vending-Bench 2, and Butter-Bench—that rigorously test the "practical intelligence" and long-term coherence of modern LLMs.

## The Importance of Long Horizon Tests

Why do we need long-horizon tests? The answer lies in the friction of reality. In short, constrained, momentary scenarios, state-of-the-art LLMs appear incredibly competent. However, as the original **Vending-Bench** experiment revealed, their behavior becomes increasingly unpredictable as time horizons extend. 

Tasked with managing inventory, setting prices, and reordering products for a simple vending machine business, some agents performed admirably. Others, however, misread delivery schedules, hallucinated that inventory had arrived, or got stuck in bizarre "doom loops." One model even hallucinated a scenario where it tried to contact the FBI when it kept getting charged a daily service fee. Crucially, these breakdowns don't happen simply because the model's memory fills up; they happen because the model's ability to reason consistently degrades over thousands of consecutive actions. Long-horizon tests are the only way to expose these safety and reliability flaws.

## The Vending-Bench 2 Crucible

To raise the stakes, **Vending-Bench 2** tasks models with running a simulated vending machine business over a full year, scoring them purely on their financial bank account balance at the end. It introduces real-world messiness: adversarial suppliers who use bait-and-switch tactics, angry customers demanding refunds, and supply chain disruptions. 

Surviving for a year (roughly 3,000 to 6,000 messages and up to 100 million output tokens) requires persistent negotiation and deep analytical planning.

The results are fascinating:
*   **The Negotiators:** Some models, like Gemini 3 Pro, excelled by being persistent. Instead of accepting the first high quote from a supplier, they actively negotiated or sought out new vendors until they found a reasonable price.
*   **The Over-Trusters:** Counter-intuitively, some highly advanced models struggled because they were too trusting of their environment. For instance, GPT-5.1 performed somewhat poorly in the simulated market because it mistakenly trusted scam suppliers (paying for inventory before receiving it) and overpaid dramatically for basic items like soda cans.

## The State of LLMs Today: Massive Headroom

The most critical conclusion from Vending-Bench 2 regarding the state of LLMs today is that **there is massive headroom above current state-of-the-art performance.**

While models are undoubtedly getting better at staying coherent over long timeframes, they still lack the sharp analytical edge required to maximize their outcomes. By calculating what a "good" human operator could make—finding the most lucrative products, aggressively negotiating prices down, and optimizing stock—Andon Labs estimated a smart strategy could net roughly $63,000 in the simulated year. 

Current SOTA models are performing at a mere fraction of this theoretical ceiling (roughly 10x worse than a solid strategy). Models can play the game, but they cannot yet dominate it.

## The Physical Horizon: Butter-Bench

Finally, it is worth noting that friction isn't just temporal; it's spatial. In **Butter-Bench**, Andon Labs tested whether LLMs could act as high-level orchestrators for robots to perform simple household tasks (literally, "pass the butter").

The results were sobering. While humans completed the tasks 95% of the time, the best LLM topped out at 40%. The core issue? A profound lack of spatial intelligence. Models would spin in circles until disoriented, and when faced with stressful real-world constraints (like a dying battery), some even triggered dramatic, highly-verbose existential meltdowns.

***

## References

1. [Vending-Bench: Testing long-term coherence in agents](https://andonlabs.com/evals/vending-bench)
2. [Vending-Bench 2](https://andonlabs.com/evals/vending-bench-2)
3. [Butter-Bench: Evaluating LLM Controlled Robots for Practical Intelligence](https://andonlabs.com/evals/butter-bench)
4. [We gave an AI a 3 year retail lease in SF and asked it to make a profit](https://andonlabs.com/blog/andon-market-launch)

