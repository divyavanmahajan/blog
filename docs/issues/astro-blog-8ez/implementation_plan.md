# Implementation Plan: Document Photos.sqlite DB structure

**Issue ID:** astro-blog-8ez

## Analysis phase
1. **Identify Core Entities**:
   - `ZASSET`: The central piece representing a photo or video.
   - `ZADDITIONALASSETATTRIBUTES`: Metadata extension for `ZASSET`.
   - `ZEXTENDEDATTRIBUTES`: Technical metadata (ISO, Lens, etc.).
   - `ZGENERICALBUM`: Albums and folders.
   - `ZMOMENT`: Time-location groupings.
   - `ZDETECTEDFACE` & `ZPERSON`: Facial recognition data.
   - `ZINTERNALRESOURCE`: Physical file mappings.

2. **Map Relationships**:
   - `ZASSET` -> `ZADDITIONALASSETATTRIBUTES` (One-to-One via `ZADDITIONALATTRIBUTES`)
   - `ZASSET` -> `ZEXTENDEDATTRIBUTES` (One-to-One via `ZEXTENDEDATTRIBUTES`)
   - `ZASSET` -> `ZMOMENT` (Many-to-One via `ZMOMENT`)
   - `ZASSET` -> `ZCLOUDMASTER` (Many-to-One via `ZMASTER`)
   - `ZALBUM` (ZGENERICALBUM) <-> `ZASSET` (Many-to-Many via `Z_33ASSETS` or similar join tables)
   - `ZPERSON` <-> `ZDETECTEDFACE` (One-to-Many via `ZPERSONFORFACE`)
   - `ZASSET` <-> `ZDETECTEDFACE` (One-to-Many via `ZASSETFORFACE`)

## Execution phase
1. **Draft Documentation**: Create `experiments/photo-lib-db-structure.md`.
2. **ASCII Diagram**: Design a clear representation of the schema.
3. **Table Details**: List key fields for each major table.
4. **Linkage Explanation**: Describe how to join these tables for common queries.

## Verification plan
- Check the markdown file for clarity and completeness.
- Ensure the ASCII diagram is readable.
- Confirm all tables mentioned are present in the source file.
