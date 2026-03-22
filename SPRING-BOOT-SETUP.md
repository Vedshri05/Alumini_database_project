# Spring Boot Backend Setup Guide

## Overview
This guide explains how to set up a Spring Boot backend that works with the Next.js frontend for the Engineering Alumni Management System.

## Prerequisites
- Java 17+ (JDK)
- Spring Boot 3.x
- Maven or Gradle
- PostgreSQL (recommended) or MySQL
- Git

## Project Structure

```
engineering-alumni-backend/
├── src/
│   ├── main/
│   │   ├── java/com/alumni/
│   │   │   ├── controller/
│   │   │   │   ├── AlumniController.java
│   │   │   │   ├── EventController.java
│   │   │   │   └── AttendanceController.java
│   │   │   ├── service/
│   │   │   │   ├── AlumniService.java
│   │   │   │   ├── EventService.java
│   │   │   │   └── AttendanceService.java
│   │   │   ├── repository/
│   │   │   │   ├── AlumniRepository.java
│   │   │   │   ├── EventRepository.java
│   │   │   │   └── RegistrationRepository.java
│   │   │   ├── entity/
│   │   │   │   ├── Alumni.java
│   │   │   │   ├── Event.java
│   │   │   │   └── EventRegistration.java
│   │   │   ├── dto/
│   │   │   │   ├── AlumniDTO.java
│   │   │   │   └── EventDTO.java
│   │   │   ├── exception/
│   │   │   │   └── GlobalExceptionHandler.java
│   │   │   └── AlumniApplicationApplication.java
│   │   └── resources/
│   │       ├── application.yml
│   │       └── application-dev.yml
│   └── test/
├── pom.xml
└── README.md
```

## Step 1: Create Spring Boot Project

```bash
# Using Spring Boot CLI
spring boot new alumni-backend --type maven --language java

# Or use Spring Initializr (https://start.spring.io/)
# Dependencies needed:
# - Spring Web
# - Spring Data JPA
# - PostgreSQL Driver (or MySQL)
# - Lombok
# - Validation
# - Spring Doc OpenAPI (for Swagger/API documentation)
```

## Step 2: Configure Dependencies (pom.xml)

```xml
<project>
  <modelVersion>4.0.0</modelVersion>
  <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.0</version>
  </parent>

  <groupId>com.alumni</groupId>
  <artifactId>alumni-backend</artifactId>
  <version>1.0.0</version>

  <dependencies>
    <!-- Spring Boot Web -->
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <!-- Spring Data JPA -->
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>

    <!-- Database -->
    <dependency>
      <groupId>org.postgresql</groupId>
      <artifactId>postgresql</artifactId>
      <version>42.7.0</version>
      <scope>runtime</scope>
    </dependency>

    <!-- Lombok -->
    <dependency>
      <groupId>org.projectlombok</groupId>
      <artifactId>lombok</artifactId>
      <optional>true</optional>
    </dependency>

    <!-- Validation -->
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>

    <!-- OpenAPI (Swagger) -->
    <dependency>
      <groupId>org.springdoc</groupId>
      <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
      <version>2.0.2</version>
    </dependency>

    <!-- Testing -->
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-test</artifactId>
      <scope>test</scope>
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
      </plugin>
    </plugins>
  </build>
</project>
```

## Step 3: Configure Application Properties

**application.yml**
```yaml
spring:
  application:
    name: alumni-backend

  datasource:
    url: jdbc:postgresql://localhost:5432/alumni_db
    username: alumni_user
    password: secure_password
    driver-class-name: org.postgresql.Driver

  jpa:
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
        format_sql: true
    show-sql: false

  jackson:
    serialization:
      write-dates-as-timestamps: false

server:
  port: 8080
  servlet:
    context-path: /api

logging:
  level:
    root: INFO
    com.alumni: DEBUG

springdoc:
  api-docs:
    path: /docs
  swagger-ui:
    path: /swagger-ui.html
```

## Step 4: Create Database Schema

```sql
-- Alumni Table
CREATE TABLE alumni (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    graduation_year INTEGER,
    branch VARCHAR(50) NOT NULL CHECK (branch IN ('CS', 'IT', 'ENTC', 'ECE', 'AIDS')),
    current_position VARCHAR(255),
    company VARCHAR(255),
    location VARCHAR(255),
    linkedin_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events Table
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_type VARCHAR(50) NOT NULL,
    date TIMESTAMP NOT NULL,
    location VARCHAR(255),
    capacity INTEGER,
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Event Registrations Table
CREATE TABLE event_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    alumni_id UUID NOT NULL REFERENCES alumni(id) ON DELETE CASCADE,
    rsvp_status VARCHAR(50) DEFAULT 'registered',
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(event_id, alumni_id)
);

-- Attendance Table
CREATE TABLE attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    alumni_id UUID NOT NULL REFERENCES alumni(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL,
    check_in_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(event_id, alumni_id)
);

-- Indices
CREATE INDEX idx_alumni_branch ON alumni(branch);
CREATE INDEX idx_alumni_email ON alumni(email);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_registrations_event ON event_registrations(event_id);
CREATE INDEX idx_registrations_alumni ON event_registrations(alumni_id);
CREATE INDEX idx_attendance_event ON attendance(event_id);
```

## Step 5: Create Entity Classes

