package com.engineering.alumni.dto;

import com.engineering.alumni.entity.Attendance;
import java.time.LocalDateTime;

public class AttendanceDTO {
    private String id;
    private String eventId;
    private String alumniId;
    private String alumniName;
    private Attendance.AttendanceStatus status;
    private LocalDateTime registeredAt;
    private LocalDateTime checkedInAt;
    private LocalDateTime createdAt;

    public AttendanceDTO() {}

    public AttendanceDTO(String id, String eventId, String alumniId, String alumniName,
                        Attendance.AttendanceStatus status, LocalDateTime registeredAt,
                        LocalDateTime checkedInAt, LocalDateTime createdAt) {
        this.id = id;
        this.eventId = eventId;
        this.alumniId = alumniId;
        this.alumniName = alumniName;
        this.status = status;
        this.registeredAt = registeredAt;
        this.checkedInAt = checkedInAt;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getEventId() { return eventId; }
    public void setEventId(String eventId) { this.eventId = eventId; }
    public String getAlumniId() { return alumniId; }
    public void setAlumniId(String alumniId) { this.alumniId = alumniId; }
    public String getAlumniName() { return alumniName; }
    public void setAlumniName(String alumniName) { this.alumniName = alumniName; }
    public Attendance.AttendanceStatus getStatus() { return status; }
    public void setStatus(Attendance.AttendanceStatus status) { this.status = status; }
    public LocalDateTime getRegisteredAt() { return registeredAt; }
    public void setRegisteredAt(LocalDateTime registeredAt) { this.registeredAt = registeredAt; }
    public LocalDateTime getCheckedInAt() { return checkedInAt; }
    public void setCheckedInAt(LocalDateTime checkedInAt) { this.checkedInAt = checkedInAt; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    // Manual builder
    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private String id;
        private String eventId;
        private String alumniId;
        private String alumniName;
        private Attendance.AttendanceStatus status;
        private LocalDateTime registeredAt;
        private LocalDateTime checkedInAt;
        private LocalDateTime createdAt;

        public Builder id(String id) { this.id = id; return this; }
        public Builder eventId(String eventId) { this.eventId = eventId; return this; }
        public Builder alumniId(String alumniId) { this.alumniId = alumniId; return this; }
        public Builder alumniName(String alumniName) { this.alumniName = alumniName; return this; }
        public Builder status(Attendance.AttendanceStatus status) { this.status = status; return this; }
        public Builder registeredAt(LocalDateTime registeredAt) { this.registeredAt = registeredAt; return this; }
        public Builder checkedInAt(LocalDateTime checkedInAt) { this.checkedInAt = checkedInAt; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public AttendanceDTO build() {
            return new AttendanceDTO(id, eventId, alumniId, alumniName, status, registeredAt, checkedInAt, createdAt);
        }
    }

    public static AttendanceDTO fromEntity(Attendance attendance) {
        return AttendanceDTO.builder()
            .id(attendance.getId())
            .eventId(attendance.getEvent().getId())
            .alumniId(attendance.getAlumni().getSId())
            .alumniName(attendance.getAlumni().getSName())
            .status(attendance.getStatus())
            .registeredAt(attendance.getRegisteredAt())
            .checkedInAt(attendance.getCheckedInAt())
            .createdAt(attendance.getCreatedAt())
            .build();
    }
}
