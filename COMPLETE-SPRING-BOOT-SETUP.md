# Complete Step-by-Step Spring Boot Backend Setup Guide

## Project Overview
- **Name:** Alumni Management System
- **Framework:** Spring Boot 3.2.0
- **Database:** PostgreSQL
- **Java Version:** 17
- **Build Tool:** Maven

---

## STEP 1: Create Spring Boot Project (15 minutes)

### Option 1: Using Spring Initializr Website (RECOMMENDED - Easiest)

1. **Go to:** https://start.spring.io

2. **Configure the project:**
   - **Project Type:** Maven Project
   - **Language:** Java
   - **Spring Boot:** 3.2.0 (or latest)
   - **Java Version:** 17
   - **Packaging:** Jar

3. **Project Metadata:**
   - **Group:** com.engineering
   - **Artifact:** alumni-management
   - **Name:** Alumni Management
   - **Description:** Engineering Alumni Management System
   - **Package name:** com.engineering.alumni

4. **Add Dependencies (Click "ADD DEPENDENCIES"):**
   - Spring Web
   - Spring Data JPA
   - PostgreSQL Driver
   - Lombok
   - Validation

5. **Click "GENERATE"** - Downloads a ZIP file

6. **Extract the ZIP:**
   ```bash
   unzip alumni-management.zip
   cd alumni-management
   ```

---

## STEP 2: Copy Java Files from v0 Project (20 minutes)

Your `/backend-setup/` folder contains all Java files. Copy them to the correct locations:

### Create Folder Structure

```bash
mkdir -p src/main/java/com/engineering/alumni/{config,controller,service,repository,entity,dto,exception}
```

### Copy Files to Correct Locations

**Copy from `/backend-setup/` to your Spring Boot project:**

1. **Main Application Class:**
   ```
   AlumniManagementApplication.java 
   → src/main/java/com/engineering/alumni/
   ```

2. **Entity Classes** (to `entity/` folder):
   ```
   Alumni.java
   Event.java
   Attendance.java
   ```

3. **Repository Classes** (to `repository/` folder):
   ```
   AlumniRepository.java
   EventRepository.java
   AttendanceRepository.java
   ```

4. **DTO Classes** (to `dto/` folder):
   ```
   AlumniDTO.java
   EventDTO.java
   AttendanceDTO.java
   AlumniStatisticsDTO.java
   EventStatisticsDTO.java
   AttendanceStatisticsDTO.java
   ApiResponse.java
   ```

5. **Service Classes** (to `service/` folder):
   ```
   AlumniService.java
   EventService.java
   AttendanceService.java
   ```

6. **Controller Classes** (to `controller/` folder):
   ```
   AlumniController.java
   EventController.java
   AttendanceController.java
   ```

### Complete Project Structure After Copying:

```
alumni-management/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/engineering/alumni/
│   │   │       ├── AlumniManagementApplication.java
│   │   │       ├── controller/
│   │   │       │   ├── AlumniController.java
│   │   │       │   ├── EventController.java
│   │   │       │   └── AttendanceController.java
│   │   │       ├── service/
│   │   │       │   ├── AlumniService.java
│   │   │       │   ├── EventService.java
│   │   │       │   └── AttendanceService.java
│   │   │       ├── repository/
│   │   │       │   ├── AlumniRepository.java
│   │   │       │   ├── EventRepository.java
│   │   │       │   └── AttendanceRepository.java
│   │   │       ├── entity/
│   │   │       │   ├── Alumni.java
│   │   │       │   ├── Event.java
│   │   │       │   └── Attendance.java
│   │   │       ├── dto/
│   │   │       │   ├── AlumniDTO.java
│   │   │       │   ├── EventDTO.java
│   │   │       │   ├── AttendanceDTO.java
│   │   │       │   ├── AlumniStatisticsDTO.java
│   │   │       │   ├── EventStatisticsDTO.java
│   │   │       │   ├── AttendanceStatisticsDTO.java
│   │   │       │   └── ApiResponse.java
│   │   │       └── exception/
│   │   └── resources/
│   │       ├── application.properties
│   │       └── schema.sql
│   └── test/
├── pom.xml
├── README.md
└── .gitignore
```

---

## STEP 3: Set Up PostgreSQL Database (15 minutes)

### Install PostgreSQL

**On macOS:**
```bash
brew install postgresql
brew services start postgresql
```

**On Windows:**
- Download from https://www.postgresql.org/download/windows/
- Run installer and remember password for `postgres` user

**On Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Create Database and User

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE alumni_db;

# Create user
CREATE USER alumni_user WITH PASSWORD 'alumni123';

# Grant permissions
GRANT ALL PRIVILEGES ON DATABASE alumni_db TO alumni_user;

