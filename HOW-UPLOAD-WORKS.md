# How the Upload Feature Works

## Overview
The upload feature allows administrators to import alumni data from CSV files. The system automatically validates, cleans, and stores the data in the backend database.

---

## Complete Upload Flow

### Step 1: User Selects File
```
User clicks "Choose File" → Selects CSV file from computer
```
- File is validated to ensure it's a CSV format
- File size limits apply (typically 50MB)
- File content is read into memory

### Step 2: User Clicks Upload
```
Frontend reads file content as text
↓
ExcelProcessor.parseCSV() is called
↓
CSV is parsed line by line
```

### Step 3: CSV Parsing & Validation
The system checks:
- **Required columns:** Name, Email (must be present)
- **Valid email format:** john@example.com
- **Valid graduation year:** 1950-2030
- **Valid branch:** CS, IT, ENTC, ECE, or AIDS
- **Each row is validated individually**

Example CSV format:
```csv
Name,Email,Phone,Graduation Year,Branch,Current Position,Company,Location,LinkedIn URL
"John Doe","john@example.com","+1-555-0001","2020","CS","Software Engineer","Tech Corp","San Francisco, CA","https://linkedin.com/in/johndoe"
"Jane Smith","jane@example.com","+1-555-0002","2019","IT","Systems Admin","Innovations Lab","New York, NY",""
```

### Step 4: Data Cleaning & Formatting
The system automatically:
- Trims whitespace from all fields
- Converts branch codes to uppercase (cs → CS)
- Validates email format
- Removes special characters where needed
- Assigns unique IDs to each record
- Sets timestamps (created date, updated date)

### Step 5: Error Detection
Invalid records are caught with detailed error messages:
```
Row 5: email - Invalid email format
Row 7: branch - Invalid branch. Valid options: CS, IT, ENTC, ECE, AIDS
Row 9: graduationYear - Invalid graduation year
```

### Step 6: Send to Backend (NEW - With Spring Boot)
After local validation passes:
```
Frontend → Send POST request to Spring Boot API
           /api/alumni/upload

Spring Boot → Receives CSV data
              Validates again on backend
              Stores in PostgreSQL database
              Returns success/error response
```

### Step 7: Success/Error Display
**If successful:**
```
✓ Successfully imported 98 alumni records!
  - 98 successful imports
  - 2 records skipped (validation errors)
  - Upload completed in 2.34 seconds
```

**If errors:**
```
✗ Import failed
  - Row 5: Invalid email format (john@.com)
  - Row 12: Missing required field (name)
  - Please fix these errors and try again
```

### Step 8: Data Stored in Database
```
PostgreSQL Database
├── alumni table
│   ├── id (UUID)
│   ├── name
│   ├── email
│   ├── phone
│   ├── graduationYear
│   ├── branch (CS, IT, ENTC, ECE, AIDS)
│   ├── currentPosition
│   ├── company
│   ├── location
│   ├── linkedinUrl
│   ├── createdAt
│   └── updatedAt
└── import_log table
    ├── id
    ├── fileName
    ├── uploadedAt
    ├── totalRecords
    ├── successfulRecords
    ├── failedRecords
    └── errors[]
```

---

## Example Upload Scenario

### Input CSV File (alumni.csv):
```csv
Name,Email,Phone,Graduation Year,Branch,Current Position,Company,Location,LinkedIn URL
"Alice Kumar","alice@example.com","+91-9876543210","2020","CS","Senior Developer","Google","Bangalore, India","https://linkedin.com/in/alice"
"Bob Singh","bob@example.com","+91-9876543211","2021","IT","IT Specialist","Microsoft","Delhi, India",""
"Charlie Patel","charlie@example.com","+91-9876543212","2019","ECE","Hardware Engineer","Intel","Hyderabad, India","https://linkedin.com/in/charlie"
"Diana Sharma","diana@invalid","2022","ENTC","Telecom Engineer","Airtel","Mumbai, India","" (INVALID EMAIL)
"Eve Johnson","eve@example.com","+1-555-0001","2018","AIDS","Data Scientist","OpenAI","San Francisco, USA",""
```

### Processing:
```
Total records in file: 5
Valid records: 4
Invalid records: 1

Valid Records Imported:
✓ Alice Kumar (CS, 2020)
✓ Bob Singh (IT, 2021)
✓ Charlie Patel (ECE, 2019)
✓ Eve Johnson (AIDS, 2018)

Failed Records:
✗ Row 5: Diana Sharma - Invalid email format (diana@invalid)
```

### Database Result:
```
4 alumni records stored in PostgreSQL
1 import log created with error details
Data visible in Alumni Database dashboard
Can be used for reports and event management
```

---

## Key Features

### 1. Smart Validation
- Validates each field individually
- Provides specific error messages
- Allows partial imports (skip bad rows, import good ones)

