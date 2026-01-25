#!/bin/bash

# Configuration
SOURCE_DIR="public/images"
ICON_DIR="public/images/icon"
ICON_HEIGHT=150

# Ensure icon directory exists
mkdir -p "$ICON_DIR"

echo "Checking for missing thumbnails in $ICON_DIR..."

# Scan for heroImage references in content collections
grep -r "heroImage:" src/content/blog | grep -oE "/images/[^\"' ]+" | sort | uniq | while read -r hero_path; do
    # Extract filename
    filename=$(basename "$hero_path")
    source_file="$SOURCE_DIR/$filename"
    icon_file="$ICON_DIR/$filename"

    # Check if source exists
    if [ ! -f "$source_file" ]; then
        echo "Warning: Source image $source_file not found."
        continue
    fi

    # Generate icon if it doesn't exist
    if [ ! -f "$icon_file" ]; then
        echo "Generating missing thumbnail: $icon_file"
        sips -Z "$ICON_HEIGHT" "$source_file" --out "$icon_file" > /dev/null 2>&1
    else
        echo "Thumbnail exists: $icon_file"
    fi
done

echo "Thumbnail check complete."
