# Quick Start Guide - Alumni Management Dashboard

## 5-Minute Setup

### Step 1: Start the Application
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### Step 2: Explore Sample Data
The dashboard loads with 8 sample alumni and 4 sample events automatically. Browse around to see:
- Dashboard with statistics
- Alumni directory
- Events list
- Analytics charts

### Step 3: Upload Your Data

**Option A: Use the Download Template**
1. Go to **Upload Alumni** section
2. Click **Download Template**
3. Edit the CSV file with your alumni data
4. Upload back to the system

**Option B: Manual CSV Creation**
Create a CSV file with these columns:
```
Name,Email,Phone,Graduation Year,Department,Major,Current Position,Company,Location,LinkedIn URL
Jane Smith,jane@example.com,+1-555-0001,2019,Engineering,Software Engineering,Tech Lead,Global Tech,San Francisco,https://linkedin.com/in/janesmith
Bob Johnson,bob@example.com,+1-555-0002,2020,Business,Finance,CFO,Finance Corp,New York,
```

### Step 4: Create an Event
1. Navigate to **Events**
2. Click **Create Event**
3. Fill in:
   - Title: "Alumni Reunion 2024"
   - Description: Your event details
   - Date: Pick a date
   - Time: Set start and end times
   - Type: Choose event type
4. Click **Create Event**

### Step 5: Track Attendance
1. Go to **Attendance**
2. Select your event from the dropdown
3. Check in attendees by entering their Alumni ID
4. View real-time statistics

### Step 6: View Analytics
1. Open **Reports & Analytics**
2. Explore interactive charts showing:
   - Alumni distribution
   - Event trends
   - Geographic data

## Common Tasks

### Adding New Alumni Records
1. **Excel Upload**: Go to Upload Alumni → Download template → Add your data → Upload
2. **Manual Entry**: In production version with database

### Managing Events
- **Create**: Click "Create Event" in Events section
- **Edit**: Click status to change event state
- **Delete**: Click trash icon on event card
- **Publish**: Change status from "Draft" to "Published"

### Checking Attendance
1. Select an event
2. Scan QR or enter Alumni ID
3. Status updates to "Attended"
4. Mark as "No-Show" if needed

### Exporting Data
1. Go to **Settings**
2. Click **Export Data as JSON**
3. Save the backup file locally

## Sample CSV Data

Copy-paste this into a CSV file to quickly test:

```
Name,Email,Phone,Graduation Year,Department,Major,Current Position,Company,Location
Alice Johnson,alice@company.com,555-0001,2018,Engineering,Computer Science,Senior Dev,TechCorp,NYC
Bob Smith,bob@company.com,555-0002,2019,Business,MBA,Manager,Finance Inc,Boston
Carol White,carol@company.com,555-0003,2020,Engineering,Data Science,Data Scientist,AI Labs,SF
David Brown,david@company.com,555-0004,2021,Liberal Arts,Economics,Analyst,Global Finance,Chicago
Emma Davis,emma@company.com,555-0005,2017,Engineering,Mechanical,Lead Engineer,AutoTech,Detroit
```

## Navigation Guide

| Section | Purpose |
|---------|---------|
| **Dashboard** | View key metrics and trends |
| **Upload Alumni** | Import CSV files with alumni data |
| **Alumni Database** | Search, filter, and manage alumni records |
| **Reports & Analytics** | View charts and data visualizations |
| **Events** | Create and manage alumni events |
| **Attendance** | Check-in and track event attendance |
| **Settings** | Export data and view system info |

## Features Overview

✅ **Dashboard**
- Real-time statistics
- Department breakdown
- Graduation year trends

✅ **Excel Upload**
- CSV import with validation
- Error reporting
- Template download

✅ **Alumni Database**
- Full-text search
- Department filtering
- LinkedIn integration

✅ **Event Management**
- Create/edit/delete events
- Multiple event types
- Capacity tracking

✅ **Attendance**
- Real-time check-in
- QR code support
- Status tracking

✅ **Analytics**
- Interactive charts
- Trend analysis
- Export capabilities

## Pro Tips

1. **Search Alumni**: Use the search bar in Alumni Database to find specific people by name, email, or company

2. **Filter Data**: Use department and year filters to narrow down results

3. **Bulk Import**: Upload a CSV file with hundreds of records - the system validates and imports automatically

4. **Event Status**: Move events through stages: Draft → Published → Ongoing → Completed

5. **Attendance Stats**: Check attendance rates in the dashboard and per-event reports

6. **Data Backup**: Regularly export your data from Settings for backup

## Sample Data Included

The app comes pre-loaded with:
- **8 Alumni** from various departments and graduation years
- **4 Events** (reunions, workshops, webinars)
- **Sample Analytics** showing trends and distributions

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Enter` | Submit forms |
| `Esc` | Close modals |
| `Cmd/Ctrl+K` | Search (in supported sections) |

## Troubleshooting

**Q: Data disappeared after page refresh?**
A: This is normal for the demo. Data is stored in memory. Implement a database for production.

**Q: CSV won't upload?**
A: Ensure columns are named correctly (Name, Email required). Check that emails are valid.

**Q: Charts aren't showing?**
A: Upload some data first! Charts appear once you have alumni records.

**Q: Can't find my uploaded alumni?**
A: Go to Alumni Database and check filters - they might be filtered by department.

## Next Steps

1. ✅ Upload your real alumni data
2. ✅ Create your upcoming events
3. ✅ Invite alumni to events
4. ✅ Track attendance at events
5. ✅ Review analytics and reports
6. ✅ Export data for further analysis

## For Production Deployment

Before going live, implement:
1. **Database**: Replace in-memory with PostgreSQL/Supabase
2. **Authentication**: Add login system
3. **API**: Create backend endpoints
4. **Validation**: Enhanced data validation
5. **Monitoring**: Error tracking and logging
6. **Backup**: Automated database backups

## Support

- Check README.md for detailed documentation
- Review component comments in source code
- Check type definitions in `/lib/types.ts`

---

**Happy managing! 🎓**
