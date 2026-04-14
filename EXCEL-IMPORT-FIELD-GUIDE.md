# Alumni Excel Import Field Guide

## Overview

The alumni import CSV template contains **18 columns** organized into three categories:

- **Alumni Information** (8 columns)
- **Employment Information** (5 columns)
- **Higher Studies Information** (5 columns)

---

## Column Specifications

### I. Alumni Information (Required)

| Column | Field Name       | Type    | Required       | Format                       | Notes                                      |
| ------ | ---------------- | ------- | -------------- | ---------------------------- | ------------------------------------------ |
| 1      | S_ID             | String  | ✅ Yes         | ALM001, ALM002, etc.         | Unique identifier; use alphanumeric format |
| 2      | S_Name           | String  | ✅ Yes         | "Rajesh Kumar"               | Alumni full name with quotes               |
| 3      | Branch           | String  | ✅ Yes         | CS, IT, ECE, ENTC, AIDS      | 5 engineering branches only                |
| 4      | Graduation_Year  | Integer | ✅ Yes         | 2018, 2019, 2020             | 4-digit year (2010-2024 range)             |
| 5      | Phone_No         | String  | ⚠️ Recommended | +91-9876-543210              | With country code and quotes               |
| 6      | Email            | String  | ✅ Yes         | name@example.com             | Valid email address                        |
| 7      | LinkedIn_Profile | String  | ⚠️ Recommended | https://linkedin.com/in/name | Full LinkedIn URL or leave empty           |
| 8      | Gender           | String  | ⚠️ Recommended | Male, Female, Other          | Leave empty if not applicable              |

### II. Employment Information (Optional - At Least One Required)

| Column | Field Name            | Type   | Required    | Format                   | Notes                           |
| ------ | --------------------- | ------ | ----------- | ------------------------ | ------------------------------- |
| 9      | Company_Name          | String | ⚠️ Semi     | TCS, Google, Infosys     | Current or most recent employer |
| 10     | Company_Location      | String | ⚠️ Semi     | Bangalore, India         | City and Country                |
| 11     | Position              | String | ⚠️ Semi     | Senior Software Engineer | Job title/position role         |
| 12     | Employment_Start_Date | Date   | ⚠️ Semi     | 2018-06-01               | Format: YYYY-MM-DD              |
| 13     | Employment_End_Date   | Date   | ❓ Optional | 2020-12-31               | **Leave BLANK for current job** |

**Employment Rules:**

- If you fill `Company_Name`, you MUST fill `Position` and `Employment_Start_Date`
- `Employment_End_Date` is **optional** - leave blank for currently employed alumni
- Dates must be in ISO format (YYYY-MM-DD)

### III. Higher Studies Information (Optional - At Least One Required)

| Column | Field Name       | Type    | Required | Format               | Notes                                   |
| ------ | ---------------- | ------- | -------- | -------------------- | --------------------------------------- |
| 14     | College_Name     | String  | ⚠️ Semi  | IIT Bombay, Stanford | Higher education institution name       |
| 15     | College_Location | String  | ⚠️ Semi  | Mumbai, India        | City and Country                        |
| 16     | Domain_Of_Study  | String  | ⚠️ Semi  | Computer Science     | Field of study (degree, specialization) |
| 17     | HS_Start_Year    | Integer | ⚠️ Semi  | 2015                 | 4-digit admission/entry year            |
| 18     | HS_End_Year      | Integer | ⚠️ Semi  | 2017                 | 4-digit graduation/completion year      |

**Higher Studies Rules:**

- If you fill `College_Name`, you MUST fill `Domain_Of_Study`, `HS_Start_Year`, and `HS_End_Year`
- `College_Location` is highly recommended for context
- Years must be 4-digit format (YYYY)

---

## Mandatory vs. Optional Fields

### Absolutely Required (Cannot be Empty)

✅ S_ID, S_Name, Branch, Graduation_Year, Email

### At Least One Required (Employment OR Higher Studies)

- **Either** complete Employment fields (all 5: Company, Location, Position, Start_Date, optionally End_Date)
- **Or** complete Higher Studies fields (all 5: College, Location, Domain, Start_Year, End_Year)
- **Or provide BOTH**

### Recommended (Strongly Encouraged)

- Phone_No
- LinkedIn_Profile
- Gender
- College_Location

---

## Data Validation Rules

### Alumni Data

- **S_ID**: Unique across entire CSV (no duplicates)
- **Branch**: Must be exactly one of: `CS`, `IT`, `ECE`, `ENTC`, `AIDS`
- **Graduation_Year**: Valid year between 2010-2024
- **Email**: Valid email format (name@domain.ext)

### Employment Data

- **Employment_Start_Date**: Valid date in YYYY-MM-DD format
- **Employment_End_Date**:
  - Either YYYY-MM-DD format
  - Or **empty** (for current employment)
- **Date Logic**: Start date must be ≤ End date (if end date exists)

### Higher Studies Data

- **HS_Start_Year**: Valid year in YYYY format
- **HS_End_Year**: Valid year in YYYY format (must be ≥ Start_Year)
- Years typically span 2-6 years (4-year bachelor's to 2-year master's)

---

## Example Scenarios

### Scenario 1: Current Employee with Graduate Degree

