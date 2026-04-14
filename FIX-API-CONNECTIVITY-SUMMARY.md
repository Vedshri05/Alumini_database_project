# API Fix Summary - CORS & Error Handling

## Overview

This fix addresses "Failed to fetch" errors between the Next.js frontend (localhost:3000) and Spring Boot backend (localhost:8080) by implementing proper CORS configuration and enhanced error handling with debug logging.

## Changes Made

### 1. **Enhanced API Client** (`lib/api-client.ts`)

#### Key Improvements:

- ✅ Added debug logging system (`log()` and `logError()` functions)
- ✅ Debug mode controlled by `NEXT_PUBLIC_DEBUG` environment variable
- ✅ Detailed error tracking for each endpoint call
- ✅ Better error messages with HTTP status and request details
- ✅ All fetch calls wrapped in try-catch blocks
- ✅ Endpoint paths logged for debugging
- ✅ Response headers and status logged
- ✅ File upload details logged (filename, size)
- ✅ Health check improved with detailed feedback

#### What Changed:

```typescript
// OLD: Minimal error handling
async getAllAlumni() {
  const response = await fetch(`${this.baseUrl}/alumni`);
  return this.handleResponse(response);
}

// NEW: Full debug logging and error handling
async getAllAlumni() {
  const endpoint = "/alumni";
  log(`Fetching ${endpoint}...`);
  try {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return this.handleResponse(response, endpoint);
  } catch (e) {
    logError(`Failed to fetch alumni from ${endpoint}`, e);
    throw e;
  }
}
```

### 2. **CORS Configuration** (`backend-setup/src/main/java/com/alumni/config/WebConfig.java`)

