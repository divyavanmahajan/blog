# Walkthrough - Remove linkedin Folder from History (#16)

I have completely removed the `linkedin` folder from the repository and purged all traces of it from the Git history.

## Steps Taken

### 1. Updated `.gitignore`
Initially removed `linkedin/` from tracking. Later updated to `linkedin/*` with an exception for `!linkedin/.gitkeep` to allow keeping the folder structure in the repository while ignoring generated artifacts.

### 2. Purged Git History
Used `git filter-branch` to rewrite the repository's history, stripping all previous instances of the `linkedin/` folder from every commit.
```bash
git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch -r linkedin' --prune-empty --tag-name-filter cat -- --all
```

### 3. Cleaned and Restored Folder
Removed the physical `linkedin/` folder and its legacy contents. Re-created the folder with an empty `.gitkeep` file to maintain the directory structure in Git.

### 4. Verified Removal
Confirmed via `git log --all -- linkedin/` that the folder no longer exists in current or historical commits.

## Note on History Rewrite
This operation rewritten the Git history. Subsequent pulls for other collaborators will require a reset or re-clone if they had the `linkedin` folder tracked.

Documentation for this task (task and plan) is saved in `docs/16/`.
