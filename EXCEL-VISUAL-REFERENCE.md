# 🎨 Excel Upload - Visual Reference Guide

## Column Structure Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                    ALUMNI DATABASE EXCEL UPLOAD                      │
├─────────────────────────────────────────────────────────────────────┤
│                          REQUIRED FIELDS (5)                         │
├─────────────────────────────────────────────────────────────────────┤
│
│  Column 1: s_id                Column 2: s_name
│  ┌──────────────────┐         ┌──────────────────┐
│  │  Unique ID       │         │  Full Name       │
│  │  (Number)        │         │  (Text)          │
│  │  Example: 1      │         │  MONALI ABDULE   │
│  └──────────────────┘         └──────────────────┘
│
│  Column 3: branch              Column 4: graduation_year
│  ┌──────────────────┐         ┌──────────────────┐
│  │  Branch Name     │         │  Graduation Yr   │
│  │  (Text)          │         │  (Text)          │
│  │  Computer Sci.   │         │  2012-13         │
│  └──────────────────┘         └──────────────────┘
│
│  Column 5: email
│  ┌──────────────────────────────────────────────┐
│  │  Email Address (UNIQUE!)                      │
│  │  name@example.com                             │
│  └──────────────────────────────────────────────┘
│
├─────────────────────────────────────────────────────────────────────┤
│               EMPLOYMENT INFORMATION (8 Optional)                    │
├─────────────────────────────────────────────────────────────────────┤
│
│  Column 6: phone_no            Column 7: linkedin_profile
│  ┌──────────────────┐         ┌──────────────────────────────┐
│  │  Phone Number    │         │  LinkedIn URL                │
│  │  7709359048      │         │  https://linkedin.com/in/... │
│  │  (10 digits)     │         │  (Full URL)                  │
│  └──────────────────┘         └──────────────────────────────┘
│
│  Column 8: gender              Column 9: company_name
│  ┌──────────────────┐         ┌──────────────────┐
│  │  M / F / Other   │         │  Company Name    │
│  │  F               │         │  TCS, Google     │
│  └──────────────────┘         └──────────────────┘
│
│  Column 10: company_location   Column 11: position
│  ┌──────────────────┐         ┌──────────────────┐
│  │  City/Location   │         │  Job Title       │
│  │  Mumbai          │         │  Software Eng.   │
│  └──────────────────┘         └──────────────────┘
│
│  Column 12: start_date         Column 13: end_date
│  ┌──────────────────┐         ┌──────────────────┐
│  │  Job Start       │         │  Job End         │
│  │  YYYY-MM-DD      │         │  (Leave blank if │
│  │  2015-07-01      │         │   currently emp) │
│  └──────────────────┘         └──────────────────┘
│
├─────────────────────────────────────────────────────────────────────┤
│            HIGHER STUDIES INFORMATION (5 Optional)                   │
├─────────────────────────────────────────────────────────────────────┤
│
│  Column 14: college_name       Column 15: college_location
│  ┌──────────────────┐         ┌──────────────────┐
│  │  University      │         │  Location        │
│  │  IIT Bombay      │         │  Mumbai          │
│  └──────────────────┘         └──────────────────┘
│
│  Column 16: domain_of_study    Column 17: start_year
│  ┌──────────────────────────────────┐  ┌──────────────┐
│  │  Degree & Field                   │  │  Start Year  │
│  │  M.Tech Computer Science           │  │  2013        │
│  │  MBA, PhD, B.Tech, etc.           │  └──────────────┘
│  └──────────────────────────────────┘
│
│  Column 18: end_year
│  ┌──────────────────┐
│  │  End Year        │
│  │  2015            │
│  └──────────────────┘
│
└─────────────────────────────────────────────────────────────────────┘
```

---

## Data Entry Template

### Example Record

```
┌──────────────────────────────────────────────────────────────┐
│ COMPLETE ALUMNI RECORD                                       │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│ IDENTIFICATION                                                │
│ ├─ s_id: 1                                                    │
│ ├─ s_name: MONALI MUKUND ABDULE                             │
│ └─ email: abdulemonali123@gmail.com                          │
│                                                               │
│ ACADEMICS                                                     │
│ ├─ branch: Computer Science                                  │
│ └─ graduation_year: 2012-13                                 │
│                                                               │
│ CONTACT                                                       │
│ ├─ phone_no: 7709359048                                     │
│ └─ linkedin_profile: https://linkedin.com/in/monali         │
│                                                               │
│ PERSONAL                                                      │
│ └─ gender: F                                                  │
│                                                               │
│ CURRENT EMPLOYMENT                                            │
│ ├─ company_name: TCS                                         │
│ ├─ company_location: Mumbai                                  │
│ ├─ position: Senior Software Engineer                        │
│ ├─ start_date: 2015-07-01                                  │
│ └─ end_date: (blank - currently employed)                   │
│                                                               │
│ HIGHER STUDIES                                                │
│ ├─ college_name: IIT Bombay                                │
│ ├─ college_location: Mumbai                                 │
│ ├─ domain_of_study: M.Tech Computer Science                │
│ ├─ start_year: 2013                                         │
│ └─ end_year: 2015                                           │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## Upload Process Flow

