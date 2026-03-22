# Spring Boot Code Examples - Copy & Paste Ready

## 1. Alumni Entity

```java
package com.alumni.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "alumni")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Alumni {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank(message = "Name is required")
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @Column(unique = true, nullable = false)
    private String email;

    private String phone;

    @Min(value = 1950, message = "Graduation year must be after 1950")
    @Max(value = 2100, message = "Graduation year must be realistic")
    private Integer graduationYear;

    @NotBlank(message = "Branch is required")
    @Pattern(regexp = "^(CS|IT|ENTC|ECE|AIDS)$", message = "Invalid branch")
    @Column(nullable = false)
    private String branch;

    private String currentPosition;
    private String company;
    private String location;
    private String linkedinUrl;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
```

## 2. Alumni Repository

```java
package com.alumni.repository;

import com.alumni.entity.Alumni;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AlumniRepository extends JpaRepository<Alumni, UUID> {
    List<Alumni> findByBranch(String branch);
    
    List<Alumni> findByGraduationYear(Integer year);
    
    Optional<Alumni> findByEmail(String email);
    
    List<Alumni> findByCompany(String company);
    
    Page<Alumni> findAll(Pageable pageable);
    
    Page<Alumni> findByBranch(String branch, Pageable pageable);
    
    List<Alumni> findByBranchAndGraduationYear(String branch, Integer year);
    
    long countByBranch(String branch);
}
```

## 3. Alumni Service

```java
package com.alumni.service;

import com.alumni.entity.Alumni;
import com.alumni.repository.AlumniRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class AlumniService {
    private final AlumniRepository alumniRepository;

    public List<Alumni> getAllAlumni() {
        log.info("Fetching all alumni");
        return alumniRepository.findAll();
    }

    public Page<Alumni> getAllAlumniPaginated(Pageable pageable) {
        log.info("Fetching alumni with pagination: {}", pageable);
        return alumniRepository.findAll(pageable);
    }

    public Alumni getAlumniById(UUID id) {
        log.info("Fetching alumni with id: {}", id);
        return alumniRepository.findById(id)
            .orElseThrow(() -> {
                log.error("Alumni not found with id: {}", id);
                return new RuntimeException("Alumni not found with id: " + id);
            });
    }

    public Alumni createAlumni(Alumni alumni) {
        log.info("Creating new alumni: {}", alumni.getEmail());
        
        // Check if email already exists
        if (alumniRepository.findByEmail(alumni.getEmail()).isPresent()) {
            throw new RuntimeException("Alumni with email already exists: " + alumni.getEmail());
        }
        
        return alumniRepository.save(alumni);
    }

    public Alumni updateAlumni(UUID id, Alumni alumniDetails) {
        log.info("Updating alumni with id: {}", id);
        
        Alumni alumni = getAlumniById(id);
        
        if (alumniDetails.getName() != null) alumni.setName(alumniDetails.getName());
        if (alumniDetails.getPhone() != null) alumni.setPhone(alumniDetails.getPhone());
        if (alumniDetails.getGraduationYear() != null) alumni.setGraduationYear(alumniDetails.getGraduationYear());
        if (alumniDetails.getBranch() != null) alumni.setBranch(alumniDetails.getBranch());
        if (alumniDetails.getCurrentPosition() != null) alumni.setCurrentPosition(alumniDetails.getCurrentPosition());
        if (alumniDetails.getCompany() != null) alumni.setCompany(alumniDetails.getCompany());
        if (alumniDetails.getLocation() != null) alumni.setLocation(alumniDetails.getLocation());
        if (alumniDetails.getLinkedinUrl() != null) alumni.setLinkedinUrl(alumniDetails.getLinkedinUrl());
        
        return alumniRepository.save(alumni);
    }

    public void deleteAlumni(UUID id) {
        log.info("Deleting alumni with id: {}", id);
        getAlumniById(id); // Verify exists
        alumniRepository.deleteById(id);
    }

    public List<Alumni> getAlumniByBranch(String branch) {
        log.info("Fetching alumni by branch: {}", branch);
        validateBranch(branch);
        return alumniRepository.findByBranch(branch);
    }

    public List<Alumni> getAlumniByGraduationYear(Integer year) {
        log.info("Fetching alumni by graduation year: {}", year);
        return alumniRepository.findByGraduationYear(year);
    }

    public long countByBranch(String branch) {
        validateBranch(branch);
        return alumniRepository.countByBranch(branch);
    }

    private void validateBranch(String branch) {
        String[] validBranches = {"CS", "IT", "ENTC", "ECE", "AIDS"};
        for (String valid : validBranches) {
            if (valid.equals(branch)) return;
        }
        throw new RuntimeException("Invalid branch: " + branch);
    }
}
```

## 4. Alumni Controller