# Exit psql
\q
```

### Create Tables

Create file: `src/main/resources/schema.sql`

```sql
-- Alumni Table
CREATE TABLE alumni (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    graduation_year INTEGER,
    branch VARCHAR(50) NOT NULL,
    current_position VARCHAR(255),
    company VARCHAR(255),
    location VARCHAR(255),
    linkedin_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Event Table
CREATE TABLE event (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_type VARCHAR(50),
    date DATE NOT NULL,
    start_time VARCHAR(5),
    end_time VARCHAR(5),
    location VARCHAR(255),
    capacity INTEGER,
    registered_count INTEGER DEFAULT 0,
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Attendance Table
CREATE TABLE attendance (
    id UUID PRIMARY KEY,
    event_id UUID NOT NULL,
    alumni_id UUID NOT NULL,
    check_in_time TIMESTAMP,
    check_out_time TIMESTAMP,
    rsvp_status VARCHAR(50),
    attendance_status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES event(id),
    FOREIGN KEY (alumni_id) REFERENCES alumni(id)
);

-- Create Indexes for faster queries
CREATE INDEX idx_alumni_branch ON alumni(branch);
CREATE INDEX idx_alumni_graduation_year ON alumni(graduation_year);
CREATE INDEX idx_event_date ON event(date);
CREATE INDEX idx_attendance_event ON attendance(event_id);
CREATE INDEX idx_attendance_alumni ON attendance(alumni_id);
```

---

## STEP 4: Configure application.properties (10 minutes)

Replace `src/main/resources/application.properties` with:

```properties
# =============================================
# SERVER CONFIGURATION
# =============================================
server.port=8080
server.servlet.context-path=/api

# =============================================
# DATABASE CONFIGURATION
# =============================================
spring.datasource.url=jdbc:postgresql://localhost:5432/alumni_db
spring.datasource.username=alumni_user
spring.datasource.password=alumni123
spring.datasource.driver-class-name=org.postgresql.Driver

# =============================================
# JPA/HIBERNATE CONFIGURATION
# =============================================
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.use_sql_comments=true

# =============================================
# LOGGING CONFIGURATION
# =============================================
logging.level.root=INFO
logging.level.com.engineering.alumni=DEBUG
logging.level.org.springframework.web=DEBUG

# =============================================
# APPLICATION CONFIGURATION
# =============================================
spring.application.name=Alumni Management System
```

---

## STEP 5: Update pom.xml (5 minutes)

Copy the pom.xml from `/backend-setup/pom.xml` to your project root, replacing the existing one.

---

## STEP 6: Build the Project (10 minutes)

Open terminal in project root and run:

```bash
# Clean and build
mvn clean install

# This will:
# - Download all dependencies (first time takes 2-3 minutes)
# - Compile Java code
# - Run tests
# - Create JAR file
```

---

## STEP 7: Run the Backend (5 minutes)

```bash
# Start Spring Boot application
mvn spring-boot:run

# OR if already built:
java -jar target/alumni-management-1.0.0.jar
```

**Expected Output:**
```
.   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_|\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::   (v3.2.0)

Started AlumniManagementApplication in 5.234 seconds (process running for 5.567)
```

**Backend is now running at:** `http://localhost:8080/api`

---

## STEP 8: Test Backend APIs (10 minutes)

### Test with cURL

```bash
# Get all alumni
curl http://localhost:8080/api/alumni

# Get all events
curl http://localhost:8080/api/events

# Get statistics
curl http://localhost:8080/api/alumni/statistics
```

### Test with Postman

1. Download Postman: https://www.postman.com/downloads/
2. Create requests to:
   - GET `http://localhost:8080/api/alumni`
   - GET `http://localhost:8080/api/events`
   - POST `http://localhost:8080/api/alumni` (with JSON body)

---

## STEP 9: Connect Frontend to Backend (5 minutes)

In your Next.js frontend project, set environment variable:

**Create `.env.local`:**
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

Restart frontend:
```bash
npm run dev
```

---

## STEP 10: Verify Everything Works (5 minutes)

1. Frontend should load at `http://localhost:3000`
2. Open v0 and enter environment variable when prompted
3. Try uploading alumni CSV data
4. Check that data appears in dashboard
5. Create events and track attendance

---

## Summary of All Commands

```bash
# 1. Create project from Spring Initializr
cd alumni-management

# 2. Copy all Java files from backend-setup/

# 3. Setup PostgreSQL
psql -U postgres
# Run schema.sql commands

# 4. Build
mvn clean install

# 5. Run backend
mvn spring-boot:run

# 6. In another terminal, run frontend
cd ../your-frontend
npm run dev
```

---

## Troubleshooting

### "Connection refused" on startup
- Check PostgreSQL is running: `psql -U postgres`
- Check database credentials in application.properties

### "Port 8080 already in use"
- Change port in application.properties: `server.port=8081`

### Maven build fails
- Delete `.m2` folder: `rm -rf ~/.m2`
- Run: `mvn clean install` again

### Frontend can't reach backend
- Check `NEXT_PUBLIC_API_URL` in .env.local
- Ensure backend is running on port 8080
- Check CORS is enabled in AlumniManagementApplication.java

---

## Next Steps

- Deploy to production (AWS, Heroku, etc.)
- Add authentication with Spring Security
- Implement data validation
- Add more complex queries
- Scale database for production

**You now have a fully functional Spring Boot backend!**
