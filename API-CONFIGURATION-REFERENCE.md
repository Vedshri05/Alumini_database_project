# API Configuration Reference

## Current Setup

### Frontend Configuration

```
Location: .env.local
```

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080/api

# Debug Mode - Set to 'true' to enable detailed console logging
NEXT_PUBLIC_DEBUG=true
```

### Backend Configuration

```
Location: backend-setup/src/main/java/com/alumni/config/WebConfig.java
```

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
            .addMapping("/api/**")  // Apply CORS to all /api endpoints
            .allowedOrigins(
                "http://localhost:3000",      // Development frontend
                "http://127.0.0.1:3000",      // Alternative localhost
                "http://localhost:8080",      // Backend itself
                "http://localhost:5173"       // Vite dev server
            )
            .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
            .allowedHeaders("*")              // Allow all headers
            .allowCredentials(true)           // Allow cookies/credentials
            .maxAge(3600);                    // Cache CORS policy
    }
}
```

## API Client Configuration

```
Location: lib/api-client.ts
```

- **Base URL**: `http://localhost:8080/api`
- **Debug Mode**: Controlled by `NEXT_PUBLIC_DEBUG` environment variable
- **Error Handling**: All methods wrapped in try-catch
- **Logging**: Each endpoint call logged with details

## Endpoints Configured

### Alumni Endpoints

- GET `/api/alumni` - Get all alumni
- GET `/api/alumni/{id}` - Get specific alumni
- POST `/api/alumni` - Create alumni
- PUT `/api/alumni/{id}` - Update alumni
- DELETE `/api/alumni/{id}` - Delete alumni
- POST `/api/alumni/upload` - Bulk upload CSV/Excel
- GET `/api/alumni/branch/{branch}` - Filter by branch
- GET `/api/alumni/year/{year}` - Filter by graduation year
- GET `/api/alumni/search?query=` - Search alumni
- GET `/api/alumni/stats/overview` - Get statistics

### Events Endpoints

- GET `/api/events` - Get all events
- GET `/api/events/{id}` - Get specific event
- POST `/api/events` - Create event
- PUT `/api/events/{id}` - Update event
- DELETE `/api/events/{id}` - Delete event
- GET `/api/events/upcoming` - Upcoming events
- GET `/api/events/past` - Past events
- GET `/api/events/type/{type}` - Filter by type
- GET `/api/events/status/{status}` - Filter by status
- GET `/api/events/search?query=` - Search events
- GET `/api/events/stats/overview` - Get statistics

### Attendance Endpoints

- POST `/api/attendance/register` - Register for event
- POST `/api/attendance/check-in` - Mark attendance
- GET `/api/attendance/event/{eventId}` - Get event attendance
- GET `/api/attendance/alumni/{alumniId}` - Get alumni events
- GET `/api/attendance/event/{eventId}/rate` - Get attendance rate
- GET `/api/attendance/event/{eventId}/stats` - Get attendance stats
- GET `/api/attendance` - Get all attendance records
- PUT `/api/attendance/{id}/status` - Update attendance status

## Debug Logging

### Enable Debug Mode

```env
NEXT_PUBLIC_DEBUG=true
```

### Expected Output in Console

```
[ApiClient] ApiClient initialized {baseUrl: "http://localhost:8080/api"}
[ApiClient] Checking backend health...
[ApiClient] Health check result: {isHealthy: true, status: 200}
[ApiClient] Fetching /alumni...
[ApiClient] Response received from /alumni {status: 200, statusText: "OK", contentType: "application/json;charset=UTF-8"}
[ApiClient] Successfully parsed response from /alumni
```

### Debug Functions

```typescript
const log = (message: string, data?: any) => {
  if (DEBUG) {
    console.log(`[ApiClient] ${message}`, data || "");
  }
};

const logError = (message: string, error?: any) => {
  console.error(`[ApiClient ERROR] ${message}`, error || "");
};
```

## CORS Settings Explained

