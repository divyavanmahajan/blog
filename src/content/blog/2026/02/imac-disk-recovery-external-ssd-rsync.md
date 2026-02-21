---
title: "Recovering from iMac Disk Errors: A Guide using External SSD and rsync"
description: "How to recover data from a failing iMac Fusion Drive using an external SSD, APFS volumes, and rsync via the Recovery Console."
pubDate: 2026-02-21
author: "Divya van Mahajan"
categories: ["Tech Support", "macOS"]
tags: ["iMac", "SSD-Upgrade", "rsync", "APFS", "Data-Recovery", "macOS-Monterey"]
heroImage: "/images/imac-recovery-hero.png"
draft: false
---

Failing hardware is never a pleasant experience, especially when it's the internal drive of an iMac 21.5-inch (2016 model). These machines often shipped with 1TB Fusion Drives that, while innovative at the time, are prone to filesystem errors and mechanical failure as they age. 

Recently, I faced a situation where filesystem errors were causing the system to hang indefinitely. Here is the step-by-step process I used to recover the data and get the system back up and running using an external SSD.

## The Solution: External SSD Boot Drive

Instead of opening the iMac (a notoriously difficult task involving adhesive strips and delicate cables), the most efficient solution is to boot from a fast external drive. I used a **2TB Sandisk Extreme SSD** for this purpose.

### Setting Up APFS Volumes

One of the great features of the Apple File System (APFS) is how it handles space. Unlike traditional partitions, which require you to pre-allocate a fixed size, **APFS Volumes** share the same pool of free space within an underlying container.

I created two volumes on the 2TB SSD:
1. **iMac**: For the macOS Monterey installation and applications.
2. **iMacData**: A temporary staging area for the recovered data.

Because they are APFS volumes, they both see the full 2TB of available space and grow dynamically as files are added.

## Data Recovery via Terminal

Since the macOS GUI was hanging, I booted into the **Recovery Console** (holding `Cmd + R` during startup). From the Utilities menu, I opened the **Terminal** to perform a manual data migration using `rsync`.

The command I used was:

```bash
rsync -a -E -H -P /Volumes/Macintosh\ HD\ -\ Data /Volumes/iMacData/Users
```

### Understanding the rsync Flags

If you are performing a similar recovery, it’s crucial to understand these flags:

*   `-a` (Archive): This is a "combo" flag that preserves permissions, ownership, timestamps, and symbolic links.
*   `-E` (Extended Attributes): This is specific to macOS. It ensures that metadata, resource forks, and Finder-specific data are preserved.
*   `-H` (Hard Links): Preserves hard links so that files pointing to the same data don't get duplicated.
*   `-P` (Partial/Progress): This shows a progress bar for each file and allows you to resume the transfer if the connection is interrupted.

### Performance Notes

During the process, I experimented with `--min-size` and `--max-size` filters to try and prioritize smaller or larger files to speed up the transfer. However, I found that **running a single, standard rsync** was actually faster and more reliable. For a roughly 1TB internal drive, the transfer took about **8 hours** to complete securely.

## Reinstalling macOS Monterey

Once the backup was verified, I proceeded to the final steps:

1.  **Reinstall macOS**: In the Recovery Console, I selected "Reinstall macOS Monterey" and chose the external **iMac** volume I created earlier.
2.  **Migration Assistant**: After the installation finished and the system rebooted into the new drive, I opened Migration Assistant. Use the option **"From a Mac, Time Machine backup, or startup disk"**.
3.  **Point to the Backup**: I selected the old internal drive (or the backup volume) as the source. 

## Conclusion

The iMac is now running faster than it ever did with its original Fusion Drive, thanks to the external SSD's superior read/write speeds. If your older iMac is starting to hang or throw disk errors, don't rush to replace the internal drive immediately—an external SSD boot drive is a powerful, non-invasive alternative.