#### New File Created:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    public void addCorsMappings(CorsRegistry registry) {
        registry
            .addMapping("/api/**")
            .allowedOrigins(
                "http://localhost:3000",      // Frontend dev
                "http://127.0.0.1:3000",
                "http://localhost:8080",
                "http://localhost:5173"       // Vite dev
            )
            .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true)
            .maxAge(3600);
    }
}
```

#### What This Does:

- Enables Cross-Origin Resource Sharing for `/api/**` endpoints
- Allows requests from localhost:3000 (Next.js frontend)
- Permits all required HTTP methods (GET, POST, PUT, DELETE)
- Allows any headers (Content-Type, custom headers, etc.)
- Caches CORS policy for 1 hour (maxAge=3600)
- Allows credentials/cookies to be sent

### 3. **Environment Variables** (`.env.local`)

#### New File Created:

```
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080/api

# Debug Mode - Set to 'true' to enable detailed console logging
NEXT_PUBLIC_DEBUG=true
```

#### Uses:

- `NEXT_PUBLIC_API_URL`: Configures backend URL (overridable per environment)
- `NEXT_PUBLIC_DEBUG`: Controls whether debug logs appear in browser console

### 4. **Debugging Guide** (`API-DEBUG-GUIDE.md`)

Created comprehensive debugging documentation with:

- How to enable debug logging
- Expected console output
- Common error troubleshooting
- Endpoint testing commands
- Health check procedures

## How to Implement

### Step 1: Update Backend

1. Copy the new `WebConfig.java` file to your backend configuration folder
2. Rebuild backend:

```bash
cd backend-setup
mvn clean package -DskipTests
```

### Step 2: Update Frontend

1. Replace your `lib/api-client.ts` with the updated version
2. Create `.env.local` file with the environment variables
3. Restart frontend:

```bash
# Kill existing process (Ctrl+C)
npx next dev
```

### Step 3: Test Connectivity

1. Open browser DevTools (F12)
2. Go to Console tab
3. You should see:

```
[ApiClient] ApiClient initialized {baseUrl: "http://localhost:8080/api"}
[ApiClient] Checking backend health...
[ApiClient] Health check result: {isHealthy: true, status: 200}
```

## Debugging Tips

### Enable Debug Logs

Set `NEXT_PUBLIC_DEBUG=true` in `.env.local` and restart frontend.

### Check Endpoint Connectivity

```bash
# Test if backend is running
curl http://localhost:8080/api/alumni

# Should return JSON array of alumni records or error
```

### Monitor Browser Console

Look for messages like:

```
[ApiClient] Fetching /alumni...
[ApiClient] Response received from /alumni {status: 200, ...}
[ApiClient] Successfully parsed response from /alumni
```

### Test Upload Functionality

1. Go to Admin Dashboard → Excel Upload
2. Upload a CSV/Excel file
3. Check console logs show upload progress
4. Check backend logs for database insert details

## What Gets Fixed

✅ **CORS Errors**: Browser was blocking cross-origin requests

- **Before**: "Failed to fetch" with no details
- **After**: Requests allowed, errors clearly logged

✅ **Network Errors**: Now visible in debug logs

- **Before**: Silent failures
- **After**: Detailed error messages with timestamps

✅ **Endpoint Calls**: Tracked and verified

- **Before**: Unclear which endpoint failed
- **After**: Each endpoint logs request/response

✅ **Upload Operations**: Enhanced tracking

- **Before**: No feedback on upload progress
- **After**: File size, name, and response logged

## Validation

After implementing these changes, verify:

1. ✅ Backend starts without errors

   ```bash
   mvn spring-boot:run
   # Should see Spring Boot startup messages
   ```

2. ✅ Frontend connects successfully

   ```bash
   npx next dev
   # Should see ApiClient initialization logs
   ```

3. ✅ Alumni data loads
   - Navigate to Alumni Database
   - Should see alumni records displayed
   - Console shows successful fetch logs

4. ✅ Upload works
   - Navigate to Admin → Excel Upload
   - Upload CSV file
   - Console shows detailed upload logs
   - Check dashboard shows updated count

## Configuration for Different Environments

### Development (localhost)

```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_DEBUG=true
```

### Staging/Production

```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
NEXT_PUBLIC_DEBUG=false
```

Update `WebConfig.java` `allowedOrigins()` for each environment:

```java
.allowedOrigins(
    "https://yourdomain.com",
    "https://www.yourdomain.com"
)
```

## Troubleshooting Guide

### Problem: Still seeing "Failed to fetch"

**Solution**:

1. Check backend is running: `curl http://localhost:8080/api/alumni`
2. Verify WebConfig.java is registered: Check Spring logs for CORS configuration
3. Clear browser cache: Ctrl+Shift+Delete
4. Restart both frontend and backend

### Problem: No debug logs appearing

**Solution**:

1. Verify `.env.local` has `NEXT_PUBLIC_DEBUG=true`
2. Restart frontend (required for env changes)
3. Hard refresh browser (Ctrl+Shift+R)
4. Check console is showing Application/Verbose logs, not just Errors

### Problem: 405 Method Not Allowed

**Solution**:

1. Check endpoint HTTP method (GET/POST/PUT/DELETE)
2. Verify controller has correct @RequestMapping annotation
3. Check WebConfig allows that method

### Problem: 500 Internal Server Error

**Solution**:

1. Check backend console logs for stack trace
2. Verify database is running and accessible
3. Check entity relationships and annotations
4. Review recent database schema changes

## Files Modified/Created

| File                                                           | Type     | Purpose                                |
| -------------------------------------------------------------- | -------- | -------------------------------------- |
| `lib/api-client.ts`                                            | Modified | Added debug logging and error handling |
| `backend-setup/src/main/java/com/alumni/config/WebConfig.java` | Created  | CORS configuration                     |
| `.env.local`                                                   | Created  | Environment variables                  |
| `API-DEBUG-GUIDE.md`                                           | Created  | Debugging documentation                |

## Next Steps

1. **Implement these changes** in your local environment
2. **Restart both** frontend and backend
3. **Test** each endpoint (Alumni, Events, Upload)
4. **Monitor** browser console for debug logs
5. **Upload** test data and verify it displays correctly
6. **Set** `NEXT_PUBLIC_DEBUG=false` for production

## Additional Resources

- [CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Spring CORS Support](https://spring.io/guides/gs/rest-service-cors/)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Browser DevTools Console](https://developer.chrome.com/docs/devtools/console/)
