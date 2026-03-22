# Dashboard Quick Start Guide

Get your Alumni Management Dashboard up and running with your Spring Boot API in minutes.

## Prerequisites

- Node.js 18+ installed
- Java 17+ installed
- Maven installed
- MySQL/PostgreSQL database running

## Step 1: Configure Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## Step 2: Start the Backend

```bash
cd backend-setup
mvn spring-boot:run
```

The backend will start on http://localhost:8080

## Step 3: Install Frontend Dependencies

```bash
npm install
```

## Step 4: Start the Frontend

```bash
npm run dev
```

The dashboard will open at http://localhost:3000

## Step 5: Verify Integration

1. Open http://localhost:3000 in your browser
2. Navigate to the Dashboard page
3. Check if statistics are loading from the API
4. Open browser DevTools > Network tab to see API calls

## Dashboard Features

### 1. Dashboard View
- Real-time statistics from your backend
- Alumni count by engineering branch
- Graduation year distribution
- Event statistics and attendance rates

### 2. Alumni Database
- View all alumni records
- Search by name, email, or company
- Filter by engineering branch
- Delete alumni records
- Direct LinkedIn profile links

### 3. Events Manager
- Create new events
- View upcoming and past events
- Update event status (Draft, Published, Ongoing, Completed)
- Delete events
- Event capacity tracking

### 4. Attendance Tracker
- Register alumni for events
- Mark attendance (check-in)
- View attendance records per event
- Track attendance rates

### 5. Excel Upload
- Bulk import alumni from CSV files
- Automatic validation
- Error reporting
- Progress tracking

### 6. Analytics & Reports
- Branch-wise alumni distribution
- Event participation trends
- Attendance analytics
- Graduation year statistics

## API Endpoints Used

### Alumni
- `GET /api/alumni` - Get all alumni
- `GET /api/alumni/{id}` - Get alumni by ID
- `POST /api/alumni` - Create alumni
- `PUT /api/alumni/{id}` - Update alumni
- `DELETE /api/alumni/{id}` - Delete alumni
- `GET /api/alumni/search?query=` - Search alumni
- `GET /api/alumni/stats/overview` - Get statistics
- `POST /api/alumni/upload` - Bulk upload CSV

### Events
- `GET /api/events` - Get all events
- `GET /api/events/upcoming` - Get upcoming events
- `POST /api/events` - Create event
- `PUT /api/events/{id}` - Update event
- `DELETE /api/events/{id}` - Delete event
- `GET /api/events/stats/overview` - Get statistics

### Attendance
- `POST /api/attendance/register` - Register for event
- `POST /api/attendance/check-in` - Mark attendance
- `GET /api/attendance/event/{eventId}` - Get event attendance

## Troubleshooting

### Backend Not Connecting

**Error:** "Failed to load dashboard data"

**Solution:**
1. Check if backend is running: `curl http://localhost:8080/api/alumni`
2. Verify database connection in `application.properties`
3. Check CORS configuration in backend

### CORS Errors

**Error:** "Access to fetch blocked by CORS policy"

**Solution:** Add CORS configuration to your Spring Boot backend:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

### Data Not Displaying

**Error:** Empty tables or "No data available"

**Solution:**
1. Check browser console for API errors
2. Verify backend is returning data: `curl http://localhost:8080/api/alumni`
3. Check response format matches expected structure
4. Ensure database has sample data

### Port Already in Use

**Error:** "Port 3000 is already in use"

**Solution:**
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

## Sample Data

To test the dashboard, you can:

1. Use the Excel Upload feature with the sample CSV:
   - `public/engineering-alumni-sample.csv`

2. Create test data via API:
   ```bash
   curl -X POST http://localhost:8080/api/alumni \
     -H "Content-Type: application/json" \
     -d '{
       "name": "John Doe",
       "email": "john@example.com",
       "branch": "CS",
       "graduationYear": 2020
     }'
   ```

## Development Tips

### Hot Reload
Both frontend and backend support hot reload:
- Frontend: Changes auto-refresh in browser
- Backend: Use Spring DevTools for auto-restart

### API Testing
Use the browser DevTools Network tab to:
- Monitor API requests
- Check request/response payloads
- Debug failed requests

### Component State
React DevTools extension helps debug:
- Component state
- Props flow
- Re-render triggers

## Production Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
npm start
```

Update `.env.production`:
```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
```

### Backend (AWS/Heroku)
Update CORS to allow production frontend URL:
```java
.allowedOrigins("https://your-frontend.com")
```

## Next Steps

1. Add authentication (JWT tokens)
2. Implement role-based access control
3. Add email notifications for events
4. Implement real-time updates
5. Add data export features
6. Create mobile-responsive views

## Support

For issues or questions:
1. Check the API Integration Guide
2. Review backend logs
3. Check browser console errors
4. Verify database connectivity
