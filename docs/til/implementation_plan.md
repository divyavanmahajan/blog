# TIL Feature Implementation Plan

Add a lightweight "TIL" (Today I Learned) section to the blog for quick notes. This feature mirrors the existing blog structure but with a simpler post format.

## Proposed Changes

### Content Collection Configuration

**[config.ts](../src/content/config.ts)**

Added `til` content collection with simplified schema:
- `title` - string (required)
- `description` - string (required)
- `pubDate` - date (required)
- `updatedDate` - date (optional)
- `tags` - array of strings (required)
- `draft` - boolean (default: false)

---

### Navigation Header

**[Header.astro](../src/components/Header.astro)**

Added "TIL" link to the navigation menu, positioned before "About".

---

### TIL Pages

| File | Description |
|------|-------------|
| `src/pages/til/index.astro` | TIL index with topic tag cloud and recent entries |
| `src/pages/til/[...slug].astro` | Individual TIL post pages |
| `src/pages/til/tags/[tag].astro` | Tag filter pages |
| `src/pages/til/rss.xml.js` | RSS/Atom feed |

---

### Content Directory

```
src/content/til/
├── 2026/
│   └── 01/
│       ├── sample-til.md
│       └── git-stash-message.md
```

---

## Verification

- Build completes without errors
- TIL index page renders with tag cloud and entry list
- Individual TIL posts display title, date, tags, content
- Tag filtering works correctly
- RSS feed generates valid XML
- TIL link appears in navigation header
