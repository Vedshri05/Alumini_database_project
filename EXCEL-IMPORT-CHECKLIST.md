# Alumni Excel Import - Quick Checklist

**Before Importing Your Alumni Data - Use This Checklist**

---

## Pre-Import Validation Checklist

### ✅ File Format & Structure

- [ ] File is in `.csv` format (Comma-Separated Values)
- [ ] First row contains headers (S_ID, S_Name, Branch, etc.)
- [ ] No special characters in header row
- [ ] Each row has exactly 18 columns
- [ ] File uses UTF-8 encoding

### ✅ Required Alumni Fields (Must Have)

For **EVERY** record, these fields MUST be filled:

- [ ] **S_ID** - Unique identifier (e.g., ALM001, ALM002)
- [ ] **S_Name** - Full name (in quotes: "Rajesh Kumar")
- [ ] **Branch** - Must be one of: `CS`, `IT`, `ECE`, `ENTC`, `AIDS`
- [ ] **Graduation_Year** - 4-digit year (e.g., 2018, 2019)
- [ ] **Email** - Valid email address (name@domain.ext)

### ✅ At Least ONE of These Two Sections

**Employment Data** OR **Higher Studies Data** (or BOTH)

**If filling Employment:**

- [ ] Company_Name (Company name, e.g., "TCS")
- [ ] Company_Location (City, Country)
- [ ] Position (Job title)
- [ ] Employment_Start_Date (YYYY-MM-DD format)
- [ ] Employment_End_Date (YYYY-MM-DD format **OR leave BLANK for current job**)

**If filling Higher Studies:**

- [ ] College_Name (Institution name)
- [ ] College_Location (City, Country)
- [ ] Domain_Of_Study (Field of study)
- [ ] HS_Start_Year (4-digit year, e.g., 2014)
- [ ] HS_End_Year (4-digit year, e.g., 2018)

### ✅ Data Quality Checks

**Branch Validation**

- [ ] All branches are exactly: `CS` or `IT` or `ECE` or `ENTC` or `AIDS`
- [ ] No typos (not "COMPUTER SCIENCE", "IT Science", etc.)

**Year/Date Validation**

- [ ] Graduation_Year is between 2010-2024
- [ ] HS_Start_Year < HS_End_Year (if both provided)
- [ ] Employment_Start_Date format is YYYY-MM-DD
- [ ] Employment_End_Date format is YYYY-MM-DD (or blank)
- [ ] Graduation_Year ≥ Employment_Start_Year (graduated before/while working)

**Email Validation**

- [ ] All emails have `@` symbol
- [ ] Format is xxx@xxx.xxx
- [ ] No spaces in email addresses

**Date Format Validation**

- [ ] All dates use YYYY-MM-DD (e.g., 2018-06-01)
- [ ] No mixture of DD-MM-YYYY or MM-DD-YYYY formats
- [ ] Years are 4-digit (not 18, 19, 20 shortcuts)

**Uniqueness Check**

- [ ] No duplicate S_ID values
- [ ] Each alumni has unique identifier

### ✅ Recommended Fields (Enhance Data Quality)

- [ ] Phone_No filled with country code (+91-)
- [ ] LinkedIn_Profile has full URL (https://linkedin.com/in/...)
- [ ] Gender field completed (Male/Female/Other)
- [ ] College_Location filled (not left blank)

---

## Sample Row Structure

```
S_ID, S_Name, Branch, Graduation_Year, Phone_No, Email, LinkedIn_Profile, Gender,
Company_Name, Company_Location, Position, Employment_Start_Date, Employment_End_Date,
College_Name, College_Location, Domain_Of_Study, HS_Start_Year, HS_End_Year

"ALM001" , "Rajesh Kumar" , "CS" , "2018" , "+91-9876-543210" , "rajesh@example.com" ,
"https://linkedin.com/in/rajesh-kumar" , "Male" , "TCS" , "Bangalore, India" ,
"Senior Software Engineer" , "2018-06-01" , "" , "IIT Bombay" , "Mumbai, India" ,
"Computer Science" , "2015" , "2017"
```

**Note:** Empty end date (`""`) means currently working at that company.

---

## Common Mistakes to Avoid

❌ **WRONG** - Mix of date formats:

```
Employment_Start_Date = "06-18-2018"  (should be 2018-06-18)
Employment_Start_Date = "18-06-2018"  (should be 2018-06-18)
```

✅ **CORRECT:**

```
Employment_Start_Date = "2018-06-18"
```

---

❌ **WRONG** - Branch spelling:

```
Branch = "COMPUTER SCIENCE"
Branch = "IT Science"
Branch = "Cse"
```

✅ **CORRECT:**

```
Branch = "CS"
```

---

❌ **WRONG** - No employment or education data:

```
Company_Name = ""
College_Name = ""
(Both sections completely blank!)
```

✅ **CORRECT** (provide at least one):

```
Company_Name = "TCS"
College_Name = "IIT Bombay"
```

---

❌ **WRONG** - Email format:

```
Email = "rajesh kumar@example.com"  (space in name)
Email = "rajesh.examplecom"  (missing @)
Email = "rajesh@example"  (incomplete domain)
```

✅ **CORRECT:**

```
Email = "rajesh.kumar@example.com"
```

---

## Test Import Procedure

1. **Prepare** 5-10 sample records using the template
2. **Validate** against checklist above
3. **Import** these test records first
4. **Verify** in Alumni Dashboard:
   - [ ] Records appear in list
   - [ ] Names and IDs are correct
   - [ ] Branch filter works
   - [ ] Employment data displays
   - [ ] Higher studies data displays
5. **Check logs** for any warning messages
6. **Scale up** - Import all remaining records

---

## Quick Fix Guide

| Error Message                | Likely Cause                   | Fix                                          |
| ---------------------------- | ------------------------------ | -------------------------------------------- |
| "Invalid Branch"             | Typo in branch name            | Check spelling: CS, IT, ECE, ENTC, AIDS      |
| "Duplicate S_ID"             | Same ID used twice             | Make each S_ID unique (ALM001, ALM002, etc.) |
| "Invalid Email"              | Missing @ or space             | Ensure format: name@domain.ext               |
| "Invalid Date"               | Wrong date format              | Use YYYY-MM-DD not DD-MM-YYYY                |
| "Missing Required Field"     | S_Name, Email, or Branch blank | Fill all mandatory alumni fields             |
| "No Employment or Education" | Both sections empty            | Fill either Employment OR Higher Studies     |

---

## Template Files

**Available in project:**

- `alumni-import-template.csv` - Has 12 complete sample records with all 18 columns
- `engineering-alumni-sample.csv` - Same format with engineering college examples
- `EXCEL-IMPORT-FIELD-GUIDE.md` - Detailed field specifications and validation rules

---

## Need Help?

- **Field Guide Details:** See `EXCEL-IMPORT-FIELD-GUIDE.md`
- **Database Schema:** SQL tables align exactly with CSV columns
- **Support:** Contact admin with exported CSV and error message

---

**Ready to Import?**

1. ✅ Run through this checklist
2. ✅ Compare your data against sample files
3. ✅ Test with 5 records first
4. ✅ Import full batch

**Import Process:** Alumni Dashboard → Import → Select CSV → Review → Confirm
