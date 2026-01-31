# Walkthrough - Remove linkedin Folder from History (#16)

I have completely removed the `linkedin` folder from the repository and purged all traces of it from the Git history.

## Steps Taken

### 1. Updated `.gitignore`
Added `linkedin/` to the `.gitignore` file to ensure any local recreations of this folder are not accidentally tracked or committed in the future.

### 2. Purged Git History
Used `git filter-branch` to rewrite the repository's history, stripping the `linkedin/` folder from every previous commit.
```bash
git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch -r linkedin' --prune-empty --tag-name-filter cat -- --all
```

### 3. Cleaned Working Directory
Removed the physical `linkedin/` folder from the local filesystem.

### 4. Verified Removal
Confirmed via `git log --all -- linkedin/` that the folder no longer exists in current or historical commits.

## Note on History Rewrite
This operation rewritten the Git history. Subsequent pulls for other collaborators will require a reset or re-clone if they had the `linkedin` folder tracked.

Documentation for this task (task and plan) is saved in `docs/16/`.
