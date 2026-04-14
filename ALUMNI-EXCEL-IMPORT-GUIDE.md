# 📊 Alumni Excel/CSV Import Guide

## Overview

This guide explains how to use the Excel/CSV import feature to upload alumni data to the database. The system is designed to handle comprehensive alumni information including employment history and higher studies details.

---

## 📥 How to Upload Data

### Step 1: Download the Template

1. Go to the **Admin Dashboard**
2. Navigate to **Upload Alumni Data** section
3. Click **"Download Excel Template"** button
4. This generates a blank template with the correct column structure

### Step 2: Fill in Your Data

1. Open `alumni-import-template.xlsx` in Excel or Google Sheets
2. Enter your alumni data following the column definitions below
3. Save the file in `.xlsx` or `.csv` format

### Step 3: Upload the File

1. Go back to **Upload Alumni Data** section
2. Click the upload area or drag-and-drop your file
3. Click **"Upload & Process"** button
4. Wait for the confirmation message

### Step 4: View Data

1. The data is immediately visible in the **Alumni Database** section
2. Use filters and search to find specific alumni
3. Export filtered results as CSV if needed

---

## 📋 Column Reference

### Required Fields (Must be filled)

| Column              | Format | Description                    | Example                   |
| ------------------- | ------ | ------------------------------ | ------------------------- |
| **s_id**            | Number | Student ID - unique identifier | 1, 2, 3                   |
| **s_name**          | Text   | Full name of alumni            | MONALI MUKUND ABDULE      |
| **branch**          | Text   | Engineering branch             | Computer Science          |
| **graduation_year** | Text   | Graduation year                | 2012-13, 2020-21          |
| **email**           | Email  | Valid email (must be unique)   | abdulemonali123@gmail.com |

### Employment Information (Optional)

| Column               | Format | Description                           | Example                      |
| -------------------- | ------ | ------------------------------------- | ---------------------------- |
| **phone_no**         | Number | Contact number (10 digits)            | 7709359048                   |
| **linkedin_profile** | URL    | LinkedIn profile link                 | https://linkedin.com/in/name |
| **gender**           | Text   | M / F / Other                         | F                            |
| **company_name**     | Text   | Current employer                      | TCS, Google, Infosys         |
| **company_location** | Text   | Company location/city                 | Mumbai, Bangalore            |
| **position**         | Text   | Job title/role                        | Senior Software Engineer     |
| **start_date**       | Date   | Job start date                        | 2015-07-01 (YYYY-MM-DD)      |
| **end_date**         | Date   | Job end date (leave empty if current) | 2020-08-31                   |

### Higher Studies Information (Optional)

| Column               | Format | Description                 | Example              |
| -------------------- | ------ | --------------------------- | -------------------- |
| **college_name**     | Text   | University/Institution name | IIT Bombay, Stanford |
| **college_location** | Text   | College location            | Mumbai, California   |
| **domain_of_study**  | Text   | Degree and field            | M.Tech AI, MBA, PhD  |
| **start_year**       | Number | Study start year            | 2013                 |
| **end_year**         | Number | Study end year              | 2015                 |

---

## 🏗️ Supported Engineering Branches

You can use any of these branch names (use full name as shown):

- ✅ Computer Science
- ✅ Information Technology
- ✅ Electronics & Telecommunication
- ✅ Electronics & Communication
- ✅ Artificial Intelligence & Data Science
- ✅ Any custom branch name

---

## 📝 Data Format Guidelines

### Student ID (s_id)

- Must be unique across all records
- Use numbers (1, 2, 3, etc.)
- Cannot be blank

### Student Name (s_name)

- Full name in proper case or uppercase
- Example: "MONALI MUKUND ABDULE" or "John Doe"
- Cannot be blank

### Branch

- Use exact branch names as listed above
- Examples: "Computer Science", "Information Technology"
- Cannot be blank

### Graduation Year

- Format: "YYYY-YY" or "YYYY"
- Examples: "2012-13", "2020", "2021-22"
- Cannot be blank

### Email

- Must be valid and unique
- Format: name@domain.com
- Cannot be blank

### Phone Number

- 10-digit format
- Example: 7709359048
- No spaces, hyphens, or country codes
- Optional: leave blank if not available

### LinkedIn Profile

- Full URL starting with https://
- Example: https://linkedin.com/in/monali
- Optional: leave blank if not available

### Gender

- Use: M, F, or Other
- Optional: leave blank if not specified

### Employment Dates

- Format: YYYY-MM-DD (ISO format)
- Examples: 2015-07-01, 2020-12-31
- end_date can be blank if currently employed
- Optional: leave blank if not employed

### Higher Studies Years

- Use 4-digit year: 2013, 2015, 2023
- Optional: leave blank if no higher studies

---

## ✅ Sample Data

### Example 1: Employed Alumni with Higher Studies

```
s_id: 1
s_name: MONALI MUKUND ABDULE
branch: Computer Science
graduation_year: 2012-13
phone_no: 7709359048
email: abdulemonali123@gmail.com
linkedin_profile: https://linkedin.com/in/monali
gender: F
company_name: TCS
company_location: Mumbai
position: Senior Software Engineer
start_date: 2015-07-01
end_date: (leave blank - currently employed)
college_name: IIT Bombay
college_location: Mumbai
domain_of_study: M.Tech Computer Science
start_year: 2013
end_year: 2015
```