```csv
"ALM001","Rajesh Kumar","CS","2018","+91-9876-543210","rajesh@example.com","https://linkedin.com/in/rajesh","Male","TCS","Bangalore, India","Senior Engineer","2018-06-01","","IIT Bombay","Mumbai, India","Computer Science","2014","2016"
```

- Start date: 2018 | End date: **BLANK** (currently employed)
- Higher studies: M.Tech from IIT Bombay (2014-2016)

### Scenario 2: Switched Jobs (Record Most Recent)

```csv
"ALM002","Priya Sharma","AIDS","2019","+91-9876-543211","priya@example.com","https://linkedin.com/in/priya","Female","Google","Mountain View, CA","Data Scientist","2021-08-01","","Stanford University","Palo Alto, CA","Data Science","2017","2019"
```

- Most recent: Google (Aug 2021 - Present)
- Education: Master's in Data Science, Stanford (2017-2019)
- Previous jobs can be captured in future updates

### Scenario 3: Self-Employed / Entrepreneur (No Employment)

```csv
"ALM003","Amit Patel","IT","2020","+91-9876-543212","amit@example.com","https://linkedin.com/in/amit","Male","","","","","","Delhi University","Delhi, India","Information Technology","2016","2020"
```

- No employment data (all blank)
- Has undergraduate degree from Delhi University
- Valid because Higher Studies data is complete

---

## Field Format Guidelines

### Quotes & Escaping

- Wrap all text values in **double quotes**: `"Rajesh Kumar"`, `"TCS"`
- If text contains quotes, escape with `""`: `"O'Connor"` → `"O""Connor"`
- Numbers and dates can be unquoted, but quotes don't hurt

### Date Format

- **Employment dates**: `YYYY-MM-DD` (e.g., `2018-06-01`)
- **Higher Studies years**: `YYYY` (e.g., `2015`, `2019`)

### Phone Number Format

- Include country code: `+91-` for India
- Use hyphens for readability: `+91-9876-543210`
- Always quote: `"+91-9876-543210"`

### LinkedIn Profile

- Full URL starting with `https://linkedin.com/in/`
- Can be left empty: `""`

### Location Format

- City, Country: `"Bangalore, India"` or `"Mountain View, CA"`
- State/Province for US: `"San Diego, CA"` not just `"San Diego"`

---

## Import Process

1. **Download Template**: Get `alumni-import-template.csv` from application
2. **Fill Data**: Add your alumni records following the guidelines above
3. **Validate**: Check that:
   - All required fields have values
   - S_ID values are unique
   - Dates follow YYYY-MM-DD format
   - Branch is one of the 5 valid options
4. **Upload**: Use the import feature in Alumni Dashboard
5. **Verify**: System will notify you of:
   - ✅ Successfully imported records
   - ⚠️ Warnings for incomplete optional fields
   - ❌ Errors preventing import (with details)

---

## Sample Data Distribution

The provided `alumni-import-template.csv` includes 12 example records with:

| Branch | Count | Graduation Years | Employment Status   |
| ------ | ----- | ---------------- | ------------------- |
| CS     | 3     | 2018, 2019, 2020 | All employed        |
| IT     | 3     | 2018, 2020, 2021 | Mix of current/past |
| ECE    | 2     | 2017, 2019       | Mixed               |
| ENTC   | 2     | 2018, 2019       | Mixed               |
| AIDS   | 2     | 2019, 2021       | All employed        |

---

## Database Schema Alignment

### Maps to Database Tables

**Alumni CSV Columns** → **alumini Table**

- S_ID → s_id (Primary Key)
- S_Name → s_name
- Email → email
- Phone_No → phone_no
- LinkedIn_Profile → linkedin_profile
- Gender → gender
- Branch → branch
- Graduation_Year → graduation_year

**Employment CSV Columns** → **employment Table**

- Company_Name → Joined with company table (company_name)
- Company_Location → company.location
- Position → employment.position
- Employment_Start_Date → employment.start_date
- Employment_End_Date → employment.end_date

**Higher Studies CSV Columns** → **higher_studies Table**

- College_Name → college_name
- College_Location → location
- Domain_Of_Study → domain_of_study
- HS_Start_Year → start_year
- HS_End_Year → end_year

---

## Common Import Issues & Solutions

| Issue                        | Cause                                           | Solution                                        |
| ---------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| "Branch not recognized"      | Branch not in [CS, IT, ECE, ENTC, AIDS]         | Check spelling and capitalization               |
| "Invalid date format"        | Using DD-MM-YYYY instead of YYYY-MM-DD          | Convert all dates to ISO format: YYYY-MM-DD     |
| "Duplicate S_ID"             | Same alumni ID used twice                       | Ensure each row has unique S_ID                 |
| "Missing required field"     | Email or required alumni field blank            | Fill all S_Name, Email, Branch, Graduation_Year |
| "No employment or education" | Both employment AND higher_studies fields blank | Provide at least one category of data           |

---

## Best Practices

1. **Backup Original**: Keep a copy of your CSV before importing
2. **Batch Test**: Import 5-10 records first to validate your format
3. **Current First**: Always use current/most recent employment (not historical)
4. **Complete Names**: Use full names; avoid nicknames
5. **Consistent Formatting**: Keep company names consistent across rows (e.g., always "TCS" not "Tata Consulting Services")
6. **Validate Dates**: Double-check graduation year matches employment start date (graduate should start job after graduation)

---

**Last Updated**: January 2025
**Template Version**: 2.0 (with Higher Studies Support)
