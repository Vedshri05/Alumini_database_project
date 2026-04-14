package com.alumni.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * CORS Configuration for Spring Boot Application
 * Allows frontend (localhost:3000) to make requests to backend (localhost:8080)
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
            .addMapping("/api/**")  // Apply CORS to all /api endpoints
            .allowedOrigins(
                "http://localhost:3000",      // Development frontend
                "http://127.0.0.1:3000",      // Alternative localhost
                "http://localhost:8080",      // Backend itself (if needed)
                "http://localhost:5173"       // Vite dev server (if used)
            )
            .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
            .allowedHeaders("*")              // Allow all headers
            .allowCredentials(true)           // Allow cookies/credentials
            .maxAge(3600);                    // Cache CORS policy for 1 hour
    }
}