```java
package com.alumni.controller;

import com.alumni.entity.Alumni;
import com.alumni.service.AlumniService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/alumni")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@Slf4j
public class AlumniController {
    private final AlumniService alumniService;

    @GetMapping
    public ResponseEntity<?> getAllAlumni(
        @RequestParam(required = false) String branch,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size) {
        
        try {
            if (branch != null) {
                List<Alumni> alumni = alumniService.getAlumniByBranch(branch);
                return ResponseEntity.ok(alumni);
            }
            
            // If pagination params provided, use pagination
            if (page >= 0 && size > 0) {
                Page<Alumni> alumni = alumniService.getAllAlumniPaginated(
                    org.springframework.data.domain.PageRequest.of(page, size)
                );
                return ResponseEntity.ok(alumni);
            }
            
            List<Alumni> alumni = alumniService.getAllAlumni();
            return ResponseEntity.ok(alumni);
        } catch (Exception e) {
            log.error("Error fetching alumni", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAlumniById(@PathVariable UUID id) {
        try {
            Alumni alumni = alumniService.getAlumniById(id);
            return ResponseEntity.ok(alumni);
        } catch (Exception e) {
            log.error("Error fetching alumni by id", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<?> createAlumni(@Valid @RequestBody Alumni alumni) {
        try {
            Alumni created = alumniService.createAlumni(alumni);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            log.error("Error creating alumni", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAlumni(
        @PathVariable UUID id,
        @Valid @RequestBody Alumni alumniDetails) {
        
        try {
            Alumni updated = alumniService.updateAlumni(id, alumniDetails);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            log.error("Error updating alumni", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAlumni(@PathVariable UUID id) {
        try {
            alumniService.deleteAlumni(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            log.error("Error deleting alumni", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/branch/{branch}")
    public ResponseEntity<?> getAlumniByBranch(@PathVariable String branch) {
        try {
            List<Alumni> alumni = alumniService.getAlumniByBranch(branch);
            return ResponseEntity.ok(alumni);
        } catch (Exception e) {
            log.error("Error fetching alumni by branch", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/stats/by-branch")
    public ResponseEntity<?> getStatsByBranch() {
        try {
            Map<String, Long> stats = new HashMap<>();
            String[] branches = {"CS", "IT", "ENTC", "ECE", "AIDS"};
            
            for (String branch : branches) {
                stats.put(branch, alumniService.countByBranch(branch));
            }
            
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            log.error("Error fetching statistics", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", e.getMessage()));
        }
    }
}
```

## 5. Event Entity

```java
package com.alumni.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "events")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank(message = "Title is required")
    @Column(nullable = false)
    private String title;

    private String description;

    @NotBlank(message = "Event type is required")
    private String eventType; // REUNION, WORKSHOP, WEBINAR, NETWORKING

    @NotNull(message = "Date is required")
    @Future(message = "Event date must be in the future")
    private LocalDateTime date;

    private String location;

    @Positive(message = "Capacity must be positive")
    private Integer capacity;

    @Builder.Default
    private String status = "draft"; // draft, published, ongoing, completed

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
```

## 6. CORS Configuration

```java
package com.alumni.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins(
                        "http://localhost:3000",
                        "http://localhost:3001",
                        "http://localhost:4200"
                    )
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                    .allowedHeaders("*")
                    .allowCredentials(true)
                    .maxAge(3600);
            }
        };
    }
}
```

## 7. Global Exception Handler

```java
package com.alumni.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> handleRuntimeException(RuntimeException ex) {
        log.error("RuntimeException: ", ex);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body(Map.of(
                "error", ex.getMessage(),
                "timestamp", System.currentTimeMillis()
            ));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationException(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body(Map.of(
                "error", "Validation failed",
                "details", errors,
                "timestamp", System.currentTimeMillis()
            ));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGlobalException(Exception ex) {
        log.error("Unexpected exception: ", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(Map.of(
                "error", "Internal server error",
                "message", ex.getMessage(),
                "timestamp", System.currentTimeMillis()
            ));
    }
}
```

## 8. Application Configuration

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
    hikari:
      maximum-pool-size: 10
      minimum-idle: 5

  jpa:
    hibernate:
      ddl-auto: validate
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
        format_sql: true
        use_sql_comments: true
    show-sql: false
    open-in-view: false

  jackson:
    serialization:
      write-dates-as-timestamps: false
      indent-output: true
    deserialization:
      fail-on-unknown-properties: false

  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 10MB

server:
  port: 8080
  servlet:
    context-path: /api
  compression:
    enabled: true

logging:
  level:
    root: INFO
    com.alumni: DEBUG
    org.springframework.web: INFO
    org.hibernate: WARN
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss} - %logger{36} - %msg%n"

springdoc:
  api-docs:
    path: /docs
  swagger-ui:
    path: /swagger-ui.html
    operations-sorter: method
    tags-sorter: alpha
```

## 9. POM.xml Dependencies

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>

    <groupId>com.alumni</groupId>
    <artifactId>alumni-backend</artifactId>
    <version>1.0.0</version>
    <name>Alumni Management Backend</name>
    <description>Spring Boot backend for alumni management system</description>

    <properties>
        <java.version>17</java.version>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
    </properties>

    <dependencies>
        <!-- Spring Boot Starters -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
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

        <!-- OpenAPI/Swagger -->
        <dependency>
            <groupId>org.springdoc</groupId>
            <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
            <version>2.1.0</version>
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
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

## Quick Copy-Paste Commands

```bash
# Start development
mvn spring-boot:run

# Build JAR
mvn clean package

# Run built JAR
java -jar target/alumni-backend-1.0.0.jar

# Create new Spring Boot project
mvn archetype:generate -DgroupId=com.alumni -DartifactId=alumni-backend -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false

# Format code
mvn spotless:apply

# Check for dependency vulnerabilities
mvn org.owasp:dependency-check-maven:check
```

All these classes are ready to use. Just copy-paste into your Spring Boot project with proper package structures!
