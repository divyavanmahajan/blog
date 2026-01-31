# Remove linkedin Folder from History Plan

## Goal
Purge the `linkedin` folder from the repository and its entire history to ensure no trace remains, and prevent future tracking.

## Proposed Changes

### 1. Git Ignore
- Add `linkedin/` to `.gitignore`.

### 2. History Purge
- Use `git filter-branch` to remove `linkedin/` from all commits:
  ```bash
  git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch -r linkedin' --prune-empty --tag-name-filter cat -- --all
  ```
- Alternatively, since `filter-branch` is deprecated and slow, if `filter-repo` is not available, I will use `git rm -r --cached linkedin` for the current state and then perform the filter-branch if the user is okay with the rewrite wait. (Actually, for a folder this small, it should be fast).

### 3. Verification
- Use `git log -- linkedin` to ensure no commits reference it.
- Check `.gitignore`.

## Warning
This will rewrite history and requires a force push.
