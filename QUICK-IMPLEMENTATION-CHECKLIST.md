# Quick Implementation Checklist

## ✅ What's Been Done

- [x] Enhanced `lib/api-client.ts` with debug logging and error handling
- [x] Created `WebConfig.java` with CORS configuration
- [x] Created `.env.local` with environment variables
- [x] Created debugging documentation

## 🔧 What You Need to Do

### Step 1: Backend Update

```bash
# Copy WebConfig.java to your backend
# File location:
# backend-setup/src/main/java/com/alumni/config/WebConfig.java

# Rebuild backend
cd backend-setup
mvn clean install
mvn spring-boot:run
```

**Expected Output:**

```
... Spring Boot startup messages ...
... Initiating CORS configuration ...
Tomcat started on port(s): 8080
```

### Step 2: Frontend Update

```bash
# Frontend already has updated files:
# - lib/api-client.ts (with debug logging)
# - .env.local (with environment variables)

# Just restart the frontend:
npx next dev
```

**Expected Output in Browser Console:**

```
[ApiClient] ApiClient initialized {baseUrl: "http://localhost:8080/api"}
[ApiClient] Checking backend health...
[ApiClient] Health check result: {isHealthy: true, status: 200}
```

### Step 3: Verify It Works

1. **Check Backend is Running**

   ```bash
   # In another terminal
   curl http://localhost:8080/api/alumni
   # Should return JSON array or error message
   ```

2. **Check Frontend Shows Data**
   - Open http://localhost:3000
   - Go to Alumni Database
   - Should see alumni records or "No alumni found"

3. **Check Console Logs**
   - Open DevTools (F12)
   - Go to Console tab
   - Look for `[ApiClient]` messages
   - Verify no error messages

### Step 4: Test Upload

1. Navigate to Admin → Excel Upload
2. Upload your alumni data CSV
3. Check browser console for upload details
4. Verify data appears in Alumni Database
5. Check dashboard stats update

## 🐛 If Something Goes Wrong

### Error: Still seeing "Failed to fetch"

```bash
# 1. Check backend is actually running
java -version  # Check Java is installed
mvn --version  # Check Maven is installed

# 2. Rebuild backend fresh
cd backend-setup
mvn clean package -DskipTests
mvn spring-boot:run
```

### Error: No console logs appearing

```bash
# 1. Kill Next.js and restart
# Press Ctrl+C in next dev terminal

# 2. Restart with fresh build
npx next dev

# 3. Hard refresh browser: Ctrl+Shift+R
```

### Error: 404 Not Found from backend

```bash
# Check that WebConfig.java is in correct location:
# backend-setup/src/main/java/com/alumni/config/WebConfig.java

# Rebuild backend:
mvn clean install -DskipTests

# Check Spring logs show CORS registered
```

### Error: Connection Refused (backend not running)

```bash
# Terminal 1: Start Backend
cd backend-setup
mvn spring-boot:run

# Terminal 2: Start Frontend
npx next dev

# Terminal 3: Test connectivity
curl http://localhost:8080/api/alumni
```

## 📋 Files to Check

- ✅ `lib/api-client.ts` - Has debug logging functions `log()` and `logError()`
- ✅ `backend-setup/src/main/java/com/alumni/config/WebConfig.java` - CORS configuration exists
- ✅ `.env.local` - Has `NEXT_PUBLIC_DEBUG=true` and `NEXT_PUBLIC_API_URL=http://localhost:8080/api`

## 🎯 Success Indicators

When everything is working:

1. ✅ Backend starts without errors
2. ✅ Frontend starts without errors
3. ✅ Browser console shows `[ApiClient]` debug messages
4. ✅ No "Failed to fetch" errors
5. ✅ Alumni data loads and displays
6. ✅ Upload works and bulk imports data
7. ✅ Dashboard shows correct statistics

## 📊 Testing Your Setup

### Terminal Command Tests

```bash
# Test 1: Backend is running
curl -I http://localhost:8080/api/alumni
# Should show: HTTP/1.1 200

# Test 2: Get all alumni
curl http://localhost:8080/api/alumni | jq .
# Should show JSON array

# Test 3: Get statistics
curl http://localhost:8080/api/alumni/stats/overview | jq .
# Should show statistics object
```

### Browser Console Tests

```javascript
// Run in browser console (F12)

// Test 1: Check debug is enabled
console.log("%cDebug Mode: ", "color: green", typeof NEXT_PUBLIC_DEBUG);

// Test 2: Test health check
fetch("http://localhost:8080/api/alumni", {
  method: "GET",
  headers: { "Content-Type": "application/json" },
})
  .then((r) => {
    console.log("Status:", r.status);
    return r.json();
  })
  .then((data) => {
    console.log("Data:", data);
  })
  .catch((e) => {
    console.error("Error:", e);
  });
```

## 📞 Need Help?

1. **Check Debug Logs**: Open browser console (F12) → Console tab
2. **Read Debug Guide**: See `API-DEBUG-GUIDE.md` for troubleshooting
3. **Review Summary**: See `FIX-API-CONNECTIVITY-SUMMARY.md` for detailed info
4. **Check Backend Logs**: Look at terminal where you ran `mvn spring-boot:run`
5. **Verify Network**: Use curl or Postman to test endpoints directly

## ⏱️ Estimated Time

- Backend update: **2 minutes** (rebuild and restart)
- Frontend update: **1 minute** (already done, just restart)
- Verification: **5 minutes**
- **Total: ~10 minutes**

---

**Last Updated**: When you ran this fix
**Next Step**: Follow Step 1 above to rebuild your backend
