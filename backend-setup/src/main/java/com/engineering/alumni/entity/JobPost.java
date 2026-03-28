package com.engineering.alumni.entity;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "job_posts")
public class JobPost {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @Column(nullable = false) private String alumniEmail;
    @Column(nullable = false) private String alumniName;
    @Column(nullable = false) private String title;
    @Column(nullable = false) private String company;
    @Column(columnDefinition = "TEXT") private String description;
    @Column private String location;
    @Column private String skills;
    @Column private String type;
    @ElementCollection @CollectionTable(name = "job_applicants", joinColumns = @JoinColumn(name = "job_id"))
    @Column(name = "applicant_email")
    private List<String> applicants = new ArrayList<>();
    @Column(nullable = false, updatable = false) private LocalDateTime createdAt;
    @PrePersist protected void onCreate() { createdAt = LocalDateTime.now(); }
    public String getId() { return id; }
    public String getAlumniEmail() { return alumniEmail; }
    public void setAlumniEmail(String v) { alumniEmail = v; }
    public String getAlumniName() { return alumniName; }
    public void setAlumniName(String v) { alumniName = v; }
    public String getTitle() { return title; }
    public void setTitle(String v) { title = v; }
    public String getCompany() { return company; }
    public void setCompany(String v) { company = v; }
    public String getDescription() { return description; }
    public void setDescription(String v) { description = v; }
    public String getLocation() { return location; }
    public void setLocation(String v) { location = v; }
    public String getSkills() { return skills; }
    public void setSkills(String v) { skills = v; }
    public String getType() { return type; }
    public void setType(String v) { type = v; }
    public List<String> getApplicants() { return applicants; }
    public void setApplicants(List<String> v) { applicants = v; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}