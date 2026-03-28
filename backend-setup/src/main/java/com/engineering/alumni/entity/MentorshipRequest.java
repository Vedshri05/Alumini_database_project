package com.engineering.alumni.entity;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "mentorship_requests")
public class MentorshipRequest {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @Column(nullable = false) private String studentEmail;
    @Column(nullable = false) private String alumniEmail;
    @Column(nullable = false) private String studentName;
    @Column(nullable = false) private String alumniName;
    @Column(columnDefinition = "TEXT") private String message;
    @Enumerated(EnumType.STRING) @Column(nullable = false)
    private Status status = Status.PENDING;
    @Column private LocalDateTime scheduledAt;
    @Column(nullable = false, updatable = false) private LocalDateTime createdAt;
    @Column private LocalDateTime updatedAt;
    @PrePersist protected void onCreate() { createdAt = updatedAt = LocalDateTime.now(); }
    @PreUpdate protected void onUpdate() { updatedAt = LocalDateTime.now(); }
    public enum Status { PENDING, ACCEPTED, REJECTED, COMPLETED }
    public String getId() { return id; }
    public String getStudentEmail() { return studentEmail; }
    public void setStudentEmail(String v) { studentEmail = v; }
    public String getAlumniEmail() { return alumniEmail; }
    public void setAlumniEmail(String v) { alumniEmail = v; }
    public String getStudentName() { return studentName; }
    public void setStudentName(String v) { studentName = v; }
    public String getAlumniName() { return alumniName; }
    public void setAlumniName(String v) { alumniName = v; }
    public String getMessage() { return message; }
    public void setMessage(String v) { message = v; }
    public Status getStatus() { return status; }
    public void setStatus(Status v) { status = v; }
    public LocalDateTime getScheduledAt() { return scheduledAt; }
    public void setScheduledAt(LocalDateTime v) { scheduledAt = v; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}