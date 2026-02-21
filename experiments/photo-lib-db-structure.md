# Mac OS Photos Library Database Structure (Photos.sqlite)

An analysis of the SQLite database schema used by the Mac OS Photos library, based on the `Photos.sqlite` tables.

## 📊 Overview

The Photos library database follows a standard **Core Data** SQLite structure. Most tables are prefixed with `Z`, and relationships are typically handled through primary keys (`Z_PK`) and foreign keys mapped as `Z[ENTITYNAME]`.

## 🛠 Core Tables

### 1. `ZASSET`
The central table of the database. Every photo, video, or slow-mo capture is a row in this table.
- **Key Fields**: `Z_PK`, `ZUUID`, `ZDATECREATED`, `ZMODIFICATIONDATE`, `ZKIND`, `ZWIDTH`, `ZHEIGHT`, `ZFAVORITE`, `ZHIDDEN`.
- **Links to**: `ZADDITIONALASSETATTRIBUTES`, `ZEXTENDEDATTRIBUTES`, `ZMOMENT`, `ZMASTER`.

### 2. `ZADDITIONALASSETATTRIBUTES`
Contains extra metadata that doesn't fit in the main `ZASSET` table.
- **Key Fields**: `ZORIGINALFILENAME`, `ZTITLE`, `ZLONGDESCRIPTION`, `ZTIMEZONENAME`, `ZIMPORTEDBY`.
- **Link**: Connected via `ZASSET` ID.

### 3. `ZEXTENDEDATTRIBUTES`
Detailed technical metadata for the media, specifically camera settings.
- **Key Fields**: `ZISO`, `ZAPERTURE`, `ZSHUTTERSPEED`, `ZFOCALLENGTH`, `ZCAMERAMAKE`, `ZCAMERAMODEL`, `ZLENSMODEL`.
- **Link**: Joined to `ZASSET` using the asset's primary key.

### 4. `ZINTERNALRESOURCE`
Defines the files associated with an asset (Master file, Thumbnail, Preview, etc.).
- **Key Fields**: `ZFILEPATH`, `ZFILESIZE`, `ZRESOURCETYPE`, `ZFINGERPRINT`.
- **Link**: Maps multiple files to a single `ZASSET`.

### 5. `ZGENERICALBUM`
Handles both albums and folders.
- **Key Fields**: `ZTITLE`, `ZKIND`, `ZUUID`.
- **Link**: Many-to-Many relationship with `ZASSET` via the join table `Z_33ASSETS`.

### 6. `ZMOMENT`
Groups assets by time and location (the "Moments" view in the Photos app).
- **Key Fields**: `ZTITLE`, `ZSUBTITLE`, `ZSTARTDATE`, `ZENDDATE`.

### 7. `ZPERSON` & `ZDETECTEDFACE`
Metadata for facial recognition.
- **ZPERSON**: Represents an individual.
- **ZDETECTEDFACE**: Represents a specific face-crop found within an asset.
- **Link**: `ZDETECTEDFACE` points to both `ZASSET` (where the face is) and `ZPERSON` (who the face belongs to).

---

## 🏗 Database Schema Diagram

```text
       +-----------------------+          +-----------------------------+
       |   ZINTERNALRESOURCE   |          | ZADDITIONALASSETATTRIBUTES  |
       | (File Paths & Types)  |          | (Original Filename, Title)  |
       +-----------+-----------+          +--------------+--------------+
                   |                                     |
                   | ZASSET                              | ZASSET
                   v                                     v
       +----------------------------------------------------------------+
       |                            ZASSET                              |
       |                   (The primary media record)                   |
       +-----+-------------+--------------+--------------+---------+----+
             |             |              |              |         |
             |             |              |              |         |
      +------v------+ +----v-----+ +------v------+ +-----v----+ +---v---+
      |  ZMOMENT    | | ZEXTENDED| | ZCLOUDMASTER| | Z_33ASSETS| |ZDETECT|
      | (Location/  | | ATTRIBUTES| | (iCloud     | | (Join     | |EDFACE|
      |  Time Group)| | (ISO,Lens)| |  Master)   | |  Table)   | | (Faces)|
      +-------------+ +----------+ +-------------+ +-----+----+ +---+---+
                                                         |          |
                                                         v          v
                                                 +-------+------+ +-----+------+
                                                 |ZGENERICALBUM | |   ZPERSON  |
                                                 | (Albums/     | | (People    |
                                                 |  Folders)    | |  Metadata) |
                                                 +--------------+ +------------+
```

---

## 🔗 Key Relationships & Joins

### Finding the original filename for an asset
To get the readable filename instead of the UUID-based one:
```sql
SELECT a.Z_PK, att.ZORIGINALFILENAME
FROM ZASSET a
JOIN ZADDITIONALASSETATTRIBUTES att ON a.Z_PK = att.ZASSET;
```

### Listing all assets in a specific album
The join table `Z_33ASSETS` bridges the many-to-many relationship:
```sql
SELECT alb.ZTITLE, ass.ZUUID
FROM ZGENERICALBUM alb
JOIN Z_33ASSETS join ON alb.Z_PK = join.Z_33ALBUMS
JOIN ZASSET ass ON join.Z_3ASSETS = ass.Z_PK
WHERE alb.ZTITLE = 'My Vacation';
```

### Retrieving camera settings for a photo
```sql
SELECT a.ZUUID, e.ZCAMERAMODEL, e.ZISO, e.ZAPERTURE
FROM ZASSET a
JOIN ZEXTENDEDATTRIBUTES e ON a.Z_PK = e.ZASSET;
```

### Linking people to photos
```sql
SELECT p.ZFULLNAME, a.ZUUID
FROM ZPERSON p
JOIN ZDETECTEDFACE f ON p.Z_PK = f.ZPERSONFORFACE
JOIN ZASSET a ON f.ZASSETFORFACE = a.Z_PK;
```
