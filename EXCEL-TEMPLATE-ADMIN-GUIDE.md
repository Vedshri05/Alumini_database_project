# ALUMNI IMPORT EXCEL TEMPLATE - ADMIN SETUP GUIDE

## Quick Overview

The template has **18 columns** organized into **3 sections**:

```
┌─────────────────────────────────┐
│   ALUMNI (8 columns)            │ ← Always Required
├─────────────────────────────────┤
│   EMPLOYMENT (5 columns)        │ ← Optional (but at least one section needed)
├─────────────────────────────────┤
│   HIGHER STUDIES (5 columns)    │ ← Optional (but at least one section needed)
└─────────────────────────────────┘
```

---

## Column Breakdown With Requirements

### SECTION 1: ALUMNI INFORMATION (8 Columns)

| #   | Column           | Type   | Required?      | Description             | Example                      |
| --- | ---------------- | ------ | -------------- | ----------------------- | ---------------------------- |
| 1   | S_ID             | Text   | ✅ YES         | Unique Student ID       | ALM001                       |
| 2   | S_Name           | Text   | ✅ YES         | Full Name               | Rajesh Kumar                 |
| 3   | Branch           | Text   | ✅ YES         | Engineering Branch      | CS, IT, ECE, ENTC, AIDS      |
| 4   | Graduation_Year  | Number | ✅ YES         | Year of Graduation      | 2018, 2019, 2020             |
| 5   | Phone_No         | Text   | ⚠️ Recommended | Phone with Country Code | +91-9876-543210              |
| 6   | Email            | Text   | ✅ YES         | Valid Email Address     | name@example.com             |
| 7   | LinkedIn_Profile | Text   | ⚠️ Recommended | Full LinkedIn URL       | https://linkedin.com/in/name |
| 8   | Gender           | Text   | ⚠️ Recommended | Gender                  | Male, Female, Other          |

---

### SECTION 2: EMPLOYMENT INFORMATION (5 Columns)

| #   | Column                | Type | Required?   | Description             | Example                           |
| --- | --------------------- | ---- | ----------- | ----------------------- | --------------------------------- |
| 9   | Company_Name          | Text | ⚠️ Semi     | Company Name            | TCS, Google, Infosys              |
| 10  | Company_Location      | Text | ⚠️ Semi     | City, Country           | Bangalore, India                  |
| 11  | Position              | Text | ⚠️ Semi     | Job Title               | Senior Software Engineer          |
| 12  | Employment_Start_Date | Date | ⚠️ Semi     | Start Date              | 2018-06-01 (YYYY-MM-DD)           |
| 13  | Employment_End_Date   | Date | ❓ Optional | End Date or Leave BLANK | 2020-12-31 or (blank for current) |

**Employment Rules:**

