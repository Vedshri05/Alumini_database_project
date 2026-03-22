# Backend Integration Guide: In-Memory to Spring Boot

## Overview
This guide explains how to migrate the Next.js frontend from in-memory data storage to using Spring Boot API endpoints.

## Current State
- Data storage: JavaScript in-memory objects
- Data persistence: Session-based (lost on refresh)
- Location: All logic in `/lib/data-service.ts`

## Target State
- Data storage: PostgreSQL database
- Data persistence: Permanent
- Location: Spring Boot backend with REST APIs

## Implementation Steps

### Step 1: Set Up Environment Variables

Create `.env.local` in your Next.js project root:
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

This will be used by the API client automatically.

### Step 2: API Client Already Available

The API client is ready to use in `/lib/api-client.ts`:
```typescript
import { apiClient } from '@/lib/api-client';

// Example usage
const alumni = await apiClient.getAllAlumni();
const events = await apiClient.getAllEvents();
```

### Step 3: Update Components to Use API Client

#### Example: Alumni Database Component

**Before (In-Memory):**
```typescript
import { dataService } from '@/lib/data-service';

useEffect(() => {
  const allAlumni = dataService.getAllAlumni();
  setAlumni(allAlumni);
}, []);
```

**After (Spring Boot API):**
```typescript
import { apiClient } from '@/lib/api-client';

useEffect(() => {
  apiClient.getAllAlumni()
    .then((data: any) => setAlumni(data))
    .catch((error) => console.error('Error fetching alumni:', error));
}, []);
```

### Step 4: Update Data Service to Use API Client

**Option A: Complete Replacement**

Replace `/lib/data-service.ts` with API calls directly in components.

**Option B: Wrapper Service (Recommended)**

Create a new service layer that wraps the API client:

```typescript
// /lib/api-data-service.ts
import { apiClient } from '@/lib/api-client';
import { Alumni, Event, EventRegistration } from '@/lib/types';

export const apiDataService = {
  // Alumni
  getAllAlumni: async (): Promise<Alumni[]> => {
    return apiClient.getAllAlumni();
  },

  addAlumni: async (alumni: Alumni): Promise<Alumni> => {
    return apiClient.createAlumni(alumni);
  },

  updateAlumni: async (id: string, alumni: Alumni): Promise<Alumni> => {
    return apiClient.updateAlumni(id, alumni);
  },

  deleteAlumni: async (id: string): Promise<void> => {
    return apiClient.deleteAlumni(id);
  },

  // Events
  getAllEvents: async (): Promise<Event[]> => {
    return apiClient.getAllEvents();
  },

  addEvent: async (event: Event): Promise<Event> => {
    return apiClient.createEvent(event);
  },

  // Stats
  getStats: async (): Promise<any> => {
    return apiClient.getStatistics();
  },
};
```

### Step 5: Error Handling

Add try-catch blocks to handle API failures:

```typescript
useEffect(() => {
  const fetchAlumni = async () => {
    try {
      const data = await apiClient.getAllAlumni();
      setAlumni(data);
    } catch (error) {
      console.error('Failed to fetch alumni:', error);
      setError('Failed to load alumni data');
      // Show user-friendly error message
    }
  };

  fetchAlumni();
}, []);
```

### Step 6: Loading States

Add loading states for better UX:

```typescript
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.getAllAlumni();
      setAlumni(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

if (loading) return <div>Loading...</div>;
if (error) return <div className="text-red-600">Error: {error}</div>;
```

### Step 7: File Upload Integration

The Excel upload component needs to use the API:

```typescript
// In excel-upload.tsx
const handleFileUpload = async (file: File) => {
  try {
    const result = await apiClient.uploadAlumniCSV(file);
    setSuccessMessage(`Imported ${result.importedCount} alumni records`);
    // Refresh alumni list
    await refreshAlumniList();
  } catch (error) {
    setErrorMessage('Failed to upload file');
  }
};
```

