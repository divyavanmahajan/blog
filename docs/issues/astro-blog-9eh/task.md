# Task: Add blog post about iMac Disk Recovery

## Objective
Add a blog post to the astro-blog detailing the process of recovering from an iMac disk error using an external SSD and `rsync`.

## Details
- **Target Model**: iMac 21.5 2016 (1TB Fusion Drive)
- **Problem**: Filesystem errors causing the system to hang.
- **Recovery Method**: 
    - External 2TB Sandisk Extreme SSD.
    - Two APFS volumes: `iMac` (System) and `iMacData` (Data).
    - Explanation of APFS volumes sharing disk space.
    - Data transfer via Terminal in Recovery Console using `rsync`.
    - `rsync` command: `rsync -a -E -H -P /Volumes/Macintosh\ HD\ -\ Data /Volumes/iMacData/Users`
    - Transfer duration: ~8 hours.
    - Mention of `--min-size` and `--max-size` (but single rsync was faster).
    - Reinstalling macOS Monterey on the external volume.
    - Using Migration Assistant to restore data from the new volume.
