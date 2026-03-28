package com.engineering.alumni.controller;

import com.engineering.alumni.dto.ApiResponse;
import com.engineering.alumni.dto.LoginRequest;
import com.engineering.alumni.dto.LoginResponse;
import com.engineering.alumni.dto.RegisterRequest;
import com.engineering.alumni.dto.SocialLoginRequest;
import com.engineering.alumni.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /** Admin email/password login */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@RequestBody LoginRequest request) {
        try {
            LoginResponse response = authService.login(request);
            return ResponseEntity.ok(ApiResponse.success("Login successful", response));
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(ApiResponse.error(e.getMessage()));
        }
    }

    /** Social login for Student / Alumni */
    @PostMapping("/social-login")
    public ResponseEntity<?> socialLogin(@RequestBody SocialLoginRequest request) {
        try {
            LoginResponse response = authService.socialLogin(request);
            return ResponseEntity.ok(ApiResponse.success("Login successful", response));
        } catch (AuthService.SignupRequiredException e) {
            // Return structured response so frontend knows to show signup
            return ResponseEntity.status(404).body(
                Map.of(
                    "success", false,
                    "message", e.getMessage(),
                    "action", "SIGNUP_REQUIRED"
                )
            );
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).body(ApiResponse.error(e.getMessage()));
        }
    }

    /** Register new user via social signup form */
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<LoginResponse>> register(@RequestBody RegisterRequest request) {
        try {
            LoginResponse response = authService.register(request);
            return ResponseEntity.ok(ApiResponse.success("Registration successful", response));
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(ApiResponse.error(e.getMessage()));
        }
    }
}