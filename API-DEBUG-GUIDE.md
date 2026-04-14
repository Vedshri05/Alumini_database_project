## API Debugging Guide

### Enable Debug Logging

To enable detailed API debug logs in the browser console:

**Method 1: Environment Variable (Recommended)**

```bash
# Add to .env.local in your frontend root
NEXT_PUBLIC_DEBUG=true
```

Then restart the frontend:

```bash
npx next dev
```

**Method 2: Direct Browser Console**

```javascript
// Paste in browser console to test connectivity
const response = await fetch("http://localhost:8080/api/alumni", {
  method: "GET",
  headers: { "Content-Type": "application/json" },
});
console.log("Status:", response.status);
console.log("Response:", await response.json());
```

### Expected Debug Output

When `NEXT_PUBLIC_DEBUG=true`, you should see messages like:

```
[ApiClient] ApiClient initialized {baseUrl: "http://localhost:8080/api"}
[ApiClient] Checking backend health...
[ApiClient] Health check result: {isHealthy: true, status: 200}
[ApiClient] Fetching /alumni...
[ApiClient] Response received from /alumni {status: 200, statusText: "OK", contentType: "application/json;charset=UTF-8"}
[ApiClient] Successfully parsed response from /alumni
```

### Troubleshooting

#### 1. "Failed to fetch" Error

- **Cause**: CORS issue or backend not running
- **Check**:
  - Is backend running on `localhost:8080`? → `curl http://localhost:8080/api/alumni`
  - Is CORS configuration loaded? → Check for `@Configuration public class WebConfig`
  - Are origins allowed? → Check WebConfig.java allowedOrigins list

#### 2. HTTP 500 Errors

- **Cause**: Backend error
- **Debug**: Check backend logs (terminal where you ran `mvn spring-boot:run`)
- **Look for**: Stack traces, validation errors, database connection issues

#### 3. HTTP 401/403 Errors

- **Cause**: Authentication issue (if implemented)
- **Check**: Headers being sent, authentication tokens, credentials flag in fetch

#### 4. Empty Response / no data returned

- **Cause**: Database might be empty
- **Check**:
  - Has data been uploaded? Upload via Excel import
  - Check database: `SELECT COUNT(*) FROM alumni;`

### Testing Individual Endpoints

These commands test each endpoint individually:

```bash
# Get all alumni
curl http://localhost:8080/api/alumni

# Get alumni stats
curl http://localhost:8080/api/alumni/stats/overview

# Get all events
curl http://localhost:8080/api/events

# Check backend health
curl -I http://localhost:8080/api/alumni
```

### Backend Requirements

Ensure Spring Boot backend has:

✅ `@Configuration` class with CORS settings
✅ Correct `allowedOrigins` (includes `http://localhost:3000`)
✅ Methods allowed: GET, POST, PUT, DELETE, OPTIONS
✅ Headers: allowed headers includes Content-Type
✅ `allowCredentials(true)` enabled

### Frontend Requirements

Ensure Next.js frontend has:

✅ API_BASE_URL set to `http://localhost:8080/api`
✅ All fetch calls use correct endpoint paths
✅ Error handling wraps all API calls in try-catch
✅ Debug logging enabled (set `NEXT_PUBLIC_DEBUG=true`)

### Quick Health Check Script

Create a test file to verify connectivity:

```typescript
// lib/debug-health-check.ts
export async function healthCheck() {
  console.group("Health Check");

  try {
    console.log("1. Testing Alumni endpoint...");
    const alumni = await fetch("http://localhost:8080/api/alumni");
    console.log("  Status:", alumni.status, "✓");

    console.log("2. Testing Events endpoint...");
    const events = await fetch("http://localhost:8080/api/events");
    console.log("  Status:", events.status, "✓");

    console.log("3. Testing Stats endpoint...");
    const stats = await fetch(
      "http://localhost:8080/api/alumni/stats/overview",
    );
    console.log("  Status:", stats.status, "✓");

    console.log("✅ All endpoints responding");
  } catch (e) {
    console.error("❌ Health check failed:", e);
  }

  console.groupEnd();
}

// Call from browser console:
// import { healthCheck } from 'lib/debug-health-check';
// healthCheck();
```
