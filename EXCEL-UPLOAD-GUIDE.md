# 📊 Excel Upload Guide - Alumni Database

## Quick Start

The Alumni Database now includes a **powerful Excel/CSV upload system** that allows you to bulk import alumni data with sample templates and detailed instructions.

---

## 🎯 What You Can Do

1. **Download Pre-made Templates** with sample data
2. **Upload CSV or Excel Files** with alumni information
3. **Automatic Data Validation** before import
4. **Instant Visibility** - Data appears immediately in the Alumni Database
5. **Search & Filter** the uploaded data

---

## 📥 How to Access Upload Feature

1. Go to **Admin Dashboard** → **Upload Alumni Data**
2. You'll see the upload panel with download options

---

## 🎁 Download Templates

### Option 1: Excel Template (Recommended)

- **Button**: "Excel Template"
- **File**: `alumni-import-template.xlsx`
- **Includes**:
  - Sample data sheet with 5 example alumni
  - Instructions sheet with detailed guidelines
  - Proper formatting and frozen headers
  - Pre-formatted columns for easy editing

### Option 2: CSV Sample

- **Button**: "CSV Sample"
- **File**: `alumni-import-template.csv`
- **Best for**: Simple bulk imports or editing in spreadsheet software

---

## 📋 Excel Template Structure

### Alumni Sheet

Contains sample data with the following columns:

| Column              | Required    | Format            | Example                         |
| ------------------- | ----------- | ----------------- | ------------------------------- |
| **Name**            | ✅ Yes      | Text              | John Doe                        |
| **Email**           | ✅ Yes      | Email             | john.doe@example.com            |
| **Phone**           | ❌ Optional | 10 digits         | 9876543210                      |
| **Graduation Year** | ✅ Yes      | 4-digit year      | 2020                            |
| **Branch**          | ✅ Yes      | Code (see below)  | CS                              |
| **Position**        | ❌ Optional | Text              | Senior Software Engineer        |
| **Company**         | ❌ Optional | Text              | Tech Corp                       |
| **Location**        | ❌ Optional | City/Region       | Mumbai                          |
| **LinkedIn**        | ❌ Optional | URL               | https://linkedin.com/in/johndoe |
| **Gender**          | ❌ Optional | Male/Female/Other | Male                            |
| **Higher Studies**  | ❌ Optional | Text              | MS Computer Science - Stanford  |

### Instructions Sheet

Complete guidelines including:

- Column definitions
- Required vs optional fields
- Branch codes with full names
- Important notes and tips
- File format requirements

---

## 🏗️ Engineering Branch Codes

Use these codes in the **Branch** column:

| Code     | Full Name                               |
| -------- | --------------------------------------- |
| **CS**   | Computer Science                        |
| **IT**   | Information Technology                  |
| **ENTC** | Electronics & Telecommunication         |
| **ECE**  | Electronics & Communication Engineering |
| **AIDS** | Artificial Intelligence & Data Science  |

---

## ✅ Required Fields (Must Fill)

1. **Name** - Full name (required, max 100 characters)
2. **Email** - Valid and unique email address
3. **Graduation Year** - Must be 4-digit year (1990-2050)
4. **Branch** - Use one of the codes above

---

## 📝 Optional Fields (Can Leave Empty)

- Phone number
- Current job position
- Company name
- Current location/city
- LinkedIn profile URL
- Gender
- Higher studies information

---

## 🔄 Upload Process

### Step 1: Prepare Your File

```
1. Download the Excel template
2. Keep the header row intact
3. Add your alumni data to the remaining rows
4. Ensure required fields are filled
5. Save as .xlsx or .csv format
```

### Step 2: Upload

```
1. Click the upload area (or drag and drop)
2. Select your prepared file
3. Click "Upload & Process"
4. Wait for confirmation message
```

### Step 3: View in Database

```
1. Successfully imported data appears immediately
2. Go to Alumni Database section
3. Use filters to find and verify data
4. Review employment and education details
```

---

## 📊 Sample Data Provided in Template

The Excel template includes 5 pre-filled alumni records as reference:

### 1. John Doe

- Email: john.doe@example.com
- Graduation Year: 2020
- Branch: CS (Computer Science)
- Position: Senior Software Engineer
- Company: Tech Corp
- Location: Mumbai
- Higher Studies: MS Computer Science - Stanford

### 2. Jane Smith

- Email: jane.smith@example.com
- Graduation Year: 2021
- Branch: AIDS (AI & Data Science)
- Position: Data Scientist
- Company: AI Solutions
- Location: Bangalore

### 3. Rahul Desai

- Email: rahul.desai@example.com
- Graduation Year: 2019
- Branch: ECE (Electronics & Communication)
- Position: Electronics Design Engineer
- Company: Semiconductor Corp
- Location: Pune

### 4. Priya Nair

- Email: priya.nair@example.com
- Graduation Year: 2022
- Branch: IT (Information Technology)
- Position: Full Stack Developer
- Company: Web Innovations
- Location: Delhi

### 5. Arjun Kumar

- Email: arjun.kumar@example.com
- Graduation Year: 2018
- Branch: ENTC (Electronics & Telecom)
- Position: Telecommunication Specialist
- Company: Network Systems
- Location: Hyderabad

---

## ⚙️ Data Validation Rules

The system validates data as follows:

### Name

- ✅ Must not be empty
- ✅ Maximum 100 characters
- ✅ Can contain letters, spaces, hyphens

### Email

- ✅ Must be valid email format
- ✅ Must be unique (no duplicates)
- ✅ Cannot be empty

### Graduation Year

- ✅ Must be 4-digit number
- ✅ Between 1990 and 2050
- ✅ Cannot be empty

