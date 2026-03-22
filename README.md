# Alumni Management Dashboard

A comprehensive web-based alumni management system built with Next.js 16, React 19, and TypeScript. This platform enables organizations to manage alumni data, create and track events, monitor attendance, and generate detailed analytics reports.

## Features

### 📊 Dashboard
- Real-time statistics and metrics
- Alumni distribution by department and graduation year
- Event overview and attendance trends
- Key performance indicators

### 📁 Excel Upload & Data Processing
- Import alumni data from CSV files
- Automated data cleaning and validation
- Real-time error reporting and correction
- Support for multiple data formats
- Downloadable CSV template for data consistency

### 👥 Alumni Database
- Comprehensive alumni directory with advanced search
- Filter by department, graduation year, and location
- Manage contact information and professional details
- LinkedIn profile integration
- Full CRUD operations (Create, Read, Update, Delete)

### 📈 Reports & Analytics
- Advanced data visualization with Recharts
- Department-wise alumni distribution
- Graduation year analysis
- Geographic distribution tracking
- Event type analytics
- Attendance rate metrics
- Career path trends

### 🎪 Event Management
- Create and manage alumni events (reunions, workshops, webinars, networking)
- Set event capacity, location, and time details
- Track event status (draft, published, ongoing, completed)
- Event filtering and sorting
- Bulk event management

### ✅ Attendance Tracking
- Real-time check-in/check-out system
- QR code scanning support
- Manual attendance registration
- Attendance status tracking (registered, confirmed, attended, no-show)
- Attendance rate calculations
- Historical attendance records

### ⚙️ Settings & Data Management
- Export all data as JSON for backup
- System information and version tracking
- Feature list and capabilities
- Data clearing utilities (with confirmation)

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern web browser

### Installation

1. **Clone or download the project**
```bash
git clone <repository-url>
cd alumni-dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:3000`

### First Time Setup

The application automatically loads sample alumni data and events on first launch to help you understand the features:

- 8 sample alumni records across different departments
- 4 sample events (reunions, workshops, webinars)
- Example analytics and reports

## Usage Guide

### Uploading Alumni Data

1. **Navigate to "Upload Alumni"** from the sidebar
2. **Download the CSV template** for reference
3. **Prepare your data** with required columns: Name, Email
4. **Optional columns**: Phone, Graduation Year, Department, Major, Current Position, Company, Location, LinkedIn URL
5. **Upload the file** and review the import results
6. **Check for errors** and correct as needed

### Creating Events

1. **Go to "Events"** section
2. **Click "Create Event"**
3. **Fill in event details**:
   - Title and description
   - Event type (reunion, workshop, webinar, networking)
   - Date and time
   - Location (for in-person events)
   - Capacity (optional)
4. **Submit** to create the event
5. **Publish** when ready to open registrations

### Tracking Attendance

1. **Open "Attendance"** section
2. **Select an event** from the dropdown
3. **Check in attendees** using:
   - Manual QR code scanning
   - Alumni ID entry
4. **Mark as attended** or **no-show**
5. **View attendance statistics** and rates

### Viewing Analytics

1. **Go to "Reports & Analytics"**
2. **View interactive charts**:
   - Alumni distribution by department
   - Alumni by graduation year
   - Event type breakdown
   - Geographic distribution
3. **Export data** from Settings for further analysis

## Project Structure

```
├── app/
│   ├── layout.tsx           # Root layout with metadata
│   ├── globals.css          # Global styles and design tokens
│   └── page.tsx             # Main admin dashboard page
├── components/
│   ├── admin-sidebar.tsx    # Navigation sidebar
│   ├── dashboard-view.tsx   # Main dashboard component
│   ├── excel-upload.tsx     # CSV upload and processing
│   ├── alumni-database.tsx  # Alumni directory and search
│   ├── events-manager.tsx   # Event creation and management
│   ├── attendance-tracker.tsx # Check-in and attendance
│   ├── analytics-reports.tsx # Data visualization
│   └── settings-page.tsx    # System settings and export
├── lib/
│   ├── types.ts             # TypeScript type definitions
│   ├── data-service.ts      # In-memory database operations
│   ├── excel-processor.ts   # CSV parsing and validation
│   ├── sample-data.ts       # Sample data initialization
│   └── utils.ts             # Utility functions
└── public/                  # Static assets

```