**Alumni.java**
```java
@Entity
@Table(name = "alumni")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Alumni {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank
    private String name;

    @NotBlank
    @Email
    @Column(unique = true)
    private String email;

    private String phone;
    private Integer graduationYear;

    @NotBlank
    @Pattern(regexp = "^(CS|IT|ENTC|ECE|AIDS)$")
    private String branch;

    private String currentPosition;
    private String company;
    private String location;
    private String linkedinUrl;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
```

**Event.java**
```java
@Entity
@Table(name = "events")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank
    private String title;

    private String description;

    @NotBlank
    private String eventType;

    @NotNull
    private LocalDateTime date;

    private String location;
    private Integer capacity;
    private String status;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
```

## Step 6: Create Repository Interfaces

**AlumniRepository.java**
```java
@Repository
public interface AlumniRepository extends JpaRepository<Alumni, UUID> {
    List<Alumni> findByBranch(String branch);
    Optional<Alumni> findByEmail(String email);
    List<Alumni> findByGraduationYear(Integer year);
    Page<Alumni> findAll(Pageable pageable);
}
```

**EventRepository.java**
```java
@Repository
public interface EventRepository extends JpaRepository<Event, UUID> {
    List<Event> findByStatus(String status);
    List<Event> findByDateAfter(LocalDateTime date);
    Page<Event> findAll(Pageable pageable);
}
```

## Step 7: Create Service Classes

**AlumniService.java**
```java
@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class AlumniService {
    private final AlumniRepository alumniRepository;

    public List<Alumni> getAllAlumni() {
        return alumniRepository.findAll();
    }

    public Alumni getAlumniById(UUID id) {
        return alumniRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Alumni not found"));
    }

    public Alumni createAlumni(Alumni alumni) {
        return alumniRepository.save(alumni);
    }

    public Alumni updateAlumni(UUID id, Alumni alumniDetails) {
        Alumni alumni = getAlumniById(id);
        // Update fields
        return alumniRepository.save(alumni);
    }

    public void deleteAlumni(UUID id) {
        alumniRepository.deleteById(id);
    }

    public List<Alumni> getAlumniByBranch(String branch) {
        return alumniRepository.findByBranch(branch);
    }
}
```

## Step 8: Create Controller Classes

**AlumniController.java**
```java
@RestController
@RequestMapping("/alumni")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AlumniController {
    private final AlumniService alumniService;

    @GetMapping
    public ResponseEntity<List<Alumni>> getAllAlumni(
        @RequestParam(required = false) String branch) {
        if (branch != null) {
            return ResponseEntity.ok(alumniService.getAlumniByBranch(branch));
        }
        return ResponseEntity.ok(alumniService.getAllAlumni());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Alumni> getAlumniById(@PathVariable UUID id) {
        return ResponseEntity.ok(alumniService.getAlumniById(id));
    }

    @PostMapping
    public ResponseEntity<Alumni> createAlumni(@Valid @RequestBody Alumni alumni) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(alumniService.createAlumni(alumni));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Alumni> updateAlumni(
        @PathVariable UUID id,
        @Valid @RequestBody Alumni alumniDetails) {
        return ResponseEntity.ok(alumniService.updateAlumni(id, alumniDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAlumni(@PathVariable UUID id) {
        alumniService.deleteAlumni(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String, Object>> uploadCSV(
        @RequestParam("file") MultipartFile file) {
        // CSV parsing logic
        return ResponseEntity.ok(Map.of("success", true, "message", "File uploaded"));
    }
}
```

## Step 9: CORS Configuration

**CorsConfig.java**
```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:3000", "http://localhost:3001")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true)
                    .maxAge(3600);
            }
        };
    }
}
```

## Step 10: Running the Application

```bash
# Build
mvn clean package

# Run
mvn spring-boot:run

# Or run the JAR
java -jar target/alumni-backend-1.0.0.jar
```

The backend will be available at: `http://localhost:8080/api`
Swagger documentation: `http://localhost:8080/api/swagger-ui.html`

## Step 11: Update Next.js Environment

Create `.env.local` in your Next.js project:
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/alumni` | Get all alumni |
| POST | `/api/alumni` | Create alumni |
| GET | `/api/alumni/{id}` | Get alumni by ID |
| PUT | `/api/alumni/{id}` | Update alumni |
| DELETE | `/api/alumni/{id}` | Delete alumni |
| POST | `/api/alumni/upload` | Upload CSV file |
| GET | `/api/events` | Get all events |
| POST | `/api/events` | Create event |
| POST | `/api/events/{id}/register` | Register for event |
| POST | `/api/events/{id}/attendance` | Mark attendance |
| GET | `/api/statistics` | Get dashboard stats |

## Testing with Postman or curl

```bash
# Get all alumni
curl http://localhost:8080/api/alumni

# Create alumni
curl -X POST http://localhost:8080/api/alumni \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "branch": "CS",
    "graduationYear": 2020
  }'

# Get alumni by branch
curl http://localhost:8080/api/alumni?branch=CS
```

## Next Steps
1. Set up PostgreSQL database
2. Clone/create Spring Boot project
3. Configure application.yml with your database
4. Implement the entity, repository, service, and controller classes
5. Test endpoints with Postman
6. Connect Next.js frontend to the backend by setting NEXT_PUBLIC_API_URL
