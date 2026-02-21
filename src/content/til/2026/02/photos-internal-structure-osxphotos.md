---
title: "TIL: Power-User Access to Apple Photos with osxphotos"
description: "A summary of how the osxphotos tool provides a CLI and API to query and export metadata from the Apple Photos library."
pubDate: 2026-02-21
categories: ["Tools", "macOS"]
tags: ["osxphotos", "Photos.app", "CLI", "Automation", "Python"]
---

Interaction with the Apple Photos library is usually restricted to the official app's GUI. However, the [osxphotos](https://github.com/RhetTbull/osxphotos) project provides a powerful command-line interface (CLI) and Python API to interact with, query, and export data from your Photos library.

## Core Capabilities

`osxphotos` acts as a bridge to the undocumented `Photos.sqlite` database, allowing you to perform operations that are impossible or tedious in the Photos app.

### 1. Robust Querying
The `query` command allows for complex filtering of your library based on metadata:
- **Search by metadata**: Find photos by keyword, person, album, or folder.
- **Technical filters**: Filter by camera make/model, dimensions, orientation, or file type (e.g., RAW vs. JPEG).
- **AI-driven filters**: Query based on scene recognition or specific labels stored by Apple's media analysis.

### 2. Advanced Exporting
The `export` command is one of the most powerful features, enabling highly customized backups:
- **Metadata Preservation**: Optionally write metadata (tags, descriptions, locations) back into the exported files using `exiftool`.
- **Custom Directory Structures**: Use templates to organize exports into folders (e.g., `/{year}/{month}/{album}/`).
- **Sidecar Support**: Export metadata into industry-standard XMP sidecar files.
- **Selective Sync**: Update existing exports efficiently, only copying new or modified files.

### 3. Batch Editing & Maintenance
- **Batch Metadata Edits**: Use `batch-edit` to update titles or descriptions for thousands of photos at once using templates.
- **Maintenance Tools**: Find "orphaned" photos that exist on disk but aren't in the database, or compare two Photos libraries to find discrepancies.
- **Location Fixes**: Add or update GPS data for photos that lack location information.

## Programmatic Access (Python API)
For developers, `osxphotos` provides a comprehensive Python API. This allows for building custom automation scripts:

```python
import osxphotos

photosdb = osxphotos.PhotosDB()
for photo in photosdb.photos(keywords=["Vacation"]):
    print(f"Found: {photo.filename}, Original Name: {photo.original_filename}")
```

## Why Use It?
- **Data Portability**: Easily move your photos to another service while keeping all your albums and metadata intact.
- **Digital Preservation**: Ensure your metadata is embedded in the image files themselves, rather than trapped in a proprietary database.
- **Automation**: Build workflows to auto-export or process new photos as they are added to your library.
