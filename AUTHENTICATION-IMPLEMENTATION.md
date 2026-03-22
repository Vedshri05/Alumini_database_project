# Complete Authentication Implementation Guide

## Step 1: Add Dependencies to pom.xml

Add these dependencies to your existing pom.xml in the `<dependencies>` section:

```xml
<!-- JWT (JSON Web Token) -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.11.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>

<!-- Spring Security (for password hashing) -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

<!-- Validation -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

---

## Step 2: Update application.properties

Add these JWT configuration properties:

```properties
# JWT Configuration
jwt.secret=your-secret-key-make-it-long-and-secure-at-least-32-characters-long
jwt.expiration=86400000
jwt.refresh-expiration=604800000
```

---

## Step 3: Create User Entity

Create file: `src/main/java/com/alumni/model/User.java`

```java
package com.alumni.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(name = "users", uniqueConstraints = {
    @UniqueConstraint(columnNames = "email")
})
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Column(nullable = false)
    private String name;
    
    @NotBlank
    @Email
    @Column(nullable = false, unique = true)
    private String email;
    
    @NotBlank
    @Column(nullable = false)
    private String password;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @Column(name = "last_login")
    private LocalDateTime lastLogin;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // Constructors
    public User() {}
    
    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    public LocalDateTime getLastLogin() {
        return lastLogin;
    }
    
    public void setLastLogin(LocalDateTime lastLogin) {
        this.lastLogin = lastLogin;
    }
}
```

---

## Step 4: Create UserRepository

Create file: `src/main/java/com/alumni/repository/UserRepository.java`

```java
package com.alumni.repository;

import com.alumni.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    boolean existsByEmail(String email);
    
    Optional<User> findById(Long id);
}
```

---

## Step 5: Create JWT Token Provider

Create file: `src/main/java/com/alumni/security/JwtTokenProvider.java`

```java
package com.alumni.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {
    
    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);
    
    @Value("${jwt.secret}")
    private String jwtSecret;
    
    @Value("${jwt.expiration}")
    private long jwtExpirationMs;
    
    public String generateToken(String email) {
        return createToken(email, jwtExpirationMs);
    }
    
    public String generateRefreshToken(String email) {
        return createToken(email, jwtExpirationMs * 7); // 7 days
    }
    
    private String createToken(String email, long expirationTime) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationTime);
        
        Key key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }
    
    public String getEmailFromToken(String token) {
        Key key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
    
    public boolean validateToken(String token) {
        try {
            Key key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (SecurityException e) {
            logger.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("Expired JWT token: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("Unsupported JWT token: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }
}
```

---

## Step 6: Create AuthService

Create file: `src/main/java/com/alumni/service/AuthService.java`

```java
package com.alumni.service;

import com.alumni.model.User;
import com.alumni.repository.UserRepository;
import com.alumni.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    
    public User signup(String name, String email, String password) throws Exception {
        // Check if email already exists
        if (userRepository.existsByEmail(email)) {
            throw new Exception("Email already registered");
        }
        
        // Create new user
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password)); // Hash password
        user.setCreatedAt(LocalDateTime.now());
        
        // Save user to database
        return userRepository.save(user);
    }
    
    public User login(String email, String password) throws Exception {
        // Find user by email
        Optional<User> userOptional = userRepository.findByEmail(email);
        
        if (!userOptional.isPresent()) {
            throw new Exception("User not found");
        }
        
        User user = userOptional.get();
        
        // Compare password (bcrypt handles comparison)
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new Exception("Invalid password");
        }
        
        // Update last login time
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);
        
        return user;
    }
    
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    
    public boolean userExists(String email) {
        return userRepository.existsByEmail(email);
    }
}
```

---

## Step 7: Create DTOs (Data Transfer Objects)

Create file: `src/main/java/com/alumni/dto/SignupRequest.java`

```java
package com.alumni.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class SignupRequest {
    
    @NotBlank(message = "Name is required")
    private String name;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;
    
    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;
    
    // Constructors
    public SignupRequest() {}
    
    public SignupRequest(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
    
    // Getters and Setters
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
}
```

Create file: `src/main/java/com/alumni/dto/LoginRequest.java`

```java
package com.alumni.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class LoginRequest {
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;
    
    @NotBlank(message = "Password is required")
    private String password;
    
    // Constructors
    public LoginRequest() {}
    
    public LoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }
    
    // Getters and Setters
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
}
```

Create file: `src/main/java/com/alumni/dto/UserDTO.java`

```java
package com.alumni.dto;

import java.time.LocalDateTime;

public class UserDTO {
    
    private Long id;
    private String name;
    private String email;
    private LocalDateTime createdAt;
    private LocalDateTime lastLogin;
    
    // Constructors
    public UserDTO() {}
    