- If you fill Company_Name, you **MUST** fill Position and Start_Date
- End_Date is **OPTIONAL** - Leave BLANK if alumni is still working there
- All 5 employment columns together = Optional (but can't fill just 1-2)

---

### SECTION 3: HIGHER STUDIES INFORMATION (5 Columns)

| #   | Column           | Type   | Required? | Description      | Example                        |
| --- | ---------------- | ------ | --------- | ---------------- | ------------------------------ |
| 14  | College_Name     | Text   | ⚠️ Semi   | Institution Name | IIT Bombay, Stanford           |
| 15  | College_Location | Text   | ⚠️ Semi   | City, Country    | Mumbai, India                  |
| 16  | Domain_Of_Study  | Text   | ⚠️ Semi   | Field of Study   | Computer Science, Data Science |
| 17  | HS_Start_Year    | Number | ⚠️ Semi   | Entry Year       | 2015, 2017                     |
| 18  | HS_End_Year      | Number | ⚠️ Semi   | Graduation Year  | 2017, 2019                     |

**Higher Studies Rules:**

- If you fill College_Name, you **MUST** fill Domain_Of_Study, Start_Year, End_Year
- College_Location is **Recommended** but can be left blank
- All 5 higher studies columns together = Optional (but can't fill just 1-2)

---

## One Alumni = One Row Rule

**Each row represents ONE student with:**

- Their alumni information (required)
- Their MOST RECENT employment (optional)
- Their HIGHEST education (optional)

**If student has multiple jobs or education degrees:**

- Use separate rows for the same S_ID
- Example:
  ```
  ALM001 | Rajesh | ... | TCS | 2018-06-01 | 2020-12-31 | IIT Bombay | 2015 | 2017
  ALM001 | Rajesh | ... | Infosys | 2021-01-01 | (blank) | (blank) | (blank) | (blank)
  ```

---

## How to Set Up in Excel

### Step 1: Open the Template

1. Download: `alumni-import-template.csv`
2. Right-click → Open With... → Microsoft Excel
3. Excel will ask about "Text Import Wizard" → Click **Finish** (use defaults)

### Step 2: Format Headers (Row 2)

The second row shows field categories:

```
ALUMNI INFO | ALUMNI INFO | ALUMNI INFO | ... | EMPLOYMENT | ... | HIGHER STUDIES
```

**In Excel:**

- Select Row 2
- Format → Background Color = Light Blue (Alumni section)
- Format → Background Color = Light Green (Employment section)
- Format → Background Color = Light Yellow (Higher Studies section)

This helps admins see the column groupings visually.

### Step 3: Freeze Panes

1. Click on cell **A3** (first data row)
2. View → Freeze Panes → Freeze Panes
   - This keeps headers visible while scrolling

### Step 4: Add Data Validation (Optional but Recommended)

**For Branch Column (Column C):**

1. Select all cells in Branch column from row 3 down (C3:C1000)
2. Data → Data Validation
3. Allow: **List**
4. Source: `CS,IT,ECE,ENTC,AIDS`
5. Click OK → Now dropdown shows valid branches

**For Graduation_Year Column (Column D):**

1. Select all cells in column D from row 3 down (D3:D1000)
2. Data → Data Validation
3. Allow: **Whole Number**
4. Data: **between**
5. Minimum: `2010`, Maximum: `2030`
6. Click OK

**For Date Columns (Columns L, M, Q, R):**

1. Select employee/higher studies date columns
2. Data → Data Validation
3. Allow: **Date** or leave as Text if unsure
4. Click OK

### Step 5: Add Column Header Descriptions (Optional)

1. Right-click on Column A header
2. Insert → Comment
3. Add description like: "Unique Student ID - Format: ALM001, ALM002, etc."
4. Repeat for important columns

---

## Example: How to Fill a Row

### Scenario 1: Student with Both Employment & Education

```
ALM001 | Rajesh Kumar | CS | 2018 | +91-9876-543210 | rajesh@example.com | https://linkedin.com/in/rajesh | Male |
TCS | Bangalore, India | Senior Engineer | 2018-06-01 | 2020-12-31 |
IIT Bombay | Mumbai, India | Computer Science | 2015 | 2017
```

✅ **Valid** - Has required alumni info + both employment and education

### Scenario 2: Currently Employed (No End Date)

```
ALM003 | Amit Patel | IT | 2020 | +91-9876-543212 | amit@example.com | https://linkedin.com/in/amit | Male |
Infosys | Pune, India | Network Admin | 2020-08-01 | (BLANK) |
Delhi University | Delhi, India | Information Technology | 2016 | 2020
```

✅ **Valid** - Employment_End_Date is BLANK (currently employed)

### Scenario 3: Only Education (No Employment)

```
ALM_NEW | New Student | CS | 2024 | +91-XXXX-XXXX | student@example.com | (blank) | (blank) |
(blank) | (blank) | (blank) | (blank) | (blank) |
IIT Bombay | Mumbai, India | Computer Science | 2020 | 2024
```

✅ **Valid** - No employment data, but has education

### Scenario 4: INVALID - Missing Required Field

```
ALM002 | Priya Sharma | (BLANK) | 2019 | +91-XXXX | priya@example.com | ... | ...
```

❌ **INVALID** - Branch is required!

---

## Before Uploading

### Checklist

- [ ] **S_ID** - All unique (no duplicates)
- [ ] **S_Name** - All filled, no blanks
- [ ] **Branch** - One of: CS, IT, ECE, ENTC, AIDS (no typos)
- [ ] **Graduation_Year** - Valid 4-digit year (2010-2024)
- [ ] **Email** - Valid format (xxx@xxx.xxx)
- [ ] **Either** Employment section (all 5 cols) **OR** Higher Studies section (all 5 cols) **OR** Both
- [ ] **Employment dates** - Format YYYY-MM-DD
- [ ] **End_Date** - Blank for current job, or filled if job ended
- [ ] **Education years** - 4-digit numbers, Start <= End

### Common Mistakes

❌ Wrong date format: `06-18-2018` → Use `2018-06-18`
❌ Branch typo: `Computer Science` → Use `CS`
❌ Mixed email case: OK (system converts to lowercase)
❌ LinkedIn without https: → Add `https://linkedin.com/in/name`

---

## How to Save & Export

### For System Import

1. File → Save As → Format: **CSV (Comma delimited) (.csv)**
2. Filename: `alumni-import.csv`
3. Click Save
4. Excel asks "Keep this format?" → Click **Yes**
5. Upload the .csv file to the system

### Keep Backup

- Save Excel version: File → Save As → Format: **Excel Workbook (.xlsx)**
- This preserves formatting and colors

---

## Sample Data Provided

The template includes **12 complete example records**:

| S_ID   | Name            | Branch | Year | Company       | College       |
| ------ | --------------- | ------ | ---- | ------------- | ------------- |
| ALM001 | Rajesh Kumar    | CS     | 2018 | TCS           | IIT Bombay    |
| ALM002 | Priya Sharma    | AIDS   | 2019 | Google        | Stanford      |
| ALM003 | Amit Patel      | IT     | 2020 | Infosys       | Delhi Univ    |
| ALM004 | Sneha Desai     | ECE    | 2017 | Qualcomm      | NIT Surathkal |
| ALM005 | Vikram Singh    | ENTC   | 2019 | Vodafone      | IIT Delhi     |
| ALM006 | Ananya Gupta    | CS     | 2020 | Microsoft     | BITS Pilani   |
| ALM007 | Rohan Verma     | ENTC   | 2018 | Intel         | COEP Pune     |
| ALM008 | Divya Malhotra  | AIDS   | 2021 | IBM           | ISI Kolkata   |
| ALM009 | Sanjay Nair     | ECE    | 2019 | Nvidia        | NIT Rourkela  |
| ALM010 | Tanya Joshi     | IT     | 2020 | Adobe         | Anna Univ     |
| ALM011 | Nikhil Deshmukh | CS     | 2019 | Goldman Sachs | IIT Madras    |
| ALM012 | Harsh Patel     | IT     | 2021 | Accenture     | VIT Vellore   |

**Use these as reference** - modify S_ID, Names, and Companies for your actual data.

---

## FAQ for Admins

**Q: Do all students need employment data?**
A: No, but they need EITHER employment OR higher studies (or both).

**Q: What if a student is still working (no end date)?**
A: Leave Employment_End_Date blank - system treats it as current job.

**Q: Can I have multiple jobs for same student?**
A: Yes - create multiple rows with same S_ID but different employment data.

**Q: What about students with master's degree?**
A: List the master's degree in Higher Studies section. Backend supports multiple education records.

**Q: Do I need to fill LinkedIn?**
A: Recommended but not required. Email is required.

**Q: What if Branch is wrong?**
A: System will reject the import. Valid options: CS, IT, ECE, ENTC, AIDS only.

**Q: Can I import directly from this Excel file?**
A: No - must save as .csv first. System accepts CSV format only.

---

## Need Help?

1. **Column stuck?** → Scroll right to see columns 14-18 (Higher Studies data)
2. **Format not saving?** → Make sure you Save As → CSV before uploading
3. **Import fails?** → Check EMAIL and BRANCH columns first (most common issues)
4. **Want colored template?** → Follow "Format Headers" section above after opening in Excel

---

**Document Version:** 2.0
**Excel Template:** alumni-import-template.csv
**Last Updated:** April 2026
**Status:** Ready for Admin Use ✅