### Branch

- ✅ Must be one of: CS, IT, ENTC, ECE, AIDS
- ✅ Case-sensitive (use uppercase)
- ✅ Cannot be empty

### Phone (Optional)

- ✅ Should be 10 digits if provided
- ✅ Can be empty

### LinkedIn URL (Optional)

- ✅ Should be valid URL format if provided

---

## 🔍 After Upload - Search & Filter

Once data is uploaded, you can:

### Search by:

- Name
- Email
- Company
- Position
- Location

### Filter by:

- **Graduation Year**: Select specific years
- **Branch**: Filter by engineering branch
- **Employment Status**: Employed, Unemployed, Self-employed
- **Location**: Filter by city/region
- **Industry**: Filter by industry sector
- **Skills**: Filter by technical skills

### Export Data:

- Download filtered results as CSV
- Export to Excel
- Generate PDF reports

---

## 🚨 Troubleshooting

### Upload Failed - "File Format Not Supported"

- **Solution**: Ensure file is .csv, .xlsx, or .xls
- Save as Excel format instead of older .xls
- Try CSV format if Excel fails

### Upload Failed - "Invalid Email Format"

- **Solution**: Check email addresses in the file
- Ensure emails are in format: `name@domain.com`
- Remove any extra spaces

### Upload Failed - "Branch Code Not Recognized"

- **Solution**: Use exact branch codes: CS, IT, ENTC, ECE, AIDS
- Codes are case-sensitive (uppercase only)
- Refer to branch codes table above

### Upload Failed - "Graduation Year Invalid"

- **Solution**: Use 4-digit year numbers only
- Valid range: 1990-2050
- Format: 2020, 2021, etc. (not '20 or 2020-2021)

### Data Not Visible After Upload

- **Solution**: Refresh the Alumni Database page
- Check if data was successfully uploaded (look for success message)
- Use filters to search for uploaded alumni
- Contact admin if data still missing

### Duplicate Email Error

- **Solution**: Each email must be unique
- Check if email already exists in database
- Use different email addresses for each alumni

---

## 💡 Best Practices

### Before Uploading:

1. **Review Template First** - Understand all fields
2. **Use Sample Data as Guide** - Follow the provided examples
3. **Validate Emails** - Ensure all emails are correct
4. **Check Branch Codes** - Use exact codes (CS, IT, ENTC, ECE, AIDS)
5. **Format Year Correctly** - Use 4-digit year format

### While Preparing Data:

1. **Keep Headers Intact** - Don't modify header row
2. **Fill Required Fields** - Name, Email, Graduation Year, Branch
3. **Use Consistent Format** - Standardize phone numbers, dates
4. **No Special Characters** - In email and name fields
5. **Test with Sample** - Try uploading 5-10 records first

### After Uploading:

1. **Refresh Page** - Wait for page to refresh
2. **Search Results** - Look up some entries to verify
3. **Check Filters** - Test branch and year filters
4. **Review Complete** - Verify all required data is present

---

## 📱 File Requirements

| Requirement    | Details                                      |
| -------------- | -------------------------------------------- |
| **Format**     | .xlsx, .xls, or .csv                         |
| **Encoding**   | UTF-8                                        |
| **Max Size**   | 10 MB                                        |
| **Max Rows**   | Unlimited (process in batches if > 1000)     |
| **Header Row** | Must be present and not modified             |
| **Columns**    | Min 4 (Name, Email, Graduation Year, Branch) |

---

## 🔐 Data Security

- ✅ All data validated before storage
- ✅ Emails verified for duplicates
- ✅ Password hashing for secure storage
- ✅ Role-based access control
- ✅ Data encrypted in transit
- ✅ Regular backups maintained

---

## 📞 Support

### If You Need Help:

1. **Check This Guide** - Most answers are here
2. **Review Instructions Sheet** - In the Excel template
3. **Run Test Upload** - With sample data first
4. **Contact Admin** - For persistent issues

---

## 🎓 Use Cases

### Scenario 1: Bulk Import Cohort

1. Get list from IT department
2. Prepare in Excel format
3. Upload all at once
4. Instant visibility in Alumni Database

### Scenario 2: Add Alumni Gradually

1. Download template
2. Add 10-20 alumni at a time
3. Upload each batch
4. Continue as more information available

### Scenario 3: Update Existing Data

1. Export current alumni list
2. Make updates (format same as original)
3. Upload updated file
4. System merges/updates records

### Scenario 4: Import from External System

1. Export from source system as CSV
2. Map columns to template format
3. Validate data quality
4. Upload to Alumni Database

---

## ✨ Features Coming Soon

- Batch duplicate detection and merging
- Profile photo bulk upload
- Automatic LinkedIn data import
- API endpoint for automated uploads
- Scheduled import jobs
- Import history and audit trail

---

## 📌 Quick Reference

### Download Templates:

- Excel: `alumni-import-template.xlsx` (recommended)
- CSV: `alumni-import-template.csv` (alternative)

### Required Fields:

- Name
- Email
- Graduation Year (4-digit)
- Branch (CS/IT/ENTC/ECE/AIDS)

### Upload Steps:

1. Prepare file
2. Click upload area
3. Select file
4. Click "Upload & Process"
5. View in Alumni Database

### Branch Codes:

- **CS** = Computer Science
- **IT** = Information Technology
- **ENTC** = Electronics & Telecom
- **ECE** = Electronics & Communication
- **AIDS** = AI & Data Science

---

**Last Updated**: April 2026

**Status**: ✅ Production Ready

For more details, visit the Admin Dashboard → Upload Alumni Data section.
