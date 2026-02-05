# Implementation Plan - Fix Double Uppercase at Sentence Starts

This plan covers the creation of a Python script to detect and fix double uppercase letters at the beginning of sentences (e.g., "AA" -> "A").

## User Story
As a content creator, I want to quickly fix sentence-start capitalization typos so that my articles look professional with minimal manual effort.

## Proposed Changes

### 1. Script Creation: `scripts/fix_double_caps.py`
- Import `re`, `argparse`, and `os`.
- Define a function `fix_content(content)` that applies the regex.
- Regex: `(?m)(?<=^|[.?!]\s+)([A-Z])\1`
    - `(?m)`: Multiline mode so `^` matches start of lines.
    - `(?<=^|[.?!]\s+)`: Lookbehind for start of line OR punctuation followed by space.
    - `([A-Z])\1`: A capital letter followed by itself.
- Replacement: `\1` (keeps only the first letter).
- CLI implementation:
    - `file_path`: Required positional argument.
    - `--in-place`: Optional flag to save changes back to the file.

### 2. Documentation
- Create `docs/26/task.md`
- Create `docs/26/implementation_plan.md`
- Create `docs/26/walkthrough.md`

## Verification Plan
1. Create a dummy file `test_caps.txt` with sample text:
    ```text
    AAple is good.
    BBananas are yellow. This is CCool.
    Is it true? DDoubt it.
    EEveryone knows AAaron.
    ```
2. Run `python3 scripts/fix_double_caps.py test_caps.txt`.
3. Verify output:
    ```text
    Apple is good.
    Bananas are yellow. This is CCool.
    Is it true? Doubt it.
    Everyone knows AAaron.
    ```
4. Test `--in-place` flag.
