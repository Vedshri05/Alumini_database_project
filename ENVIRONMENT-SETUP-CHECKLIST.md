# Environment Variables Setup Checklist

## Quick Reference: What Each Variable Does

### NEXT_PUBLIC_API_URL
- **Purpose:** Tells frontend where backend is located
- **Type:** Required
- **Values:**
  - Development: `http://localhost:8080/api`
  - Production: `https://yourdomain.com/api`
- **Why it matters:** Without this, frontend can't communicate with backend

---

## 5-Minute Setup

### Step 1: Create .env.local (1 min)
```bash
cd /path/to/project
touch .env.local
```

### Step 2: Add Backend URL (1 min)
Open `.env.local` and add:
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### Step 3: Save File (1 min)
- Save the file (Ctrl+S or Cmd+S)

### Step 4: Restart Frontend (2 min)
```bash
# Stop running Next.js (Ctrl+C)
npm run dev
# Frontend now uses your backend URL
```

### Step 5: Verify Connection (optional)
- Visit http://localhost:3000
- Check browser console (F12) for errors
- Should see data from backend if available

---

## Environment Variable Reference

| Variable | File | Required | Example | Purpose |
|----------|------|----------|---------|---------|
| `NEXT_PUBLIC_API_URL` | `.env.local` | ✅ Yes | `http://localhost:8080/api` | Backend connection URL |

---

## Different Scenarios

### Scenario 1: Local Development
```
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8080/api

# Run backend: mvn spring-boot:run (port 8080)
# Run frontend: npm run dev (port 3000)
```

### Scenario 2: Docker/Container
```
# .env.local (or docker-compose env)
NEXT_PUBLIC_API_URL=http://spring-boot-container:8080/api

# Backend and frontend run in separate containers
```

### Scenario 3: Production (Vercel)
```
# In Vercel Dashboard → Environment Variables
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api

# Frontend (vercel.com)
# Backend (yourdomain.com)
```

### Scenario 4: Production (AWS)
```
# In your CI/CD or deployment system
NEXT_PUBLIC_API_URL=https://backend-api.yourdomain.com/api

# Both frontend and backend on AWS infrastructure
```

---

## Troubleshooting

### "Cannot GET /api/alumni"
- Is Spring Boot running on port 8080?
- Check: http://localhost:8080/api/alumni in browser
- If 404, backend needs to be started

### "Failed to fetch from http://localhost:8080/api"
- CORS might be blocked
- Ensure AlumniManagementApplication.java has CORS config
- Check backend application.properties

### "Environment variable is undefined"
- Confirm file is `.env.local` (not `.env`)
- Restart Next.js dev server
- Confirm variable starts with `NEXT_PUBLIC_`

### "Works locally but not in production"
- Update NEXT_PUBLIC_API_URL to production domain
- Don't use localhost in production
- Verify SSL certificates if using https://

---

## What NOT to Do

❌ Don't use `http://localhost:8080/api` in production
❌ Don't commit `.env.local` to git
❌ Don't hardcode API URL in components
❌ Don't forget NEXT_PUBLIC_ prefix for frontend variables
❌ Don't forget to restart frontend after changing .env.local

---

## What You Should Have Now

✅ `.env.local` file in project root
✅ `NEXT_PUBLIC_API_URL` pointing to your Spring Boot backend
✅ Spring Boot backend running (or ready to run)
✅ Frontend can access backend APIs
✅ System ready for real data operations

---

## Next: Connect to Backend

Once variables are set up:

1. Start Spring Boot: `mvn spring-boot:run`
2. Start Frontend: `npm run dev`
3. Login to http://localhost:3000
4. Upload alumni CSV or add data
5. All operations now use backend APIs!
