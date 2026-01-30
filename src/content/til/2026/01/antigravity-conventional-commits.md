---
title: "Configure Antigravity for Conventional Commits and GitHub Issues"
description: "TIL how to set up Antigravity to follow conventional commit standards and create GitHub issues before implementation."
pubDate: 2026-01-30
tags: ["antigravity", "git", "github", "ai"]
draft: false
---

Today I learned how to configure Google's Antigravity agent to follow conventional commit standards and integrate with GitHub issues for proper change management.

## The Setup

Add this prompt to your **Global rules** (in `~/.gemini/GEMINI.md`) or **Project rules** (in `.gemini/GEMINI.md` at your project root):

```markdown
Always use Conventional commit style for git commits. This is explained at 
https://www.conventionalcommits.org/en/v1.0.0/

If the project is a Github repo, then any change, new feature, should be 
documented as a user story in a Github issue. Display the issue and ask 
questions before implementing the issue. After implementation, the commit 
should refer to this issue.
```

For closing the issue, use the following prompt:

```markdown
After implementing the feature, prompt the user whether to close the issue. Save the task, implementation plan and walkthrough in docs/{issue-number}/ in an issue subfolder of the "docs" folder in the root of the repository.
```

1. **Create GitHub issues first** - Before implementing features, it creates a user story issue and asks clarifying questions
2. **Use conventional commits** - All commits follow the format:
   ```
   feat(scope): add new feature
   fix(auth): resolve login timeout
   docs: update README
   ```
3. **Reference issues in commits** - Each commit links back to its issue:
   ```
   feat(blog): add TIL section

   Closes #42
   ```

## Global vs Project Rules

| Location | Scope |
|----------|-------|
| `~/.gemini/GEMINI.md` | Applies to all projects |
| `.gemini/GEMINI.md` | Applies to specific project only |

Use global rules for universal preferences. Use project rules for repo-specific conventions.

## Why This Matters

- **Traceability** - Every change links to a documented decision
- **Clean history** - Conventional commits enable automated changelogs
- **Better collaboration** - Issues provide context before code is written
- **Review workflow** - Questions get answered before implementation begins

This turns Antigravity from a code generator into a proper development partner that follows your team's workflow.
