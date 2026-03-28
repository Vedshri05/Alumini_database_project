package com.engineering.alumni.dto;

public class SocialLoginRequest {
    private String email;
    private String provider; // "google" or "linkedin"

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }
}