    public UserDTO(Long id, String name, String email, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getLastLogin() {
        return lastLogin;
    }
    
    public void setLastLogin(LocalDateTime lastLogin) {
        this.lastLogin = lastLogin;
    }
}
```

Create file: `src/main/java/com/alumni/dto/AuthResponse.java`

```java
package com.alumni.dto;

public class AuthResponse {
    
    private boolean success;
    private String message;
    private String token;
    private String refreshToken;
    private UserDTO user;
    
    // Constructors
    public AuthResponse() {}
    
    public AuthResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }
    
    // Getters and Setters
    public boolean isSuccess() {
        return success;
    }
    
    public void setSuccess(boolean success) {
        this.success = success;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public String getRefreshToken() {
        return refreshToken;
    }
    
    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
    
    public UserDTO getUser() {
        return user;
    }
    
    public void setUser(UserDTO user) {
        this.user = user;
    }
}
```

---

## Step 8: Create AuthController

Create file: `src/main/java/com/alumni/controller/AuthController.java`

```java
package com.alumni.controller;

import com.alumni.dto.AuthResponse;
import com.alumni.dto.LoginRequest;
import com.alumni.dto.SignupRequest;
import com.alumni.dto.UserDTO;
import com.alumni.model.User;
import com.alumni.security.JwtTokenProvider;
import com.alumni.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest signupRequest) {
        try {
            // Check if email already exists
            if (authService.userExists(signupRequest.getEmail())) {
                AuthResponse response = new AuthResponse(false, "Email already registered");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
            
            // Create new user
            User user = authService.signup(
                signupRequest.getName(),
                signupRequest.getEmail(),
                signupRequest.getPassword()
            );
            
            // Generate JWT token
            String token = jwtTokenProvider.generateToken(user.getEmail());
            String refreshToken = jwtTokenProvider.generateRefreshToken(user.getEmail());
            
            // Create response
            UserDTO userDTO = new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getCreatedAt());
            AuthResponse response = new AuthResponse(true, "User registered successfully");
            response.setToken(token);
            response.setRefreshToken(refreshToken);
            response.setUser(userDTO);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
            
        } catch (Exception e) {
            AuthResponse response = new AuthResponse(false, e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            // Authenticate user
            User user = authService.login(loginRequest.getEmail(), loginRequest.getPassword());
            
            // Generate JWT token
            String token = jwtTokenProvider.generateToken(user.getEmail());
            String refreshToken = jwtTokenProvider.generateRefreshToken(user.getEmail());
            
            // Create response
            UserDTO userDTO = new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getCreatedAt());
            userDTO.setLastLogin(user.getLastLogin());
            
            AuthResponse response = new AuthResponse(true, "Login successful");
            response.setToken(token);
            response.setRefreshToken(refreshToken);
            response.setUser(userDTO);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            AuthResponse response = new AuthResponse(false, e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
    
    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse(false, "No token provided"));
            }
            
            String token = authHeader.substring(7);
            boolean isValid = jwtTokenProvider.validateToken(token);
            
            if (isValid) {
                String email = jwtTokenProvider.getEmailFromToken(token);
                return ResponseEntity.ok(new AuthResponse(true, "Token is valid. Email: " + email));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse(false, "Invalid token"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new AuthResponse(false, "Token validation failed"));
        }
    }
}
```

---

## Step 9: Add PasswordEncoder Bean to Main Application

Update `AlumniManagementApplication.java`:

```java
package com.alumni;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class AlumniManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(AlumniManagementApplication.class, args);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

---

## Step 10: Update Database with SQL Migration

Run this SQL to create the users table:

```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    last_login TIMESTAMP
);

-- Create index for faster email lookups
CREATE INDEX idx_users_email ON users(email);
```

---

## How It All Works Together

1. **User Signs Up**: `POST /api/auth/signup` with name, email, password
2. **Backend hashes password** with BCrypt (not stored as plain text)
3. **Backend stores in PostgreSQL** `users` table
4. **Backend generates JWT token** valid for 24 hours
5. **Frontend receives token** and stores in localStorage
6. **User logs in later**: `POST /api/auth/login` with email, password
7. **Frontend sends token** with every API request in Authorization header
8. **Backend validates token** - if valid, processes request; if expired, ask for refresh
9. **Data persists** because it's in PostgreSQL - user stays logged in after refresh!

---

## Testing with cURL or Postman

**Signup:**
```bash
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

**Validate Token:**
```bash
curl -X GET http://localhost:8080/api/auth/validate \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

---

## File Summary

- User.java - Database entity for users
- UserRepository.java - Database queries for users
- AuthService.java - Business logic for signup/login
- JwtTokenProvider.java - JWT token generation and validation
- AuthController.java - REST endpoints for auth
- SignupRequest.java - Validation for signup
- LoginRequest.java - Validation for login
- UserDTO.java - User data without password
- AuthResponse.java - Standard response format

All files together provide secure authentication with password hashing and JWT tokens!
