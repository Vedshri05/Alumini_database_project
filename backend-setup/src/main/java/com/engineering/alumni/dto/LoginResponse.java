package com.engineering.alumni.dto;

public class LoginResponse {
    private String token;
    private String role;
    private String email;
    private String name;

    public LoginResponse(String token, String role, String email, String name) {
        this.token = token;
        this.role = role;
        this.email = email;
        this.name = name;
    }

    public String getToken() { return token; }
    public String getRole() { return role; }
    public String getEmail() { return email; }
    public String getName() { return name; }
}