| Setting            | Value                                  | Purpose                      |
| ------------------ | -------------------------------------- | ---------------------------- |
| `addMapping`       | `/api/**`                              | Apply CORS to all API routes |
| `allowedOrigins`   | localhost:3000                         | Allow requests from frontend |
| `allowedMethods`   | GET, POST, PUT, DELETE, PATCH, OPTIONS | Permit standard HTTP methods |
| `allowedHeaders`   | `*`                                    | Allow any custom headers     |
| `allowCredentials` | true                                   | Allow cookies/session data   |
| `maxAge`           | 3600                                   | Cache for 1 hour             |

## Environment Variables

### Frontend (.env.local)

```env
# Mandatory - tells fetch where backend is
NEXT_PUBLIC_API_URL=http://localhost:8080/api

# Optional - enables/disables debug logs
NEXT_PUBLIC_DEBUG=true
```

### Backend (application.properties)

```properties
# Already configured in your project
spring.datasource.url=jdbc:postgresql://localhost:5432/Alumini_db
spring.datasource.username=postgres
spring.datasource.password=your_password

# Batch size for bulk import
spring.jpa.properties.hibernate.jdbc.batch_size=100
spring.jpa.properties.hibernate.order_inserts=true
spring.jpa.properties.hibernate.order_updates=true
```

## Verification Steps

### Step 1: Backend Running

```bash
# Should return alumni data
curl http://localhost:8080/api/alumni

# Should return 200 OK
curl -I http://localhost:8080/api/alumni
```

### Step 2: Frontend Loaded

```javascript
// Run in browser console
fetch("http://localhost:8080/api/alumni")
  .then((r) => r.json())
  .then((data) => console.log("Alumni:", data))
  .catch((e) => console.error("Error:", e));
```

### Step 3: Console Logs

```
[ApiClient] ApiClient initialized {baseUrl: "http://localhost:8080/api"}
[ApiClient] Checking backend health...
[ApiClient] Health check result: {isHealthy: true, status: 200}
```

## Troubleshooting

### CORS Errors

**Error**: "Access to XMLHttpRequest blocked by CORS policy"
**Fix**: Ensure WebConfig.java is in place and Spring Boot is restarted

### Network Errors

**Error**: "Failed to fetch"
**Fix**: Check backend is running on localhost:8080

### 404 Errors

**Error**: "404 Not Found"
**Fix**: Verify endpoint path, check controller mapping

### 500 Errors

**Error**: "500 Internal Server Error"
**Fix**: Check backend logs, verify database connection

## File Locations

```
Frontend Files:
  lib/api-client.ts (Updated)
  .env.local (Created)

Backend Files:
  backend-setup/src/main/java/com/alumni/config/WebConfig.java (Created)
  backend-setup/src/main/resources/application.properties (Existing)
  backend-setup/pom.xml (No changes needed)

Documentation:
  API-DEBUG-GUIDE.md
  FIX-API-CONNECTIVITY-SUMMARY.md
  QUICK-IMPLEMENTATION-CHECKLIST.md
  README-API-FIX.md (This file)
```

## Production Configuration

### Change for Staging/Production

#### 1. Update .env.production

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
NEXT_PUBLIC_DEBUG=false
```

#### 2. Update WebConfig.java allowedOrigins

```java
.allowedOrigins(
    "https://yourdomain.com",
    "https://www.yourdomain.com",
    "https://app.yourdomain.com"
)
```

#### 3. Update application.properties

```properties
spring.datasource.url=jdbc:postgresql://prod-db-server:5432/Alumini_db
spring.datasource.username=prod_user
spring.datasource.password=prod_password
server.port=8080
server.servlet.context-path=/
```

## Security Checklist

- [ ] CORS only allows specific origins (not `*` for origins)
- [ ] DEBUG mode disabled in production
- [ ] Database credentials stored in environment variables
- [ ] API endpoints validated before processing
- [ ] Input validation on all POST/PUT endpoints
- [ ] HTTPS used for production
- [ ] CORS credentials handled securely

---

**Configuration Last Updated**: When this fix was implemented  
**Status**: Ready for Development and Testing