## Data Models

### Alumni
```typescript
interface Alumni {
  id: string;
  name: string;
  email: string;
  phone?: string;
  graduationYear: number;
  department: string;
  major: string;
  currentPosition?: string;
  company?: string;
  location?: string;
  linkedinUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Event
```typescript
interface Event {
  id: string;
  title: string;
  description: string;
  eventType: 'reunion' | 'workshop' | 'webinar' | 'networking' | 'other';
  date: Date;
  startTime: string;
  endTime: string;
  location?: string;
  capacity?: number;
  registeredCount: number;
  status: 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}
```

### EventRegistration
```typescript
interface EventRegistration {
  id: string;
  eventId: string;
  alumniId: string;
  registeredAt: Date;
  rsvpStatus: 'registered' | 'confirmed' | 'attended' | 'no-show' | 'cancelled';
  attendanceQRCode?: string;
  checkedInAt?: Date;
}
```

## Technology Stack

- **Frontend**: React 19.2 with Next.js 16
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Data Management**: TypeScript with type-safe operations
- **CSV Processing**: Client-side CSV parsing
- **UUID Generation**: uuid package for unique identifiers

## Current Limitations & Future Enhancements

### Current (Demo Version)
- In-memory data storage (data resets on page refresh)
- No persistent database backend
- No user authentication/authorization
- No API endpoints

### Recommended Enhancements for Production
1. **Database Integration**
   - Migrate from in-memory to Supabase, PostgreSQL, or MongoDB
   - Implement proper data persistence

2. **Authentication**
   - Add user authentication with Auth.js or Supabase Auth
   - Role-based access control (admin, coordinator, user)
   - Secure session management

3. **API Layer**
   - Build REST or GraphQL API
   - Server-side data processing
   - Real-time notifications

4. **Advanced Features**
   - Actual QR code generation (currently simulated)
   - Email notifications for events
   - Document/file uploads
   - Multi-language support
   - Dark mode toggle

5. **Performance**
   - Database indexing
   - Pagination for large datasets
   - Caching strategies
   - Lazy loading for images

6. **Scalability**
   - Multi-organization support
   - Batch operations
   - Advanced search with Elasticsearch
   - Background job processing

## CSV Import Format

### Required Columns
- **Name**: Alumni full name
- **Email**: Email address (must be valid)

### Optional Columns
- **Phone**: Contact phone number
- **Graduation Year**: Year of graduation (1950-current year+5)
- **Department**: Department or school
- **Major**: Field of study
- **Current Position**: Current job title
- **Company**: Current employer
- **Location**: Current city/location
- **LinkedIn URL**: LinkedIn profile URL

### Example CSV
```csv
Name,Email,Phone,Graduation Year,Department,Major,Current Position,Company,Location,LinkedIn URL
John Doe,john@example.com,+1234567890,2020,Engineering,Computer Science,Software Engineer,Tech Corp,San Francisco,https://linkedin.com/in/johndoe
```

## Troubleshooting

### Data Not Persisting After Refresh
This is expected behavior in the demo version. Data is stored in memory and clears on page refresh. For production, implement a persistent database backend.

### CSV Import Errors
- Check that Name and Email columns exist
- Verify email addresses are valid (user@domain.com format)
- Ensure graduation years are reasonable (1950 - current year + 5)
- Review error messages in the upload results

### Charts Not Displaying
- Ensure you have data imported (use sample data or upload CSV)
- Check browser console for errors
- Verify Recharts library is properly loaded

## Support & Contribution

For issues, feature requests, or contributions:
1. Report bugs with detailed reproduction steps
2. Include relevant data and screenshots
3. Suggest features with use cases
4. Submit pull requests following the project structure

## License

This project is available for educational and organizational use.

## Changelog

### Version 1.0.0 (Initial Release)
- Complete alumni management system
- Excel CSV import with validation
- Event management and tracking
- Real-time attendance tracking
- Advanced analytics and reporting
- Responsive design for all devices
- Sample data for quick start

---

**Built with ❤️ for alumni management**
