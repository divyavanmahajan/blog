# Walkthrough - Create Python script to fix double uppercase letters

I have implemented a Python script `scripts/fix_double_caps.py` that identifies and corrects double uppercase letters at the start of sentences or lines.

## Changes

### `scripts/fix_double_caps.py`
Created a Python script with the following logic:
- Uses `re.sub` with a multiline regex pattern: `(?m)(^|[.?!]\s+)(\s*)([A-Z])\3`.
- Handles:
    - Start of file.
    - Start of any line (including indented ones).
    - Start of sentences after `.`, `?`, or `!`.
- Provides a CLI with:
    - Print to stdout (default).
    - `--in-place` flag to modify files directly.

## Verification Results

### Test Cases
I created a test file `test_caps.txt` with the following content:
```text
    TThis is an indented first line.
AAple is good.
BBananas are yellow. This is CCool.
Is it true? DDoubt it! FFine.
EEveryone knows AAaron.
GGreat job.
    HHe said hello. (Indented sentence)
No period here
JJumping high.
    KKicking low.
LLast line.
```

### Execution
Ran the script:
```bash
python3 scripts/fix_double_caps.py test_caps.txt
```

### Output
```text
    This is an indented first line.
Aple is good.
Bananas are yellow. This is CCool.
Is it true? Doubt it! Fine.
Everyone knows AAaron.
Great job.
    He said hello. (Indented sentence)
No period here
Jumping high.
    Kicking low.
Last line.
```

The script correctly:
- Fixed `TThis`, `AAple`, `BBananas`, `DDoubt`, `FFine`, `EEveryone`, `GGreat`, `HHe`, `JJumping`, `KKicking`, and `LLast`.
- Ignored `CCool` (middle of sentence).
- Ignored `AAaron` (middle/end of sentence).
- Handled indentation and multiple sentences per line.

## Next Steps
- You can now use this script on your blog posts: `python3 scripts/fix_double_caps.py path/to/post.md --in-place`.
