# API Integration Guide

This guide explains how the Next.js dashboard integrates with your Spring Boot backend API.

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

For production, update this to your deployed backend URL.

## API Client Structure

The API client (`lib/api-client.ts`) provides a centralized interface for all backend communication:

### Key Features

- Automatic error handling
- Type-safe responses
- Consistent request/response format
- Base URL configuration via environment variables

### Available Endpoints

#### Alumni Management

```typescript
// Get all alumni
await apiClient.getAllAlumni();

// Get alumni by ID
await apiClient.getAlumniById(id);

// Create new alumni
await apiClient.createAlumni(data);

// Update alumni
await apiClient.updateAlumni(id, data);

// Delete alumni
await apiClient.deleteAlumni(id);

// Search alumni
await apiClient.searchAlumni(query);

// Get alumni by branch
await apiClient.getAlumniByBranch(branch);

// Get alumni by graduation year
await apiClient.getAlumniByYear(year);

// Get alumni statistics
await apiClient.getAlumniStatistics();

// Bulk upload CSV
await apiClient.uploadAlumniCSV(file);
```

#### Event Management

```typescript
// Get all events
await apiClient.getAllEvents();

// Get event by ID
await apiClient.getEventById(id);

// Create event
await apiClient.createEvent(data);

// Update event
await apiClient.updateEvent(id, data);

// Delete event
await apiClient.deleteEvent(id);

// Get upcoming events
await apiClient.getUpcomingEvents();

// Get past events
await apiClient.getPastEvents();

// Get events by type
await apiClient.getEventsByType(type);

// Get events by status
await apiClient.getEventsByStatus(status);

// Search events
await apiClient.searchEvents(query);

// Get event statistics
await apiClient.getEventStatistics();
```

#### Attendance Management

```typescript
// Register alumni for event
await apiClient.registerForEvent(eventId, alumniId);

// Mark attendance (check-in)
await apiClient.markAttendance(eventId, alumniId);

// Get event attendance records
await apiClient.getEventAttendance(eventId);

// Get events attended by alumni
await apiClient.getAttendedEventsByAlumni(alumniId);

// Get attendance rate
await apiClient.getAttendanceRate(eventId);

// Get attendance statistics
await apiClient.getEventAttendanceStats(eventId);

// Get all attendance records
await apiClient.getAllAttendance();

// Update attendance status
await apiClient.updateAttendanceStatus(id, status);
```

## Custom Hooks

The `hooks/use-api.ts` file provides React hooks for common operations:

### useAlumni Hook

```typescript
const { data, loading, error, fetchAll, create, update, remove } = useAlumni();

// Fetch all alumni
await fetchAll();

// Create new alumni
await create(alumniData);
```

### useEvents Hook

```typescript
const { data, loading, error, fetchAll, fetchUpcoming, create } = useEvents();

// Fetch upcoming events
await fetchUpcoming();
```

### useAttendance Hook

```typescript
const { data, loading, error, register, markAttendance } = useAttendance();

// Register for event
await register(eventId, alumniId);
```

## Component Integration

### Dashboard Component

The dashboard fetches statistics from both alumni and events endpoints:

```typescript
const [alumniStats, eventStats] = await Promise.all([
  apiClient.getAlumniStatistics(),
  apiClient.getEventStatistics(),
]);
```

### Alumni Database Component

Displays all alumni with search and filter capabilities:

```typescript
// Load alumni
const response = await apiClient.getAllAlumni();
setAlumni(response.data || []);

// Delete alumni
await apiClient.deleteAlumni(id);
```

### Events Manager Component

Manages event creation, updates, and deletion:

```typescript
// Create event
const response = await apiClient.createEvent(eventData);

// Update event status
await apiClient.updateEvent(id, { status: 'PUBLISHED' });
```

### Attendance Tracker Component

Handles event registration and attendance marking:

```typescript
// Register alumni
await apiClient.registerForEvent(eventId, alumniId);

// Mark attendance
await apiClient.markAttendance(eventId, alumniId);
```

## Error Handling

All components include comprehensive error handling:

```typescript
try {
  const response = await apiClient.getAllAlumni();
  setData(response.data);
} catch (err) {
  console.error('Failed to load data:', err);
  setError('Failed to load data');
}
```

Components display user-friendly error messages with retry options.

## Response Format

All API responses follow this structure:

```typescript
{
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
```

## CORS Configuration

Ensure your Spring Boot backend has CORS configured to allow requests from your Next.js frontend:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*");
    }
}
```

## Testing the Integration

1. Start your Spring Boot backend:
   ```bash
   cd backend-setup
   mvn spring-boot:run
   ```

2. Start your Next.js frontend:
   ```bash
   npm run dev
   ```

3. Open http://localhost:3000 in your browser

4. Check the browser console for any API errors

## Troubleshooting

### Connection Refused

- Ensure the backend is running on port 8080
- Check the `NEXT_PUBLIC_API_URL` environment variable
- Verify CORS configuration

### 404 Not Found

- Verify the API endpoint paths match your backend controllers
- Check the Spring Boot logs for routing issues

### Data Not Loading

- Open browser DevTools Network tab
- Check for failed API requests
- Verify the response format matches expected structure

## Next Steps

1. Add authentication/authorization
2. Implement real-time updates with WebSockets
3. Add pagination for large datasets
4. Implement caching strategies
5. Add request retry logic
