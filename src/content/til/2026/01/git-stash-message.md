---
title: "Git stash with a message"
description: "TIL you can add a descriptive message to git stash for easier identification later."
pubDate: 2026-01-26
tags: ["git"]
draft: false
---

Today I learned that you can add a descriptive message to `git stash` to make it easier to find later:

```bash
git stash push -m "WIP: implementing user auth"
```

When you run `git stash list`, you'll see your message instead of the default "WIP on branch":

```
stash@{0}: On main: WIP: implementing user auth
stash@{1}: WIP on main: abc1234 Previous commit message
```

Much easier to find the right stash when you have multiple!
