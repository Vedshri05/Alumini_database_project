# Spring Boot Backend Setup - Complete Guide

## All Files Created in `/backend-setup/` Folder

### Configuration Files
1. **pom.xml** - Maven dependencies and project configuration
2. **application.properties** - Spring Boot configuration (database, JPA, logging)
3. **AlumniManagementApplication.java** - Main Spring Boot application class with CORS config

### Entity Classes (JPA Models)
1. **Alumni.java** - Alumni entity with all fields and validation
2. **Event.java** - Event entity with enums for type and status
3. **Attendance.java** - Attendance tracking entity

### Repository Interfaces (Data Access)
1. **AlumniRepository.java** - Custom queries for alumni data
2. **EventRepository.java** - Custom queries for events
3. **AttendanceRepository.java** - Custom queries for attendance

### DTO Classes (Data Transfer Objects)
1. **AlumniDTO.java** - DTO for Alumni with conversion methods
2. **EventDTO.java** - DTO for Events
3. **AlumniStatisticsDTO.java** - DTO for statistics data
4. **ApiResponse.java** - Standard API response wrapper

### Service Classes (Business Logic)
1. **AlumniService.java** - Alumni business operations (CRUD, search, statistics)

### Controller Classes (REST Endpoints)
1. **AlumniController.java** - REST endpoints for alumni management

### Project Setup Documents
1. **STEP-1-PROJECT-SETUP.md** - Step-by-step project creation instructions

---

## Quick Setup Instructions

### Step 1: Create Spring Boot Project

Choose ONE option:

**Option A: Spring Boot CLI** (Fastest)
```bash
spring boot new --from=https://start.spring.io \
  --build=maven \
  --javaVersion=17 \
  --name=alumni-management \
  --groupId=com.engineering \
  --artifactId=alumni-management

cd alumni-management
```

**Option B: Spring Initializr** (Web)
Visit https://start.spring.io and:
- Select Maven, Java 17, Spring Boot 3.2.0+
- Add dependencies: Spring Web, Spring Data JPA, PostgreSQL, Lombok, Validation
- Download ZIP and unzip

### Step 2: Copy All Files

Copy the following folders and files into your Spring Boot project:

```
alumni-management/
├── pom.xml (replace the existing one)
├── src/main/resources/
│   └── application.properties (replace or update)
└── src/main/java/com/engineering/alumni/
    ├── AlumniManagementApplication.java
    ├── entity/
    │   ├── Alumni.java
    │   ├── Event.java
    │   └── Attendance.java
    ├── repository/
    │   ├── AlumniRepository.java
    │   ├── EventRepository.java
    │   └── AttendanceRepository.java
    ├── dto/
    │   ├── AlumniDTO.java
    │   ├── EventDTO.java
    │   ├── AlumniStatisticsDTO.java
    │   └── ApiResponse.java
    ├── service/
    │   └── AlumniService.java
    └── controller/
        └── AlumniController.java
```

### Step 3: Set Up PostgreSQL Database

```bash
# Install PostgreSQL (if not already installed)
# macOS: brew install postgresql
# Windows: Download from https://www.postgresql.org/download/
# Linux: sudo apt-get install postgresql

# Create database
createdb alumni_db

# Connect to database
psql alumni_db

# Create tables (Hibernate will auto-create with ddl-auto=update)
```

### Step 4: Update application.properties

Edit `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/alumni_db
spring.datasource.username=postgres
spring.datasource.password=your_postgres_password
```

### Step 5: Build and Run

```bash
# Build the project
mvn clean build

# Run the application
mvn spring-boot:run

# Or run the JAR directly
java -jar target/alumni-management-1.0.0.jar
```

The API will be available at: **http://localhost:8080/api**

---

## API Endpoints Available (Step 1)

### Alumni Management
- `GET /api/alumni` - Get all alumni
- `GET /api/alumni/{id}` - Get alumni by ID
- `POST /api/alumni` - Create new alumni
- `PUT /api/alumni/{id}` - Update alumni
- `DELETE /api/alumni/{id}` - Delete alumni
- `GET /api/alumni/branch/{branch}` - Get alumni by branch
- `GET /api/alumni/year/{year}` - Get alumni by year
- `GET /api/alumni/search?query=...` - Search alumni
- `GET /api/alumni/stats/overview` - Get statistics