```
                           START
                             │
                             ▼
                 ┌─────────────────────┐
                 │  Download Template  │
                 │  (Excel or CSV)     │
                 └─────────────────────┘
                             │
                             ▼
                 ┌─────────────────────┐
                 │  Open Template in   │
                 │  Excel/Sheets/etc   │
                 └─────────────────────┘
                             │
                             ▼
                 ┌─────────────────────┐
                 │  Fill Alumni Data   │
                 │  Complete Rows      │
                 └─────────────────────┘
                             │
                             ▼
                 ┌─────────────────────┐
                 │  Validate Data      │
                 │  Check Format       │
                 └─────────────────────┘
                             │
                             ▼
                 ┌─────────────────────┐
                 │  Save File          │
                 │  (.xlsx or .csv)    │
                 └─────────────────────┘
                             │
                             ▼
                 ┌─────────────────────┐
                 │  Go to Admin        │
                 │  Dashboard          │
                 └─────────────────────┘
                             │
                             ▼
                 ┌─────────────────────┐
                 │  Click Upload       │
                 │  Select File        │
                 └─────────────────────┘
                             │
                             ▼
                 ┌─────────────────────┐
                 │  Backend Validates  │
                 │  & Processes        │
                 └─────────────────────┘
                             │
                    ┌────────┴────────┐
                    │                 │
                    ▼                 ▼
              [SUCCESS]          [ERROR]
                    │                 │
                    ▼                 ▼
            Data in Database    Error Message
                    │                 │
                    ▼                 ▼
            Visible in Alumni  Fix & Retry
            Database Section
                    │
                    ▼
              Can Search/Filter
              Export/Manage
                    │
                    ▼
                   END
```

---

## Branch Names Reference

```
┌──────────────────────────────────────────────────────────────┐
│                    ENGINEERING BRANCHES                       │
├──────────────────────────────────────────────────────────────┤
│                                                                │
│  ✓ Computer Science                                           │
│  ✓ Information Technology                                    │
│  ✓ Electronics & Telecommunication                          │
│  ✓ Electronics & Communication                              │
│  ✓ Artificial Intelligence & Data Science                   │
│  ✓ Any custom branch name (e.g., Mechanical, Civil, etc.)  │
│                                                                │
│  Note: Use FULL branch name, not abbreviations              │
│  ❌ DON'T USE: CS, IT, ECE, ENTC                            │
│  ✓ USE: Computer Science, Information Technology, etc.      │
│                                                                │
└──────────────────────────────────────────────────────────────┘
```

---

## Date Format Reference

