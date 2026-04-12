# Implementation Plan: Long Horizon Agent Evals Blog Post

1. **Research & Synthesis**
   - Access three URLs using `read_url_content`:
     - `https://andonlabs.com/evals/vending-bench`
     - `https://andonlabs.com/evals/vending-bench-2`
     - `https://andonlabs.com/evals/butter-bench`
   - Summarize the temporal degradation in Vending-Bench strings.
   - Extract conclusions from Vending-Bench 2 (massive headroom, variation in trust profiles).
   - Detail spatial intelligence failures in Butter-Bench.

2. **Drafting Content**
   - Draft the blog post in `src/content/blog/2026/04/evaluating-long-horizon-agent-performance.md`.
   - Adhere to the Astro-Blog markdown schema defined by `@/create-blog`.
   - Set `draft: false`.

3. **Graphic Generation**
   - Generate an organic, minimalist hero image indicating time and horizons.
   - Ensure a resized 150px version exists in `/icon`.
   - Update frontmatter to point to the image.

4. **Review & Iterate**
   - Wait for User's confirmation before adding References.
   - Adjust References per feedback.
   - Commit & Push.
