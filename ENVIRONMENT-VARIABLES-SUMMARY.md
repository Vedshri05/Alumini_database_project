# Environment Variables Summary

## Simple Answer: What to Provide

### One Required Variable: `NEXT_PUBLIC_API_URL`

This tells your Next.js frontend where your Spring Boot backend is located.

**That's it. One variable. One URL.**

---

## Where to Put It

1. Create file: `.env.local` in your project root
2. Add this line:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   ```
3. Save file
4. Restart `npm run dev`

---

## What URL to Use

**For local development:**
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

**For production:**
```
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
```

---

## Why This Variable Exists

The frontend needs to know where the backend is. This variable tells it:
- Which server to send requests to
- Which domain/port to use
- How to format API calls

Without it, the frontend can't connect to the backend.

---

## How It's Used

When you do any operation in the UI:
- Upload alumni CSV → Sends to `{NEXT_PUBLIC_API_URL}/alumni/upload`
- View events → Fetches from `{NEXT_PUBLIC_API_URL}/events`
- Mark attendance → Posts to `{NEXT_PUBLIC_API_URL}/events/{id}/attendance`

---

## Complete Setup: 3 Steps

1. **Create `.env.local`**
   ```bash
   touch .env.local
   ```

2. **Add one line**
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   ```

3. **Restart frontend**
   ```bash
   npm run dev
   ```

Done! Your frontend now knows where your backend is.

---

## Backend Setup (Separate)

Spring Boot backend uses `application.properties` for database connection:
- `spring.datasource.url`
- `spring.datasource.username`
- `spring.datasource.password`

These are NOT frontend environment variables - they go in the backend project.

---

## Verification

To verify everything is connected:

1. Start Spring Boot backend
2. Start Next.js frontend
3. Go to http://localhost:3000
4. Open browser console (F12)
5. Should see no errors about "Cannot fetch from localhost:8080"
6. Try uploading alumni data - it should connect to backend

---

## Deployment

**Vercel (Frontend):**
- Go to Project Settings → Environment Variables
- Add `NEXT_PUBLIC_API_URL=https://your-backend.com/api`

**Spring Boot Backend:**
- Deploy to AWS, DigitalOcean, Heroku, etc.
- Update database connection strings there
- Frontend will connect to your public backend URL

---

## That's All You Need to Know

- One variable: `NEXT_PUBLIC_API_URL`
- One file: `.env.local`
- One URL: Your Spring Boot backend address
- Done!