### Step 8: Real-Time Refresh

After creating/updating data, refresh the list:

```typescript
const handleCreateEvent = async (eventData: Event) => {
  try {
    await apiClient.createEvent(eventData);
    // Refresh events list
    const events = await apiClient.getAllEvents();
    setEvents(events);
    setSuccessMessage('Event created successfully');
  } catch (error) {
    setErrorMessage('Failed to create event');
  }
};
```

## Component-by-Component Migration

### 1. Dashboard View Component
```typescript
import { apiClient } from '@/lib/api-client';

useEffect(() => {
  const loadDashboard = async () => {
    try {
      const stats = await apiClient.getStatistics();
      setStats(stats);
    } catch (error) {
      console.error('Failed to load statistics');
    }
  };

  loadDashboard();
}, []);
```

### 2. Excel Upload Component
Already has `apiClient.uploadAlumniCSV()` method available.

### 3. Alumni Database Component
```typescript
useEffect(() => {
  const loadAlumni = async () => {
    try {
      const alumni = await apiClient.getAllAlumni();
      setAlumni(alumni);
    } catch (error) {
      setError('Failed to load alumni');
    }
  };

  loadAlumni();
}, []);
```

### 4. Events Manager Component
```typescript
useEffect(() => {
  const loadEvents = async () => {
    try {
      const events = await apiClient.getAllEvents();
      setEvents(events);
    } catch (error) {
      setError('Failed to load events');
    }
  };

  loadEvents();
}, []);
```

### 5. Attendance Tracker Component
```typescript
const handleMarkAttendance = async (eventId: string, alumniId: string) => {
  try {
    await apiClient.markAttendance(eventId, alumniId, 'attended');
    // Refresh records
    const records = await apiClient.getAttendanceRecords(eventId);
    setRecords(records);
  } catch (error) {
    setError('Failed to mark attendance');
  }
};
```

### 6. Analytics Reports Component
```typescript
useEffect(() => {
  const loadAnalytics = async () => {
    try {
      const stats = await apiClient.getStatistics();
      setStats(stats);
    } catch (error) {
      setError('Failed to load analytics');
    }
  };

  loadAnalytics();
}, []);
```

## Testing the Integration

### 1. Start Spring Boot Backend
```bash
cd alumni-backend
mvn spring-boot:run
```

### 2. Verify API is Running
```bash
curl http://localhost:8080/api/alumni
```

### 3. Set Environment Variable
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### 4. Run Next.js Frontend
```bash
npm run dev
```

### 5. Test Each Feature
- Upload Excel file
- Create alumni
- Create event
- Register for event
- Mark attendance

## Troubleshooting

### CORS Errors
If you see CORS errors, ensure Spring Boot has CORS configured:
```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowedHeaders("*");
            }
        };
    }
}
```

### Connection Refused
- Check Spring Boot is running on port 8080
- Verify NEXT_PUBLIC_API_URL is correct
- Check firewall settings

### Network Errors
- Check browser console for detailed error messages
- Use Postman to test API endpoints directly
- Verify database is connected

## Rollback Plan

If you need to revert to in-memory storage:
1. Keep the original `/lib/data-service.ts`
2. Switch components back to use `dataService` instead of `apiClient`
3. The sample data will be restored on page load

## Performance Considerations

1. **Caching**: Consider implementing SWR (Stale-While-Revalidate) for better performance
2. **Pagination**: Use pagination for large alumni lists
3. **Lazy Loading**: Load data only when needed
4. **Batch Operations**: Load related data together

## Next Steps

1. Set up Spring Boot backend (see SPRING-BOOT-SETUP.md)
2. Create PostgreSQL database
3. Run migration scripts
4. Update each component to use API client
5. Test thoroughly
6. Deploy to production

## Support

- Spring Boot Documentation: https://spring.io/projects/spring-boot
- Next.js API Routes: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- PostgreSQL: https://www.postgresql.org/docs/