### Example 2: Current Student (No Employment)

```
s_id: 12
s_name: RAJESH KUMAR
branch: Information Technology
graduation_year: 2023-24
phone_no: 9123456789
email: rajesh.kumar@example.com
linkedin_profile: https://linkedin.com/in/rajesh
gender: M
company_name: (leave blank)
company_location: (leave blank)
position: (leave blank)
start_date: (leave blank)
end_date: (leave blank)
college_name: (leave blank)
college_location: (leave blank)
domain_of_study: (leave blank)
start_year: (leave blank)
end_year: (leave blank)
```

### Example 3: Minimal Data

```
s_id: 20
s_name: PRIYA SHARMA
branch: Computer Science
graduation_year: 2020-21
phone_no: (leave blank)
email: priya.sharma@example.com
linkedin_profile: (leave blank)
gender: (leave blank)
company_name: (leave blank)
position: (leave blank)
... (all other optional fields blank)
```

---

## 📥 Using Sample Data

A pre-filled sample file is provided (`alumni_sample_data.xlsx`) containing real alumni data. You can:

1. Download the sample file from the import section
2. Use it as a reference for your own data
3. Modify the data with your alumni information
4. Keep the same column structure

---

## 🔍 Data Visibility After Upload

Once data is uploaded successfully:

1. **Immediate Display**: Data appears instantly in the Alumni Database section
2. **Searchable**: Alumni can be found by name, email, or company
3. **Filterable**: Filter by:
   - Graduation year
   - Branch
   - Employment status
   - Location
   - Skills/interests
4. **Exportable**: Download filtered results as CSV
5. **Editable**: Admin can edit individual records

---

## ⚠️ Important Notes

### Dos ✅

- ✅ Use the provided template for consistent formatting
- ✅ Keep the header row (first row) intact
- ✅ Use unique email addresses
- ✅ Use unique student IDs
- ✅ Use standard date format (YYYY-MM-DD)
- ✅ Leave optional fields blank if data is unavailable
- ✅ Save as `.xlsx` or `.csv` format
- ✅ Test with a few records first before bulk upload

### Don'ts ❌

- ❌ Don't modify the header row
- ❌ Don't use special characters in s_id
- ❌ Don't include country codes in phones
- ❌ Don't use different date formats
- ❌ Don't add extra columns not in template
- ❌ Don't upload files larger than 10MB
- ❌ Don't use duplicate email addresses
- ❌ Don't skip required fields

---

## 🐛 Troubleshooting

### Issue: "Email must be unique"

**Solution**: Check for duplicate email addresses in your file. Remove or correct duplicates.

### Issue: "Invalid graduation year format"

**Solution**: Use format like "2020-21" or "2020". Avoid formats like "2020/2021" or "20-21".

### Issue: "Invalid phone number"

**Solution**: Use 10-digit format without spaces or hyphens. Example: 7709359048

### Issue: "Required field missing"

**Solution**: Ensure s_id, s_name, branch, graduation_year, and email are filled for every row.

### Issue: "Upload failed"

**Solution**:

1. Check file format (must be .xlsx or .csv)
2. Check file size (must be less than 10MB)
3. Ensure no special characters in column headers
4. Try uploading fewer records
5. Clear browser cache and try again

### Issue: "Data not visible after upload"

**Solution**:

1. Refresh the Alumni Database page (F5)
2. Check the email is valid
3. Verify all required fields were filled
4. Check browser console for errors (F12)

---

## 💡 Tips & Best Practices

1. **Batch Uploads**: Split large datasets (1000+ records) into smaller batches (500 each)
2. **Data Validation**: Check emails and phone numbers before uploading
3. **Consistent Formatting**: Use same case (UPPERCASE or Title Case) throughout
4. **Gradual Addition**: Start with key alumni, add more details later
5. **Backup**: Keep original Excel file as backup
6. **Updates**: To update existing records, re-upload with new data
7. **Testing**: Test with 5-10 records first to ensure format is correct

---

## 📞 File Specifications

| Specification          | Details                            |
| ---------------------- | ---------------------------------- |
| **File Format**        | .xlsx (Excel 2007+) or .csv        |
| **Max File Size**      | 10 MB                              |
| **Character Encoding** | UTF-8 (for CSV)                    |
| **Row Limit**          | No limit (depends on file size)    |
| **Column Order**       | Doesn't matter - uses header names |
| **Blank Rows**         | Will be skipped                    |
| **Duplicate Rows**     | Must have unique s_id and email    |

---

## 🎓 Next Steps

After uploading:

1. **View Data**: Go to Alumni Database section
2. **Search Alumni**: Use search bar to find specific records
3. **Apply Filters**: Filter by graduate year, branch, location
4. **Export Results**: Download filtered data as CSV
5. **Manage Events**: Create events and track alumni attendance
6. **Track Analytics**: View statistics and reports

---

## 📖 Related Documentation

- [Excel Upload Implementation Details](./EXCEL-UPLOAD-IMPLEMENTATION.md)
- [Complete Implementation Summary](./COMPLETE-IMPLEMENTATION-SUMMARY.md)
- [API Integration Guide](./API-INTEGRATION-GUIDE.md)
- [Authentication Implementation](./AUTHENTICATION-IMPLEMENTATION.md)

---

**Last Updated**: April 5, 2026

**Version**: 2.0

**Status**: ✅ Ready for Production
