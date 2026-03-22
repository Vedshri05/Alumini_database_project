# Spring Boot Backend - Quick Start Checklist

## Phase 1: Setup (Day 1)

### Backend Preparation
- [ ] Install Java 17+ and Maven
- [ ] Install PostgreSQL
- [ ] Create database: `CREATE DATABASE alumni_db;`
- [ ] Create user: `CREATE USER alumni_user WITH PASSWORD 'secure_password';`
- [ ] Grant permissions: `GRANT ALL PRIVILEGES ON DATABASE alumni_db TO alumni_user;`

### Spring Boot Project Creation
- [ ] Go to https://start.spring.io/
- [ ] Configure:
  - Project: Maven
  - Language: Java
  - Spring Boot: 3.2.0+
  - Packaging: Jar
  - Java: 17
- [ ] Add Dependencies:
  - Spring Web
  - Spring Data JPA
  - PostgreSQL Driver
  - Lombok
  - Validation
  - Spring Doc OpenAPI
- [ ] Generate and download project
- [ ] Extract and open in IDE (IntelliJ / VS Code)

### Database Schema
- [ ] Run SQL scripts from SPRING-BOOT-SETUP.md
- [ ] Verify tables created: `\dt` (in psql)

### Configure Application
- [ ] Update `application.yml` with database credentials
- [ ] Set `ddl-auto: update` for auto schema updates
- [ ] Configure logging levels
- [ ] Set `server.port: 8080`

## Phase 2: Core Implementation (Days 2-3)

### Entity Classes
- [ ] Create `Alumni.java` entity
- [ ] Create `Event.java` entity
- [ ] Create `EventRegistration.java` entity
- [ ] Create `Attendance.java` entity
- [ ] Add JPA annotations and validations
- [ ] Add Lombok annotations (@Data, @NoArgsConstructor, etc.)

### Repository Interfaces
- [ ] Create `AlumniRepository.java`
- [ ] Create `EventRepository.java`
- [ ] Create `EventRegistrationRepository.java`
- [ ] Add custom query methods

### Service Classes
- [ ] Create `AlumniService.java` with CRUD operations
- [ ] Create `EventService.java` with event management
- [ ] Create `AttendanceService.java` with attendance tracking
- [ ] Add business logic and validation
- [ ] Add `@Transactional` annotations where needed

### Controller Classes
- [ ] Create `AlumniController.java`
  - [ ] GET /alumni
  - [ ] POST /alumni
  - [ ] GET /alumni/{id}
  - [ ] PUT /alumni/{id}
  - [ ] DELETE /alumni/{id}
  - [ ] GET /alumni?branch=CS
  - [ ] POST /alumni/upload

- [ ] Create `EventController.java`
  - [ ] GET /events
  - [ ] POST /events
  - [ ] GET /events/{id}
  - [ ] PUT /events/{id}
  - [ ] DELETE /events/{id}
  - [ ] POST /events/{id}/register
  - [ ] GET /events/{id}/registrations

- [ ] Create `AttendanceController.java`
  - [ ] POST /events/{id}/attendance
  - [ ] GET /events/{id}/attendance

- [ ] Create `StatisticsController.java`
  - [ ] GET /statistics
  - [ ] GET /statistics/by-branch

### CORS Configuration
- [ ] Create `CorsConfig.java`
- [ ] Configure allowed origins: http://localhost:3000
- [ ] Configure allowed methods: GET, POST, PUT, DELETE
- [ ] Set max age to 3600

### Exception Handling
- [ ] Create `GlobalExceptionHandler.java`
- [ ] Handle `ResourceNotFoundException`
- [ ] Handle `ValidationException`
- [ ] Return proper HTTP status codes

## Phase 3: Testing (Day 4)

### Local Testing
- [ ] Start Spring Boot: `mvn spring-boot:run`
- [ ] Verify startup logs - no errors
- [ ] Check Swagger: http://localhost:8080/api/swagger-ui.html
- [ ] Test endpoints with Postman or Swagger UI

### Test Endpoints
- [ ] Create alumni: POST /api/alumni
- [ ] Get all alumni: GET /api/alumni
- [ ] Get alumni by branch: GET /api/alumni?branch=CS
- [ ] Update alumni: PUT /api/alumni/{id}
- [ ] Delete alumni: DELETE /api/alumni/{id}
- [ ] Create event: POST /api/events
- [ ] Get all events: GET /api/events
- [ ] Register for event: POST /api/events/{id}/register
- [ ] Mark attendance: POST /api/events/{id}/attendance
- [ ] Get statistics: GET /api/statistics

### Sample Data Creation
- [ ] Create 10 sample alumni using Postman/Swagger
- [ ] Create 4 sample events
- [ ] Create some registrations
- [ ] Mark some attendance records

## Phase 4: Frontend Integration (Days 5-6)

### Environment Setup
- [ ] Create `.env.local` in Next.js project
- [ ] Add `NEXT_PUBLIC_API_URL=http://localhost:8080/api`
- [ ] Verify env var is loaded: `console.log(process.env.NEXT_PUBLIC_API_URL)`

### API Client Testing
- [ ] API client exists at `/lib/api-client.ts`
- [ ] Test basic calls in browser console:
  ```javascript
  import { apiClient } from '@/lib/api-client';
  apiClient.getAllAlumni().then(console.log);
  ```

