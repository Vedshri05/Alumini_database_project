# Step 1: Create Spring Boot Project Structure

## Option A: Using Spring Boot CLI (Recommended)

```bash
# Install Spring Boot CLI
brew install spring-boot  # macOS
# or download from https://spring.io/tools

# Create new Spring Boot project
spring boot new --from=https://start.spring.io \
  --build=maven \
  --javaVersion=17 \
  --packaging=jar \
  --name=alumni-management \
  --type=maven-project \
  --groupId=com.engineering \
  --artifactId=alumni-management \
  --version=1.0.0 \
  --description="Engineering Alumni Management System"

cd alumni-management
```

## Option B: Using Spring Initializr (Web Interface)

1. Go to https://start.spring.io
2. Select:
   - Project: Maven Project
   - Language: Java
   - Spring Boot: 3.2.0 or later
   - Java Version: 17
3. Project Metadata:
   - Group: com.engineering
   - Artifact: alumni-management
   - Name: Alumni Management
   - Description: Engineering Alumni Management System
   - Package name: com.engineering.alumni
4. Dependencies to add:
   - Spring Web
   - Spring Data JPA
   - PostgreSQL Driver
   - Lombok
   - Validation
5. Click "GENERATE" and download the ZIP

## Option C: Manual Setup (If needed)

Create folder structure:
```
alumni-management/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/engineering/alumni/
│   │   │       ├── AlumniManagementApplication.java
│   │   │       ├── config/
│   │   │       ├── controller/
│   │   │       ├── service/
│   │   │       ├── repository/
│   │   │       ├── entity/
│   │   │       ├── dto/
│   │   │       └── exception/
│   │   └── resources/
│   │       ├── application.properties
│   │       └── schema.sql
│   └── test/
├── pom.xml
├── README.md
└── .gitignore
```

## Project Structure Explanation

```
src/main/java/com/engineering/alumni/
├── AlumniManagementApplication.java     # Main entry point
├── config/
│   ├── CorsConfig.java                  # CORS configuration
│   └── SecurityConfig.java              # Security setup (optional)
├── controller/
│   ├── AlumniController.java            # Alumni REST endpoints
│   ├── EventController.java             # Event REST endpoints
│   └── AttendanceController.java        # Attendance endpoints
├── service/
│   ├── AlumniService.java               # Alumni business logic
│   ├── EventService.java                # Event business logic
│   ├── AttendanceService.java           # Attendance logic
│   └── CsvProcessingService.java        # CSV upload handling
├── repository/
│   ├── AlumniRepository.java            # Alumni database queries
│   ├── EventRepository.java             # Event database queries
│   └── AttendanceRepository.java        # Attendance queries
├── entity/
│   ├── Alumni.java                      # Alumni JPA entity
│   ├── Event.java                       # Event JPA entity
│   └── Attendance.java                  # Attendance JPA entity
├── dto/
│   ├── AlumniDTO.java                   # Alumni data transfer object
│   ├── EventDTO.java                    # Event DTO
│   └── ApiResponse.java                 # Standard API response
└── exception/
    └── GlobalExceptionHandler.java      # Exception handling
```

## Next Steps

1. Create the project using one of the options above
2. Copy the `pom.xml` from Step 1-Dependencies section
3. Configure `application.properties` for PostgreSQL
4. Proceed to Step 2 for database setup
