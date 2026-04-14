package com.engineering.alumni.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.util.Set;

@Entity
@Table(name = "alumini")
public class Alumni {
    public Alumni() {}

    public Alumni(String sId, String sName, String email, String phoneNo, Integer graduationYear, EngineeringBranch branch, String linkedinProfile, String gender) {
        this.sId = sId;
        this.sName = sName;
        this.email = email;
        this.phoneNo = phoneNo;
        this.graduationYear = graduationYear;
        this.branch = branch;
        this.linkedinProfile = linkedinProfile;
        this.gender = gender;
    }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private String sId;
        private String sName;
        private String email;
        private String phoneNo;
        private Integer graduationYear;
        private EngineeringBranch branch;
        private String linkedinProfile;
        private String gender;

        public Builder sId(String sId) { this.sId = sId; return this; }
        public Builder sName(String sName) { this.sName = sName; return this; }
        public Builder email(String email) { this.email = email; return this; }
        public Builder phoneNo(String phoneNo) { this.phoneNo = phoneNo; return this; }
        public Builder graduationYear(Integer graduationYear) { this.graduationYear = graduationYear; return this; }
        public Builder branch(EngineeringBranch branch) { this.branch = branch; return this; }
        public Builder linkedinProfile(String linkedinProfile) { this.linkedinProfile = linkedinProfile; return this; }
        public Builder gender(String gender) { this.gender = gender; return this; }
        public Alumni build() {
            return new Alumni(sId, sName, email, phoneNo, graduationYear, branch, linkedinProfile, gender);
        }
    }

    // Getters and setters
    public String getSId() { return sId; }
    public void setSId(String sId) { this.sId = sId; }
    public String getSName() { return sName; }
    public void setSName(String sName) { this.sName = sName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhoneNo() { return phoneNo; }
    public void setPhoneNo(String phoneNo) { this.phoneNo = phoneNo; }
    public Integer getGraduationYear() { return graduationYear; }
    public void setGraduationYear(Integer graduationYear) { this.graduationYear = graduationYear; }
    public EngineeringBranch getBranch() { return branch; }
    public void setBranch(EngineeringBranch branch) { this.branch = branch; }
    public String getLinkedinProfile() { return linkedinProfile; }
    public void setLinkedinProfile(String linkedinProfile) { this.linkedinProfile = linkedinProfile; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    public Set<Employment> getEmployments() { return employments; }
    public void setEmployments(Set<Employment> employments) { this.employments = employments; }
    public Set<HigherStudies> getHigherStudies() { return higherStudies; }
    public void setHigherStudies(Set<HigherStudies> higherStudies) { this.higherStudies = higherStudies; }
    
    @Id
    @Column(name = "s_id")
    private String sId;

    @NotBlank(message = "Name is required")
    @Column(name = "s_name", nullable = false)
    private String sName;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    @Column(nullable = false)
    private String email;

    @Column(name = "phone_no")
    private String phoneNo;

    @Column(name = "graduation_year", nullable = false)
    private Integer graduationYear;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EngineeringBranch branch;

    @Column(name = "linkedin_profile")
    private String linkedinProfile;

    @Column
    private String gender;

    @OneToMany(mappedBy = "alumni", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Employment> employments;

    @OneToMany(mappedBy = "alumni", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<HigherStudies> higherStudies;
}