### Component Updates
Update each component to use API client:

1. [ ] **Dashboard View**
   - [ ] Fetch stats using `apiClient.getStatistics()`
   - [ ] Display branch breakdown from API

2. [ ] **Alumni Database**
   - [ ] Fetch alumni: `apiClient.getAllAlumni()`
   - [ ] Filter by branch: `apiClient.getAllAlumni()`
   - [ ] Delete alumni: `apiClient.deleteAlumni(id)`

3. [ ] **Excel Upload**
   - [ ] Upload file: `apiClient.uploadAlumniCSV(file)`
   - [ ] Display import results

4. [ ] **Events Manager**
   - [ ] Fetch events: `apiClient.getAllEvents()`
   - [ ] Create event: `apiClient.createEvent(data)`
   - [ ] Delete event: `apiClient.deleteEvent(id)`

5. [ ] **Attendance Tracker**
   - [ ] Get registrations: `apiClient.getEventRegistrations(eventId)`
   - [ ] Mark attendance: `apiClient.markAttendance(eventId, alumniId, status)`

6. [ ] **Analytics Reports**
   - [ ] Fetch statistics: `apiClient.getStatistics()`
   - [ ] Render charts from API data

### Error Handling
- [ ] Add try-catch blocks to all API calls
- [ ] Display error messages to users
- [ ] Add loading states
- [ ] Test with invalid data

## Phase 5: Deployment (Week 2)

### Backend Deployment
- [ ] Choose hosting: AWS, Heroku, DigitalOcean, etc.
- [ ] Set up production database
- [ ] Update application-prod.yml
- [ ] Build JAR: `mvn clean package`
- [ ] Deploy JAR to server
- [ ] Configure environment variables
- [ ] Set up SSL/HTTPS
- [ ] Test API endpoints in production

### Frontend Deployment
- [ ] Update `.env.production` with production API URL
- [ ] Build Next.js: `npm run build`
- [ ] Deploy to Vercel/Netlify/your hosting
- [ ] Test all features in production
- [ ] Monitor logs for errors

### Post-Deployment
- [ ] Set up monitoring/alerting
- [ ] Configure backups for database
- [ ] Set up CI/CD pipeline
- [ ] Document deployment process
- [ ] Create runbook for common issues

## Key Files Reference

| File | Purpose |
|------|---------|
| `/lib/api-client.ts` | HTTP client for API calls |
| `/SPRING-BOOT-SETUP.md` | Complete backend setup guide |
| `/BACKEND-INTEGRATION-GUIDE.md` | Migration from in-memory to API |
| `.env.local` | Local development configuration |
| `application.yml` | Spring Boot configuration |

## Common Commands

### Spring Boot
```bash
# Start development server
mvn spring-boot:run

# Build production JAR
mvn clean package

# Run tests
mvn test

# View dependencies
mvn dependency:tree
```

### Next.js
```bash
# Start development
npm run dev

# Build for production
npm run build

# Start production build
npm start

# Lint code
npm run lint
```

### PostgreSQL
```bash
# Connect to database
psql -U alumni_user -d alumni_db

# List tables
\dt

# Show table schema
\d alumni

# Backup database
pg_dump -U alumni_user alumni_db > backup.sql

# Restore database
psql -U alumni_user alumni_db < backup.sql
```

## Troubleshooting

### Spring Boot Won't Start
```
Problem: Connection refused error
Solution: 
  1. Check PostgreSQL is running: `systemctl status postgresql`
  2. Verify database exists: psql -l
  3. Check credentials in application.yml
  4. Check port 8080 is available: lsof -i :8080
```

### CORS Errors
```
Problem: Access to XMLHttpRequest blocked by CORS
Solution:
  1. Verify CorsConfig.java is in place
  2. Check allowed origins match frontend URL
  3. Browser console shows exact error - read it carefully
```

### Connection Timeout
```
Problem: Frontend can't reach backend
Solution:
  1. Verify backend is running: curl http://localhost:8080/api/alumni
  2. Check NEXT_PUBLIC_API_URL in .env.local
  3. Check firewall: sudo ufw status
  4. Check if running on different machine: use IP instead of localhost
```

### Validation Errors
```
Problem: 400 Bad Request when creating alumni
Solution:
  1. Check required fields are provided
  2. Verify branch is one of: CS, IT, ENTC, ECE, AIDS
  3. Check email format is valid
  4. Look at error message in response body
```

## Support Resources

- Spring Boot Docs: https://spring.io/projects/spring-boot/docs
- Spring Data JPA: https://spring.io/projects/spring-data-jpa
- PostgreSQL Docs: https://www.postgresql.org/docs/
- Next.js Documentation: https://nextjs.org/docs
- REST API Best Practices: https://restfulapi.net/

## Success Criteria

- [ ] Backend API responds to all requests
- [ ] Frontend displays alumni data from API
- [ ] Can upload Excel files and import to database
- [ ] Events can be created and managed
- [ ] Attendance can be tracked
- [ ] Analytics display correct data
- [ ] No console errors in browser
- [ ] No backend exceptions in logs
- [ ] All data persists after page refresh
- [ ] System works on clean database

Congratulations! You now have a full-stack alumni management system!
