# Why Files Are Not Getting Uploaded - Complete Fix Guide

## Problem Analysis

There are **TWO possible reasons** files are not uploading:

### Reason 1: Spring Boot Backend Not Running
**Symptom:** Files upload but nothing happens, or you see network errors
**Solution:** Start your Spring Boot backend server first

```bash
cd your-spring-boot-project
mvn spring-boot:run
```

Backend must be running on `http://localhost:8080` before uploading files.

---

### Reason 2: Environment Variable Not Set
**Symptom:** Files upload but frontend can't find backend
**Solution:** Set the environment variable

In v0 sidebar:
1. Click "Vars"
2. Add: `NEXT_PUBLIC_API_URL = http://localhost:8080/api`
3. Restart frontend

---

## Current System Architecture

### What Happens Now (In-Memory)
```
User Selects File
    ↓
Frontend validates locally (CSV parsing)
    ↓
Data stored in JavaScript memory
    ↓
Works only while app is running
    ↓
Data lost on refresh
```

### What Will Happen (With Backend)
```
User Selects File
    ↓
Frontend validates locally
    ↓
Sends to Spring Boot: POST /api/alumni/upload
    ↓
Backend validates again (security)
    ↓
Database stores in PostgreSQL
    ↓
Data persists permanently
```

---

## Troubleshooting Checklist

### Before Uploading Files

- [ ] **Spring Boot running?**
  ```bash
  curl http://localhost:8080/api/alumni
  # Should return: [] or list of alumni
  ```

- [ ] **Environment variable set?**
  ```javascript
  // In browser console (F12)
  console.log(process.env.NEXT_PUBLIC_API_URL)
  // Should show: http://localhost:8080/api
  ```

- [ ] **PostgreSQL database created?**
  ```sql
  SELECT datname FROM pg_database WHERE datname='alumni_db';
  ```

- [ ] **CORS enabled in backend?**
  Check that Spring Boot has CORS configuration for frontend origin

---

## Step-by-Step Upload Fix

### Step 1: Verify Backend is Running
```bash
# Terminal 1: Start Spring Boot
cd your-spring-boot-project
mvn spring-boot:run

# Check if running
curl -X GET http://localhost:8080/api/alumni
```

### Step 2: Set Environment Variable in v0
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### Step 3: Download CSV Template
In v0 dashboard:
1. Go to "Upload" tab
2. Click "Download Template"
3. Opens template with correct format

### Step 4: Prepare Your CSV
Fill the template with alumni data:
```csv
Name,Email,Phone,Graduation Year,Branch,Current Position,Company,Location,LinkedIn URL
John Doe,john@example.com,+91-9876543210,2020,CS,Senior Developer,Google,Bangalore,https://linkedin.com/in/john
Jane Smith,jane@example.com,+91-9876543211,2019,IT,IT Specialist,Microsoft,Delhi,
```

**Important:**
- Branch must be: CS, IT, ENTC, ECE, or AIDS
- Email format required (with @)
- All commas must be inside quotes if data contains commas

### Step 5: Upload File
1. Click upload area in dashboard
2. Select your CSV file
3. Click "Upload & Process"
4. Wait for success message

### Step 6: Verify Success
After upload:
1. Go to "Alumni Database" tab
2. Should see imported records
3. Check "Analytics" for branch breakdown

---

## Common Errors and Fixes

### Error 1: "Cannot read properties of undefined"
**Cause:** Backend API URL not set
**Fix:** Set `NEXT_PUBLIC_API_URL` environment variable

### Error 2: "Failed to fetch from http://localhost:8080"
**Cause:** Spring Boot not running or on different port
**Fix:** 
```bash
# Check if running on different port
curl http://localhost:8080/api/alumni
# If not working, start it
mvn spring-boot:run
```

### Error 3: "Invalid branch - must be CS, IT, ENTC, ECE, AIDS"
**Cause:** CSV has wrong branch name
**Fix:** Use exact branch codes:
- CS (Computer Science)
- IT (Information Technology)
- ENTC (Electronics & Telecommunication)
- ECE (Electronics & Communication Engineering)
- AIDS (Artificial Intelligence & Data Science)

### Error 4: "Invalid email format"
**Cause:** Email doesn't have @ symbol
**Fix:** Use valid emails like: john@example.com

### Error 5: "Duplicate email found"
**Cause:** Same email uploaded twice
**Fix:** Remove duplicate rows or update email

---

## File Upload Process Explained

### Phase 1: Frontend Validation (Client-Side)
```
✓ Check file is CSV
✓ Parse CSV headers
✓ Validate each row:
  - Name required
  - Email valid format
  - Branch is one of: CS, IT, ENTC, ECE, AIDS
  - Year between 1950-2030
✓ Show validation results
```

### Phase 2: Backend Validation (Server-Side)
```
POST /api/alumni/upload
✓ Check API authentication
✓ Validate data again (security)
✓ Check for duplicates in database
✓ Store in PostgreSQL
✓ Return success/error response
```

### Phase 3: Data Persistence
```
✓ Data saved in alumni table
✓ Import log created
✓ Frontend refreshes to show new records
✓ Analytics update automatically
```

---

## Quick Diagnostic Script

Add this to browser console (F12) to check everything:

```javascript
// Check environment variable
console.log("1. API URL:", process.env.NEXT_PUBLIC_API_URL);

// Check if backend is reachable
fetch(process.env.NEXT_PUBLIC_API_URL + '/alumni')
  .then(r => r.json())
  .then(data => console.log("2. Backend response:", data))
  .catch(e => console.log("2. Backend error:", e.message));

// Check if CORS is working
const testData = { test: true };
fetch(process.env.NEXT_PUBLIC_API_URL + '/alumni', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(testData)
})
  .then(r => r.json())
  .then(data => console.log("3. CORS works:", data))
  .catch(e => console.log("3. CORS error:", e.message));
```

---

## Still Not Working?

Check these in order:
1. Is Spring Boot running? (`mvn spring-boot:run`)
2. Is PostgreSQL running? (`psql -l`)
3. Is database created? (`SELECT datname FROM pg_database;`)
4. Environment variable set? (`console.log(process.env.NEXT_PUBLIC_API_URL)`)
5. CORS enabled in backend? (Check AlumniController.java has @CrossOrigin)
6. Check browser console (F12) for exact error message
7. Check Spring Boot console for error logs