```
┌──────────────────────────────────────────────────────────────┐
│                    DATE FORMATS                               │
├──────────────────────────────────────────────────────────────┤
│                                                                │
│  GRADUATION YEAR:                                            │
│  ┌──────────────────────────────────────────────┐            │
│  │ Format: YYYY-YY or YYYY                      │            │
│  │ ✓ Correct: 2012-13, 2020, 2021-22           │            │
│  │ ❌ Wrong: 2020/2021, 20-21, 2020-2021        │            │
│  └──────────────────────────────────────────────┘            │
│                                                                │
│  EMPLOYMENT DATES:                                           │
│  ┌──────────────────────────────────────────────┐            │
│  │ Format: YYYY-MM-DD                           │            │
│  │ ✓ Correct: 2015-07-01, 2020-12-31           │            │
│  │ ❌ Wrong: 07-01-2015, 1-7-2015               │            │
│  │           2015/07/01, 01-07-2015             │            │
│  └──────────────────────────────────────────────┘            │
│                                                                │
│  HIGHER STUDIES YEARS:                                       │
│  ┌──────────────────────────────────────────────┐            │
│  │ Format: 4-digit year (number)               │            │
│  │ ✓ Correct: 2013, 2015, 2023                 │            │
│  │ ❌ Wrong: 13, 2013-15, '2015                 │            │
│  └──────────────────────────────────────────────┘            │
│                                                                │
└──────────────────────────────────────────────────────────────┘
```

---

## Phone Number Format

```
┌──────────────────────────────────────────────────────────────┐
│                    PHONE NUMBERS                              │
├──────────────────────────────────────────────────────────────┤
│                                                                │
│  REQUIRED FORMAT:                                            │
│  ┌──────────────────────────────────────────────┐            │
│  │ • 10 digits only                             │            │
│  │ • No spaces, hyphens, or + signs            │            │
│  │ • No country codes (+91, +1, etc.)          │            │
│  │                                               │            │
│  │ ✓ CORRECT:                                   │            │
│  │   7709359048                                 │            │
│  │   9876543210                                 │            │
│  │                                               │            │
│  │ ❌ WRONG:                                     │            │
│  │   +91 7709359048  (has country code)        │            │
│  │   770-935-9048    (has hyphens)             │            │
│  │   7709 359 048    (has spaces)              │            │
│  │   (770) 9359048   (has parentheses)         │            │
│  └──────────────────────────────────────────────┘            │
│                                                                │
└──────────────────────────────────────────────────────────────┘
```

---

## Email Format Rules

```
┌──────────────────────────────────────────────────────────────┐
│                    EMAIL ADDRESS                              │
├──────────────────────────────────────────────────────────────┤
│                                                                │
│  REQUIREMENTS:                                               │
│  ├─ Must be valid email format                              │
│  ├─ Must be UNIQUE (no duplicates)                          │
│  ├─ Cannot be blank                                         │
│  └─ Case insensitive (john@example.com = JOHN@EXAMPLE.COM) │
│                                                                │
│  ✓ VALID FORMATS:                                           │
│  ├─ john.doe@example.com                                    │
│  ├─ monali.abdule@company.co.in                             │
│  ├─ raj_kumar123@domain.org                                 │
│  ├─ name+tag@email.com                                      │
│  └─ user@subdomain.example.com                              │
│                                                                │
│  ❌ INVALID FORMATS:                                        │
│  ├─ john@                                                    │
│  ├─ @example.com                                            │
│  ├─ john dot doe @ example.com                              │
│  ├─ john@example (no domain extension)                      │
│  └─ john doe@example.com (space in name)                    │
│                                                                │
└──────────────────────────────────────────────────────────────┘
```

---

## Minimal vs Complete Record

