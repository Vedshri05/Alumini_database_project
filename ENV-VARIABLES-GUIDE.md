# Environment Variables Configuration Guide

## Overview
The Engineering Alumni Management System uses environment variables to configure connections to the Spring Boot backend. This guide explains what each variable does and how to set it up.

---

## Frontend Environment Variables (Next.js)

### 1. **NEXT_PUBLIC_API_URL** (Required)
- **What it is:** The URL where your Spring Boot backend is running
- **What to provide:** Base URL of your Spring Boot API server
- **Examples:**
  - Development: `http://localhost:8080/api`
  - Production: `https://api.alumni-system.com/api`
  - Docker: `http://spring-boot-container:8080/api`

- **How it works:** The frontend uses this URL to make HTTP requests to all backend endpoints:
  - Alumni operations: `{NEXT_PUBLIC_API_URL}/alumni`
  - Events: `{NEXT_PUBLIC_API_URL}/events`
  - Statistics: `{NEXT_PUBLIC_API_URL}/statistics`
  - Attendance: `{NEXT_PUBLIC_API_URL}/events/{id}/attendance`

- **Why NEXT_PUBLIC:** The `NEXT_PUBLIC_` prefix makes this variable available to the browser (client-side). This is necessary because the frontend needs to call the backend API from the user's browser.

- **Default value:** `http://localhost:8080/api` (if not set)

---

## Setup Instructions

### Step 1: Create .env.local file

Create a `.env.local` file in your project root (same level as package.json):

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### Step 2: For Development

When developing locally with Spring Boot running on your machine:

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

Then start both:
1. Spring Boot backend: `mvn spring-boot:run`
2. Next.js frontend: `npm run dev`

### Step 3: For Production (Vercel)

If deploying to Vercel:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add new variable:
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: `https://your-spring-boot-domain.com/api`
   - Environment: Production, Preview, Development (choose as needed)
3. Redeploy your project

### Step 4: For Docker Deployment

If using Docker Compose:

```yaml
# docker-compose.yml
version: '3'

services:
  spring-boot:
    image: alumni-backend:latest
    ports:
      - "8080:8080"
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/alumni_db

  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=alumni_db
      - POSTGRES_PASSWORD=password

  nextjs:
    image: alumni-frontend:latest
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://spring-boot:8080/api
```

---

## Backend Environment Variables (Spring Boot)

The Spring Boot backend uses its own configuration in `application.properties`. These are NOT frontend variables, but important for backend setup:

### Database Configuration

```properties
# application.properties (Spring Boot)

# Database Connection
spring.datasource.url=jdbc:postgresql://localhost:5432/alumni_db
spring.datasource.username=postgres
spring.datasource.password=your_password
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Server Configuration
server.port=8080
server.servlet.context-path=/api

# Logging
logging.level.root=INFO
logging.level.com.alumni=DEBUG
```

---

## Troubleshooting

### Issue: "Cannot connect to backend"
**Solution:**
1. Verify Spring Boot is running: `http://localhost:8080/api/alumni`
2. Check NEXT_PUBLIC_API_URL in .env.local
3. Ensure CORS is enabled in Spring Boot (should be in AlumniManagementApplication.java)
4. Check browser console for error messages

### Issue: "Environment variable not recognized"
**Solution:**
1. Confirm file is named `.env.local` (not `.env`)
2. Restart Next.js dev server after creating .env.local
3. Use `NEXT_PUBLIC_` prefix for client-side variables

### Issue: "API calls fail in production"
**Solution:**
1. Use absolute URL (not localhost) for production
2. Verify domain is accessible
3. Check CORS headers on backend
4. Ensure SSL/HTTPS if using https:// protocol

---

## Summary: What to Provide Where

| Variable | Where | What to Provide | Example |
|----------|-------|-----------------|---------|
| `NEXT_PUBLIC_API_URL` | `.env.local` | Spring Boot base URL | `http://localhost:8080/api` |
| Database URL | `application.properties` | PostgreSQL connection string | `jdbc:postgresql://localhost:5432/alumni_db` |
| DB Username | `application.properties` | PostgreSQL username | `postgres` |
| DB Password | `application.properties` | PostgreSQL password | `your_secure_password` |

---

## Next Steps

1. Create `.env.local` with `NEXT_PUBLIC_API_URL`
2. Ensure Spring Boot backend is configured and running
3. Start Next.js with `npm run dev`
4. Test by accessing http://localhost:3000

All API calls will now connect to your Spring Boot backend!
