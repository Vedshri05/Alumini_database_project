package com.engineering.alumni.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
// Lombok removed; manual code below

import java.time.LocalDateTime;

@Entity
@Table(name = "alumni")
// Manual code below
public class Alumni {
    public Alumni() {}

    public Alumni(String id, String name, String email, String phone, Integer graduationYear, EngineeringBranch branch, String currentPosition, String company, String location, String linkedinUrl, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.graduationYear = graduationYear;
        this.branch = branch;
        this.currentPosition = currentPosition;
        this.company = company;
        this.location = location;
        this.linkedinUrl = linkedinUrl;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private String id;
        private String name;
        private String email;
        private String phone;
        private Integer graduationYear;
        private EngineeringBranch branch;
        private String currentPosition;
        private String company;
        private String location;
        private String linkedinUrl;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public Builder id(String id) { this.id = id; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder email(String email) { this.email = email; return this; }
        public Builder phone(String phone) { this.phone = phone; return this; }
        public Builder graduationYear(Integer graduationYear) { this.graduationYear = graduationYear; return this; }
        public Builder branch(EngineeringBranch branch) { this.branch = branch; return this; }
        public Builder currentPosition(String currentPosition) { this.currentPosition = currentPosition; return this; }
        public Builder company(String company) { this.company = company; return this; }
        public Builder location(String location) { this.location = location; return this; }
        public Builder linkedinUrl(String linkedinUrl) { this.linkedinUrl = linkedinUrl; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public Builder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }
        public Alumni build() {
            return new Alumni(id, name, email, phone, graduationYear, branch, currentPosition, company, location, linkedinUrl, createdAt, updatedAt);
        }
    }

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public Integer getGraduationYear() { return graduationYear; }
    public void setGraduationYear(Integer graduationYear) { this.graduationYear = graduationYear; }
    public EngineeringBranch getBranch() { return branch; }
    public void setBranch(EngineeringBranch branch) { this.branch = branch; }
    public String getCurrentPosition() { return currentPosition; }
    public void setCurrentPosition(String currentPosition) { this.currentPosition = currentPosition; }
    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getLinkedinUrl() { return linkedinUrl; }
    public void setLinkedinUrl(String linkedinUrl) { this.linkedinUrl = linkedinUrl; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotBlank(message = "Name is required")
    @Column(nullable = false)
    private String name;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    @Column(nullable = false, unique = true)
    private String email;

    @Column
    private String phone;

    @Column(nullable = false)
    private Integer graduationYear;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EngineeringBranch branch;

    @Column
    private String currentPosition;

    @Column
    private String company;

    @Column
    private String location;

    @Column
    private String linkedinUrl;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public enum EngineeringBranch {
        CS("Computer Science"),
        IT("Information Technology"),
        ENTC("Electronics & Telecommunication"),
        ECE("Electronics & Communication Engineering"),
        AIDS("Artificial Intelligence & Data Science");

        private final String fullName;

        EngineeringBranch(String fullName) {
            this.fullName = fullName;
        }

        public String getFullName() {
            return fullName;
        }
    }
}
