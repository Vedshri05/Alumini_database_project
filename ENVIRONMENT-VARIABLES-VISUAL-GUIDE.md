# Environment Variables - Visual Guide

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     YOUR COMPUTER / SERVER                   │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────┐         ┌──────────────────────┐
│   NEXT.JS FRONTEND   │         │  SPRING BOOT BACKEND │
│   (Port 3000)        │◄─────►  │   (Port 8080)        │
│                      │ .env.local
│  What URL?           │  API_URL=localhost:8080/api
│  Ask from env var!   │
└──────────────────────┘         └──────────────────────┘
         │                                   │
         │                                   │
         │                            ┌──────────────┐
         │                            │  PostgreSQL  │
         │                            │   Database   │
         │                            └──────────────┘
         │
    Uses env variable to
    know where backend is!
```

---

## The Environment Variable Flow

```
1. You create .env.local
   ├── NEXT_PUBLIC_API_URL=http://localhost:8080/api

2. Next.js reads this file
   ├── Makes it available to frontend code
   └── Prefixed with NEXT_PUBLIC_ = client-side access

3. Frontend component needs to call backend
   ├── Uses: process.env.NEXT_PUBLIC_API_URL
   └── Gets: http://localhost:8080/api

4. Frontend makes HTTP request
   ├── POST to: http://localhost:8080/api/alumni/upload
   └── Backend receives and processes

5. Backend sends response back
   ├── Frontend receives data
   └── UI updates with new information
```

---

## File Structure

```
your-project/
├── .env.local                 ← ⭐ Create this file
│   └── NEXT_PUBLIC_API_URL=...
│
├── app/
│   └── page.tsx              (Uses env variable)
│
├── components/
│   ├── excel-upload.tsx       (Uses env variable)
│   ├── alumni-database.tsx    (Uses env variable)
│   └── events-manager.tsx     (Uses env variable)
│
├── lib/
│   └── api-client.ts          (Uses env variable)
│
├── .env.example               (Reference/template)
├── package.json
└── ... other files
```

---

## What Environment Variable Does

### WITHOUT Environment Variable (❌ Broken)

```javascript
// Components don't know where backend is
const response = await fetch('http://localhost:8080/api/alumni');
// ❌ Hardcoded URL - won't work in production
// ❌ Can't change without editing code
// ❌ Same URL for dev, test, and production
```

### WITH Environment Variable (✅ Works)

```javascript
// Components ask for the URL
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const response = await fetch(`${API_URL}/alumni`);
// ✅ URL comes from .env.local
// ✅ Different URLs for each environment
// ✅ No code changes needed, just change .env.local
```

---

## Different Environments

### Development (Local Machine)

```
┌─────────────────────────┐
│   YOUR MACHINE          │
├─────────────────────────┤
│  .env.local             │
│ API_URL=localhost:8080  │
│                         │
│  Frontend: localhost:3000
│  Backend: localhost:8080
└─────────────────────────┘
```

```bash
# Run both on same machine
Terminal 1: npm run dev          # Frontend on 3000
Terminal 2: mvn spring-boot:run  # Backend on 8080
```

### Production (Cloud)

```
┌─────────────────────────────────────────┐
│         CLOUD (Vercel + AWS)            │
├─────────────────────────────────────────┤
│  Environment Variables (Vercel)         │
│  API_URL=https://api.yourdomain.com     │
│                                         │
│  Frontend: vercel.com (your app)       │
│  Backend: yourdomain.com/api (AWS)     │
└─────────────────────────────────────────┘
```

---

## The ONE Variable You Need

```
Variable Name:  NEXT_PUBLIC_API_URL
File:          .env.local
Required:      YES
Type:          URL string

Development:   http://localhost:8080/api
Production:    https://yourdomain.com/api
Docker:        http://service-name:8080/api

What it does:  Tells frontend where backend is
```

---

## Quick Reference Card

| Aspect | Details |
|--------|---------|
| **File** | `.env.local` (create in project root) |
| **Variable** | `NEXT_PUBLIC_API_URL` |
| **Prefix** | `NEXT_PUBLIC_` (required for browser access) |
| **Value** | Your Spring Boot backend URL |
| **Example** | `http://localhost:8080/api` |
| **Restart needed** | Yes, restart `npm run dev` after changing |

---

## Step-by-Step Setup

```
Step 1: Create File
  $ touch .env.local

Step 2: Open File
  $ code .env.local  (or your editor)

Step 3: Add Variable
  NEXT_PUBLIC_API_URL=http://localhost:8080/api

Step 4: Save File
  Ctrl+S (Windows/Linux) or Cmd+S (Mac)

Step 5: Restart Frontend
  Stop: Ctrl+C
  Start: npm run dev

Step 6: Verify
  - Go to http://localhost:3000
  - Check browser console for errors
  - No "localhost:8080" errors = Success!
```

---

## Common Mistakes

| ❌ Wrong | ✅ Correct |
|---------|-----------|
| File: `.env` | File: `.env.local` |
| No `NEXT_PUBLIC_` prefix | `NEXT_PUBLIC_API_URL=...` |
| `http://localhost` in production | `https://yourdomain.com` |
| Forgot to restart frontend | Run `npm run dev` after change |
| Hardcoded URL in code | Use `process.env.NEXT_PUBLIC_API_URL` |

---

## Verification Checklist

- [ ] `.env.local` file exists in project root
- [ ] File contains `NEXT_PUBLIC_API_URL=...`
- [ ] No leading/trailing spaces
- [ ] Spring Boot backend running (or ready)
- [ ] Frontend restarted after creating/changing .env.local
- [ ] No console errors about API connection

If all checked: **You're ready to use the system with backend!**