### 2. Automatic Data Cleaning
- Removes extra whitespace
- Handles case sensitivity (CSS → CS)
- Normalizes phone numbers
- Standardizes dates

### 3. Branch-Specific
- Only accepts: CS, IT, ENTC, ECE, AIDS
- Rejects unknown branches
- Shows available branches in error message

### 4. Duplicate Handling
- Checks for duplicate emails
- Prevents duplicate records
- Updates existing records if email matches (can be configured)

### 5. Audit Trail
- Logs all imports with timestamp
- Tracks successful vs failed records
- Stores error details for reference
- Can review import history

---

## Upload Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   NEXT.JS FRONTEND                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  ExcelUpload Component                               │   │
│  │  ├─ File input handler                               │   │
│  │  ├─ Progress indicator                               │   │
│  │  └─ Error/Success messages                           │   │
│  └──────────────────────────────────────────────────────┘   │
│                         ↓                                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  ExcelProcessor (lib/excel-processor.ts)             │   │
│  │  ├─ parseCSV()         → Parse CSV text             │   │
│  │  ├─ validateBranch()   → Check valid branches       │   │
│  │  ├─ validateEmail()    → Check valid emails         │   │
│  │  ├─ validateYear()     → Check valid years          │   │
│  │  └─ cleanData()        → Format data                │   │
│  └──────────────────────────────────────────────────────┘   │
│                         ↓                                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  API Client (lib/api-client.ts)                      │   │
│  │  └─ POST /api/alumni/upload                          │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                         ↓
              HTTP Request (CORS enabled)
                         ↓
┌─────────────────────────────────────────────────────────────┐
│              SPRING BOOT BACKEND                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  AlumniController (/api/alumni/upload)               │   │
│  │  ├─ Receives POST request with CSV data             │   │
│  │  ├─ Validates data again (backend validation)       │   │
│  │  └─ Calls AlumniService                             │   │
│  └──────────────────────────────────────────────────────┘   │
│                         ↓                                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  AlumniService (Business Logic)                      │   │
│  │  ├─ Process each record                              │   │
│  │  ├─ Check for duplicates                             │   │
│  │  ├─ Save to database                                 │   │
│  │  └─ Create import log                                │   │
│  └──────────────────────────────────────────────────────┘   │
│                         ↓                                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  AlumniRepository (JPA)                              │   │
│  │  └─ Save to Database                                 │   │
│  └──────────────────────────────────────────────────────┘   │
│                         ↓                                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  PostgreSQL Database                                 │   │
│  │  ├─ alumni table (stores records)                    │   │
│  │  └─ import_log table (stores upload history)         │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                         ↓
              HTTP Response (Success/Error)
                         ↓
         Frontend shows result to user
```

---

## Security & Validation Layers

### Layer 1: Frontend Validation (Fast Feedback)
- User sees errors immediately
- Prevents unnecessary backend calls
- Reduces server load

### Layer 2: Backend Validation (Security)
- Validates all data again on server
- Prevents malicious data
- Enforces business rules

### Layer 3: Database Constraints
- Primary key uniqueness
- Foreign key relationships
- Data type constraints

---

## Supported CSV Columns

| Column | Required | Type | Example |
|--------|----------|------|---------|
| Name | Yes | String | John Doe |
| Email | Yes | String | john@example.com |
| Phone | No | String | +1-555-0001 |
| Graduation Year | No | Number | 2020 |
| Branch | No | String | CS, IT, ENTC, ECE, AIDS |
| Current Position | No | String | Senior Developer |
| Company | No | String | Tech Corp |
| Location | No | String | San Francisco, CA |
| LinkedIn URL | No | URL | https://linkedin.com/in/john |

---

## Common Upload Scenarios

### Scenario 1: Perfect CSV
All data valid → All records imported → Success message

### Scenario 2: CSV with Errors
Some invalid records → Valid records imported → Error details shown for invalid rows

### Scenario 3: Duplicate Emails
Same email appears twice → First import succeeds → Second either skipped or merged (depends on configuration)

### Scenario 4: Empty CSV
No data rows → Error message → User prompted to add data

### Scenario 5: Wrong File Format
Not a CSV file → Error message → User prompted to use correct format

---

## After Upload

Once data is imported:
1. **View in Alumni Database** - See all imported records
2. **Create Events** - Use alumni for event invitations
3. **Generate Reports** - Analyze alumni by branch/year
4. **Track Attendance** - Register alumni for events
5. **Export Data** - Download alumni list as CSV

---

## Tips for Successful Uploads

1. **Use the template** - Download sample CSV template from the upload page
2. **Validate before uploading** - Check data in Excel/Google Sheets first
3. **Use correct branch codes** - CS, IT, ENTC, ECE, AIDS only
4. **Ensure valid emails** - Format: user@domain.com
5. **Separate uploads** - Upload smaller batches (100-500 records) for better error tracking
6. **Check import log** - Review what was imported and what failed
7. **Backup data** - Keep a copy of original CSV file
