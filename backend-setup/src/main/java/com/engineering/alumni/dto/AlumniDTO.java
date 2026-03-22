package com.engineering.alumni.dto;

import com.engineering.alumni.entity.Alumni;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class AlumniDTO {
    private String id;

    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    private String email;

    private String phone;

    @NotNull(message = "Graduation year is required")
    private Integer graduationYear;

    @NotNull(message = "Branch is required")
    private Alumni.EngineeringBranch branch;

    private String currentPosition;
    private String company;
    private String location;
    private String linkedinUrl;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public AlumniDTO() {
    }

    public AlumniDTO(String id, String name, String email, String phone, Integer graduationYear,
            Alumni.EngineeringBranch branch, String currentPosition, String company,
            String location, String linkedinUrl, LocalDateTime createdAt, LocalDateTime updatedAt) {
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

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Integer getGraduationYear() {
        return graduationYear;
    }

    public void setGraduationYear(Integer graduationYear) {
        this.graduationYear = graduationYear;
    }

    public Alumni.EngineeringBranch getBranch() {
        return branch;
    }

    public void setBranch(Alumni.EngineeringBranch branch) {
        this.branch = branch;
    }

    public String getCurrentPosition() {
        return currentPosition;
    }

    public void setCurrentPosition(String currentPosition) {
        this.currentPosition = currentPosition;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getLinkedinUrl() {
        return linkedinUrl;
    }

    public void setLinkedinUrl(String linkedinUrl) {
        this.linkedinUrl = linkedinUrl;
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

    // Manual builder
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String id;
        private String name;
        private String email;
        private String phone;
        private Integer graduationYear;
        private Alumni.EngineeringBranch branch;
        private String currentPosition;
        private String company;
        private String location;
        private String linkedinUrl;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public Builder id(String id) {
            this.id = id;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder email(String email) {
            this.email = email;
            return this;
        }

        public Builder phone(String phone) {
            this.phone = phone;
            return this;
        }

        public Builder graduationYear(Integer graduationYear) {
            this.graduationYear = graduationYear;
            return this;
        }

        public Builder branch(Alumni.EngineeringBranch branch) {
            this.branch = branch;
            return this;
        }

        public Builder currentPosition(String currentPosition) {
            this.currentPosition = currentPosition;
            return this;
        }

        public Builder company(String company) {
            this.company = company;
            return this;
        }

        public Builder location(String location) {
            this.location = location;
            return this;
        }

        public Builder linkedinUrl(String linkedinUrl) {
            this.linkedinUrl = linkedinUrl;
            return this;
        }

        public Builder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public Builder updatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public AlumniDTO build() {
            return new AlumniDTO(id, name, email, phone, graduationYear, branch, currentPosition, company, location,
                    linkedinUrl, createdAt, updatedAt);
        }
    }

    // Convert DTO to Entity
    public Alumni toEntity() {
        return Alumni.builder()
                .name(this.name)
                .email(this.email)
                .phone(this.phone)
                .graduationYear(this.graduationYear)
                .branch(this.branch)
                .currentPosition(this.currentPosition)
                .company(this.company)
                .location(this.location)
                .linkedinUrl(this.linkedinUrl)
                .build();
    }

    // Convert Entity to DTO
    public static AlumniDTO fromEntity(Alumni alumni) {
        return AlumniDTO.builder()
                .id(alumni.getId())
                .name(alumni.getName())
                .email(alumni.getEmail())
                .phone(alumni.getPhone())
                .graduationYear(alumni.getGraduationYear())
                .branch(alumni.getBranch())
                .currentPosition(alumni.getCurrentPosition())
                .company(alumni.getCompany())
                .location(alumni.getLocation())
                .linkedinUrl(alumni.getLinkedinUrl())
                .createdAt(alumni.getCreatedAt())
                .updatedAt(alumni.getUpdatedAt())
                .build();
    }
}
