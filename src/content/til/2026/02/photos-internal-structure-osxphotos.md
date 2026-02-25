---
title: "TIL: Power-User Access to Apple Photos with osxphotos"
description: "Managing your Mac photos library. OSXPhotos, Power Photos, and Phoenix Slides are great tools for this."
pubDate: 2026-02-21
categories: ["Tools", "macOS"]
tags: ["osxphotos", "Photos.app", "CLI", "Automation", "Python"]
draft: false
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

## Adding PhotoScript for App Interaction
While `osxphotos` is excellent for querying the database directly (especially when Photos.app is closed), its sister project [PhotoScript](https://rhettbull.github.io/PhotoScript/) offers a different approach.

Instead of reading the SQLite database, **PhotoScript** acts as a Python wrapper around the Apple Photos **AppleScript** interface. This enables direct interaction with a *running* instance of Photos:
- **Automation**: Create albums, import photos, and modify metadata (titles, descriptions, keywords) in real-time.
- **Library Management**: Select photos in the UI, toggle the "Favorite" status, or move items between albums programmatically.
- **Workflow Integration**: Excellent for "bridge" scripts that need to take output from another app and push it directly into the Photos interface.
- **Reference**: See the [Photos 6 AppleScript Dictionary](https://github.com/RhetTbull/PhotoScript/wiki/Photos-6-AppleScript-Dictionary) for a detailed list of available commands and objects.

- Use **PhotoScript** for automation that requires the Photos app to perform actions or when you need to modify the library from within the app environment.

## Scripting with JavaScript (JXA)
If you prefer JavaScript over Python or AppleScript, you can use **JavaScript for Automation (JXA)**. As documented in Paul Mudge's guide [Scripting Photos for macOS with JavaScript](https://mudge.name/2019/11/13/scripting-photos-for-macos-with-javascript/), this allows you to automate Photos using modern JS syntax.

### Key Concepts:
- **Environment**: Use the built-in **Script Editor** (set language to JavaScript) or run via terminal with `osascript -il JavaScript`.
- **Selection**: Interact with what you've currently clicked on using `Photos.selection()`.
- **Reading vs. Writing**: 
    - **Read**: Call properties as functions, e.g., `item.date()` or `item.filename()`.
    - **Write**: Assign values directly, e.g., `item.date = new Date(2023, 0, 1);`.
- **iCloud Sync**: One of the biggest advantages of using JXA (or AppleScript/PhotoScript) over direct database editing is that changes are officially registered by the Photos app and **correctly propagate to iCloud Photos**.

```javascript
// Example: Print filenames of selected photos
const Photos = Application("Photos");
for (const photo of Photos.selection()) {
  console.log(photo.filename());
}
```

## Efficient Image Browsing with Phoenix Slides

When you need to browse images directly on disk—whether they are exported files or the internal "Originals" folder of your library—the [Phoenix Slides](https://blyt.net/phxslides/) app is an invaluable tool for macOS power users.

Unlike the Photos app, which requires importing and managing a database, **Phoenix Slides** is a fast, lightweight image browser that allows you to flip through folders and disks full of images instantly.

### Why it complements `osxphotos`:
- **Speed**: It uses pre-caching and EXIF thumbnails to provide a blazingly fast browsing experience, even with thousands of images.
- **Direct Access**: Ideal for browsing the output of your `osxphotos export` commands without the overhead of another management app.
- **Recursive Search**: It can automatically find and display images in subfolders, making it perfect for navigating complex directory structures created by export templates.
- **Lossless Edits**: Supports lossless JPEG rotation and transformations directly from its interface.
- **Metadata View**: Conveniently displays EXIF data and JPEG comments while you browse.

Phoenix Slides is especially useful for quickly verifying exported backups or performing a "sanity check" on the physical file structure of your library without the lag often associated with official media browsers.
## Understanding the Database Structure
For those who want to look under the hood, the Photos library uses a SQLite database that follows Apple's **Core Data** conventions. Further details can be found in the [osxphotos wiki](https://github.com/RhetTbull/osxphotos/wiki/Understanding-the-Photos-database).

### Essential Database Facts:
- **File Locations**: 
  - Since Photos 5.0 (macOS Catalina), the primary metadata is in `~/Pictures/Photos Library.photoslibrary/database/Photos.sqlite`.
  - An auxiliary file, `photos.db`, contains high-level library metadata like the schema version.
- **Table Naming**: Most tables and columns have a `Z` prefix (e.g., `ZASSET`, `ZGENERICASSET`), a hallmark of Core Data's SQLite backing store.
- **Dates & Epochs**: Photos stores timestamps as a **Mac OS time value** (Cocoa epoch), which is the number of seconds since **January 1, 2001**. To convert this to Unix time (seconds since 1970), you need to add exactly `978307200` seconds.
- **Resource Mapping**: The `ZINTERNALRESOURCE` table tracks the relationship between an asset and its physical files (Originals, Edited versions, and Thumbnails).

## Why Use These Tools?
- **Data Portability**: Easily move your photos to another service while keeping all your albums and metadata intact.
- **Digital Preservation**: Ensure your metadata is embedded in the image files themselves, rather than trapped in a proprietary database.
- **Automation**: Build workflows to auto-export or process new photos as they are added to your library.
- **Cloud Integrity**: Using official APIs (JXA, PhotoScript) ensures your edits sync to all your devices via iCloud.