```
┌─────────────────────────────────────────────────────────────────┐
│              MINIMAL RECORD (5 Required Fields)                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  s_id             │ 1                                            │
│  s_name           │ PRIYA SHARMA                                 │
│  branch           │ Computer Science                             │
│  graduation_year  │ 2020-21                                      │
│  email            │ priya@example.com                            │
│                                                                   │
│  (All other fields left blank)                                  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

↓ Add optional employment info ↓

┌─────────────────────────────────────────────────────────────────┐
│        ENHANCED RECORD (With Employment Data)                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  s_id              │ 1                                           │
│  s_name            │ PRIYA SHARMA                                │
│  branch            │ Computer Science                            │
│  graduation_year   │ 2020-21                                    │
│  email             │ priya@example.com                           │
│  Phone_no          │ 9876543210                                  │
│  linkedin_profile  │ https://linkedin.com/in/priya              │
│  gender            │ F                                           │
│  company_name      │ Google                                      │
│  company_location  │ Bangalore                                   │
│  position          │ Software Engineer                           │
│  start_date        │ 2021-07-15                                 │
│  end_date          │ (blank - still employed)                   │
│                                                                   │
│  (Higher studies fields left blank)                             │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

↓ Add higher studies ↓

┌─────────────────────────────────────────────────────────────────┐
│      COMPLETE RECORD (With Higher Studies Data)                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  [All fields from enhanced record above, plus:]                 │
│                                                                   │
│  college_name      │ Stanford University                         │
│  college_location  │ California                                  │
│  domain_of_study   │ M.Tech Computer Science                     │
│  start_year        │ 2021                                        │
│  end_year          │ 2023                                        │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Visibility After Upload

```
┌──────────────────────────────────────────────────────────────┐
│              AFTER SUCCESSFUL UPLOAD                          │
├──────────────────────────────────────────────────────────────┤
│                                                                │
│  ✅ DATA IS VISIBLE IN:                                       │
│  ├─ Alumni Database Section                                  │
│  ├─ Search Results (by name, email)                          │
│  ├─ Filter Results (by year, branch, etc.)                  │
│  └─ Admin Management Interface                               │
│                                                                │
│  ✅ YOU CAN:                                                  │
│  ├─ Search alumni by name, email, company                   │
│  ├─ Filter by graduation year, branch, location             │
│  ├─ View individual alumni profiles                         │
│  ├─ Edit alumni records                                      │
│  ├─ Delete alumni records                                    │
│  ├─ Export filtered results as CSV                          │
│  └─ Generate analytics and reports                          │
│                                                                │
│  ⏱️  TIMING:                                                   │
│  └─ Data visible immediately after upload (< 1 second)      │
│                                                                │
└──────────────────────────────────────────────────────────────┘
```

---

## File Size & Limits

```
┌──────────────────────────────────────────────────────────────┐
│                  UPLOAD SPECIFICATIONS                        │
├──────────────────────────────────────────────────────────────┤
│                                                                │
│  Maximum File Size:    10 MB                                  │
│  Supported Formats:    .xlsx, .xls, .csv                     │
│  Character Encoding:   UTF-8 (for CSV)                       │
│  Records per File:     Unlimited (within 10MB)              │
│  Recommended Records:  100-500 per batch                    │
│                                                                │
│  TIPS FOR LARGE FILES:                                       │
│  ├─ For 1000+ records, split into 500-record batches       │
│  ├─ Upload batches sequentially                             │
│  ├─ Wait for confirmation before next batch                 │
│  └─ Allows easier error tracking                             │
│                                                                │
└──────────────────────────────────────────────────────────────┘
```

---

## Quick Checklist

```
┌──────────────────────────────────────────────────────────────┐
│              BEFORE UPLOADING - CHECKLIST                     │
├──────────────────────────────────────────────────────────────┤
│                                                                │
│  □ Downloaded the Excel template                            │
│  □ All required fields filled (5 columns)                   │
│  □ No duplicate email addresses                             │
│  □ No duplicate student IDs                                 │
│  □ Email addresses are valid format                         │
│  □ Phone numbers are 10 digits (if filled)                 │
│  □ Dates in correct format (YYYY-MM-DD)                    │
│  □ Graduation year in correct format (YYYY-YY)             │
│  □ Branch names are full names (not codes)                 │
│  □ File size is less than 10MB                             │
│  □ File format is .xlsx or .csv                            │
│  □ No header row modified                                   │
│  □ No blank rows in data section                           │
│  □ Saved file with proper name                             │
│  □ Test batch uploaded successfully                        │
│                                                                │
│  ✅ ALL CHECKED? → READY TO UPLOAD!                          │
│                                                                │
└──────────────────────────────────────────────────────────────┘
```

---

**Visual Guide Complete** ✅

For text guide, see: [ALUMNI-EXCEL-IMPORT-GUIDE.md](./ALUMNI-EXCEL-IMPORT-GUIDE.md)

For quick start, see: [EXCEL-QUICK-START.md](./EXCEL-QUICK-START.md)
