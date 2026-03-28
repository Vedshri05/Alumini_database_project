package com.engineering.alumni.service;

import com.engineering.alumni.dto.LoginRequest;
import com.engineering.alumni.dto.LoginResponse;
import com.engineering.alumni.dto.RegisterRequest;
import com.engineering.alumni.dto.SocialLoginRequest;
import com.engineering.alumni.entity.User;
import com.engineering.alumni.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {

    private final Key jwtKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final long JWT_EXPIRY_MS = 24 * 60 * 60 * 1000L;
    private final UserRepository userRepository;

    private static final Map<String, String[]> ADMIN_USERS = new HashMap<>();
    static {
        ADMIN_USERS.put("admin@alumni.com", new String[]{"admin123", "Admin User"});
    }

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /** Admin or Student/Alumni email+password login */
    public LoginResponse login(LoginRequest request) {
        String email = request.getEmail().trim().toLowerCase();
        String role  = request.getRole() != null ? request.getRole().trim().toUpperCase() : "";

        // Admin
        if ("ADMIN".equals(role)) {
            String[] creds = ADMIN_USERS.get(email);
            if (creds == null || !creds[0].equals(request.getPassword()))
                throw new RuntimeException("Invalid admin credentials");
            return buildResponse(email, "ADMIN", creds[1]);
        }

        // Student / Alumni — look up in DB
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty())
            throw new RuntimeException("Email not found. Please sign up first.");

        User user = userOpt.get();

        // If user has a password set, validate it
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            if (request.getPassword() == null || !request.getPassword().equals(user.getPassword()))
                throw new RuntimeException("Invalid password.");
        }

        // Role check
        if (!role.isEmpty() && !role.equals(user.getRole()))
            throw new RuntimeException("You are registered as " + user.getRole() + ". Please select the correct role.");

        return buildResponse(user.getEmail(), user.getRole(), user.getName());
    }

    /** Social login — validates email against DB */
    public LoginResponse socialLogin(SocialLoginRequest request) {
        String email = request.getEmail().trim().toLowerCase();
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            return buildResponse(user.getEmail(), user.getRole(), user.getName());
        }
        throw new SignupRequiredException("Email not registered. Please complete signup.");
    }

    /** Register new user — saves to DB with password */
    public LoginResponse register(RegisterRequest request) {
        String email = request.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmail(email)) {
            User existing = userRepository.findByEmail(email).get();
            return buildResponse(existing.getEmail(), existing.getRole(), existing.getName());
        }

        User user = new User();
        user.setName(request.getName().trim());
        user.setEmail(email);
        user.setPassword(request.getPassword()); // plain text for demo; use BCrypt in production
        user.setRole(request.getRole().trim().toUpperCase());
        user.setBranch(request.getBranch());
        user.setGraduationYear(request.getGraduationYear());
        user.setPhone(request.getPhone());
        user.setProvider(request.getProvider() != null ? request.getProvider() : "direct");

        userRepository.save(user);
        return buildResponse(user.getEmail(), user.getRole(), user.getName());
    }

    private LoginResponse buildResponse(String email, String role, String name) {
        String token = Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .claim("name", name)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + JWT_EXPIRY_MS))
                .signWith(jwtKey)
                .compact();
        return new LoginResponse(token, role, email, name);
    }

    public static class SignupRequiredException extends RuntimeException {
        public SignupRequiredException(String message) { super(message); }
    }
}