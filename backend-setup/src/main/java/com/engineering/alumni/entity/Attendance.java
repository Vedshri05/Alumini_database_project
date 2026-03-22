package com.engineering.alumni.entity;

import jakarta.persistence.*;
// Lombok removed; manual code below

import java.time.LocalDateTime;

@Entity
@Table(name = "attendance")
// Manual code below
public class Attendance {
    public Attendance() {}

    public Attendance(String id, Event event, Alumni alumni, AttendanceStatus status, LocalDateTime registeredAt, LocalDateTime checkedInAt, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.event = event;
        this.alumni = alumni;
        this.status = status;
        this.registeredAt = registeredAt;
        this.checkedInAt = checkedInAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private String id;
        private Event event;
        private Alumni alumni;
        private AttendanceStatus status;
        private LocalDateTime registeredAt;
        private LocalDateTime checkedInAt;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public Builder id(String id) { this.id = id; return this; }
        public Builder event(Event event) { this.event = event; return this; }
        public Builder alumni(Alumni alumni) { this.alumni = alumni; return this; }
        public Builder status(AttendanceStatus status) { this.status = status; return this; }
        public Builder registeredAt(LocalDateTime registeredAt) { this.registeredAt = registeredAt; return this; }
        public Builder checkedInAt(LocalDateTime checkedInAt) { this.checkedInAt = checkedInAt; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public Builder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }
        public Attendance build() {
            return new Attendance(id, event, alumni, status, registeredAt, checkedInAt, createdAt, updatedAt);
        }
    }

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public Event getEvent() { return event; }
    public void setEvent(Event event) { this.event = event; }
    public Alumni getAlumni() { return alumni; }
    public void setAlumni(Alumni alumni) { this.alumni = alumni; }
    public AttendanceStatus getStatus() { return status; }
    public void setStatus(AttendanceStatus status) { this.status = status; }
    public LocalDateTime getRegisteredAt() { return registeredAt; }
    public void setRegisteredAt(LocalDateTime registeredAt) { this.registeredAt = registeredAt; }
    public LocalDateTime getCheckedInAt() { return checkedInAt; }
    public void setCheckedInAt(LocalDateTime checkedInAt) { this.checkedInAt = checkedInAt; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    @ManyToOne
    @JoinColumn(name = "alumni_id", nullable = false)
    private Alumni alumni;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AttendanceStatus status;

    @Column
    private LocalDateTime registeredAt;

    @Column
    private LocalDateTime checkedInAt;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (status == null) {
            status = AttendanceStatus.REGISTERED;
        }
        if (registeredAt == null) {
            registeredAt = LocalDateTime.now();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public enum AttendanceStatus {
        REGISTERED("Registered"),
        CONFIRMED("Confirmed"),
        ATTENDED("Attended"),
        NO_SHOW("No Show"),
        CANCELLED("Cancelled");

        private final String displayName;

        AttendanceStatus(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }
}
