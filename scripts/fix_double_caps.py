#!/usr/bin/env python3
import re
import argparse
import sys
import os

def fix_content(content):
    r"""
    Replaces double uppercase letters with a single letter if they appear at the
    start of a sentence or line (including indented lines).
    
    Regex details:
    (?m) - Multiline mode: ^ matches the start of any line.
    (^|[.?!]\s+) - Group 1: Matches start of line OR sentence ending punctuation plus spaces.
    (\s*) - Group 2: Matches optional whitespace (indentation).
    ([A-Z]) - Group 3: Any uppercase letter.
    \3 - Backreference: Matches the same character as Group 3.
    """
    pattern = r"(?m)(^|[.?!]\s+)(\s*)([A-Z])\3"
    return re.sub(pattern, r"\1\2\3", content)

def main():
    parser = argparse.ArgumentParser(
        description="Fix double uppercase letters at the start of sentences (e.g., 'AA' -> 'A')."
    )
    parser.add_argument("file_path", help="Path to the file to process")
    parser.add_argument(
        "-i", "--in-place", 
        action="store_true", 
        help="Modify the file in place instead of printing to stdout"
    )
    
    args = parser.parse_args()
    
    if not os.path.exists(args.file_path):
        print(f"Error: File not found: {args.file_path}", file=sys.stderr)
        sys.exit(1)
        
    try:
        with open(args.file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        fixed_content = fix_content(content)
        
        if args.in_place:
            if content == fixed_content:
                print(f"No changes needed for {args.file_path}")
            else:
                with open(args.file_path, 'w', encoding='utf-8') as f:
                    f.write(fixed_content)
                print(f"Successfully updated {args.file_path}")
        else:
            sys.stdout.write(fixed_content)
            
    except Exception as e:
        print(f"Error processing file: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