---

## Next Steps

### After Backend is Running:

1. **Create Event Service & Controller** - Handle event CRUD operations
2. **Create Attendance Service & Controller** - Handle attendance tracking
3. **Create CSV Upload Service** - Process CSV files for bulk alumni import
4. **Add Exception Handling** - Global exception handler for error responses
5. **Connect Frontend** - Update Next.js API calls to use Spring Boot endpoints
6. **Add Authentication** - Spring Security for user authentication (optional)
7. **Write Unit Tests** - JUnit tests for services and controllers

---

## Files Still Needed (For Complete Backend)

We've created Step 1-4. The following are provided in the guides already created:

- **EventService.java** - In SPRING-BOOT-CODE-EXAMPLES.md
- **EventController.java** - In SPRING-BOOT-CODE-EXAMPLES.md
- **AttendanceService.java** - In SPRING-BOOT-CODE-EXAMPLES.md
- **AttendanceController.java** - In SPRING-BOOT-CODE-EXAMPLES.md
- **CsvProcessingService.java** - In SPRING-BOOT-CODE-EXAMPLES.md
- **GlobalExceptionHandler.java** - In SPRING-BOOT-CODE-EXAMPLES.md

---

## Testing the API

### Using Postman or cURL

```bash
# Get all alumni
curl -X GET http://localhost:8080/api/alumni

# Create new alumni
curl -X POST http://localhost:8080/api/alumni \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "graduationYear": 2020,
    "branch": "CS",
    "company": "Tech Corp",
    "currentPosition": "Software Engineer"
  }'

# Get alumni by branch
curl -X GET http://localhost:8080/api/alumni/branch/CS

# Search alumni
curl -X GET "http://localhost:8080/api/alumni/search?query=John"
```

---

## Database Schema (Auto-created by Hibernate)

The following tables will be created automatically:

```sql
CREATE TABLE alumni (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  graduation_year INTEGER NOT NULL,
  branch VARCHAR(50) NOT NULL,
  current_position VARCHAR(255),
  company VARCHAR(255),
  location VARCHAR(255),
  linkedin_url VARCHAR(255),
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE events (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  event_date TIMESTAMP NOT NULL,
  location VARCHAR(255),
  capacity INTEGER,
  event_type VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE attendance (
  id UUID PRIMARY KEY,
  event_id UUID NOT NULL,
  alumni_id UUID NOT NULL,
  status VARCHAR(50) NOT NULL,
  registered_at TIMESTAMP,
  checked_in_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  FOREIGN KEY (event_id) REFERENCES events(id),
  FOREIGN KEY (alumni_id) REFERENCES alumni(id)
);
```

---

## Environment Setup Checklist

- [ ] Java 17+ installed
- [ ] Maven installed
- [ ] PostgreSQL installed and running
- [ ] alumni_db database created
- [ ] All files copied to correct directories
- [ ] application.properties configured
- [ ] Project builds successfully with `mvn clean build`
- [ ] Spring Boot runs without errors
- [ ] API endpoints respond with HTTP 200/201
- [ ] Database tables created automatically

---

## Troubleshooting

**Problem: "Connection refused" for database**
- Ensure PostgreSQL is running
- Check database URL and credentials in application.properties
- Run: `psql -U postgres -d alumni_db`

**Problem: "Class not found" errors**
- Run `mvn clean install` to download all dependencies
- Check that all entity classes are in correct package structure

**Problem: Port 8080 already in use**
- Change port in application.properties: `server.port=8081`
- Or kill existing process on port 8080

**Problem: CORS errors when connecting frontend**
- CORS is already configured in AlumniManagementApplication.java
- Update allowed origins if needed for your frontend URL

---

## Success Criteria

Your backend is ready when:
1. mvn spring-boot:run completes without errors
2. http://localhost:8080/api/alumni returns an empty array []
3. You can POST a new alumni and it returns with an ID
4. Database contains new alumni record
