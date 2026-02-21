# Walkthrough: Document Photos.sqlite DB structure

**Issue ID:** astro-blog-8ez

## Changes implemented
- Analyzed `experiments/photo-lib-tables.txt` to identify the core schema of the Mac OS Photos library.
- Created a newline documentation file `experiments/photo-lib-db-structure.md`.
- Included a detailed explanation of core tables (`ZASSET`, `ZADDITIONALASSETATTRIBUTES`, `ZEXTENDEDATTRIBUTES`, etc.).
- Designed an ASCII diagram illustrating the relationships between these tables.
- Provided SQL join examples for common data extraction tasks (finding original filenames, listing album contents, etc.).

## Verification steps
1. Verified the table names and fields against the source `experiments/photo-lib-tables.txt`.
2. Ensured the links described (e.g., `ZASSET` to `ZEXTENDEDATTRIBUTES`) are reflected in the field lists of the source file.
3. Reviewed the ASCII diagram for clarity in a terminal/markdown viewer.
4. Confirmed the SQL examples use the correct field names found in the analysis.

## Conclusion
The database structure is now documented and provides a clear map for anyone trying to query the Photos library SQLite file directly.
