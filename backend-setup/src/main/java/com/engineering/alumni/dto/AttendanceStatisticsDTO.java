package com.engineering.alumni.dto;

public class AttendanceStatisticsDTO {
    private String eventId;
    private Long totalRegistered;
    private Long totalAttended;
    private Double attendanceRate;

    public AttendanceStatisticsDTO() {
    }

    public AttendanceStatisticsDTO(String eventId, Long totalRegistered, Long totalAttended, Double attendanceRate) {
        this.eventId = eventId;
        this.totalRegistered = totalRegistered;
        this.totalAttended = totalAttended;
        this.attendanceRate = attendanceRate;
    }

    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }

    public Long getTotalRegistered() {
        return totalRegistered;
    }

    public void setTotalRegistered(Long totalRegistered) {
        this.totalRegistered = totalRegistered;
    }

    public Long getTotalAttended() {
        return totalAttended;
    }

    public void setTotalAttended(Long totalAttended) {
        this.totalAttended = totalAttended;
    }

    public Double getAttendanceRate() {
        return attendanceRate;
    }

    public void setAttendanceRate(Double attendanceRate) {
        this.attendanceRate = attendanceRate;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String eventId;
        private Long totalRegistered;
        private Long totalAttended;
        private Double attendanceRate;

        public Builder eventId(String eventId) {
            this.eventId = eventId;
            return this;
        }

        public Builder totalRegistered(Long totalRegistered) {
            this.totalRegistered = totalRegistered;
            return this;
        }

        public Builder totalAttended(Long totalAttended) {
            this.totalAttended = totalAttended;
            return this;
        }

        public Builder attendanceRate(Double attendanceRate) {
            this.attendanceRate = attendanceRate;
            return this;
        }

        public AttendanceStatisticsDTO build() {
            return new AttendanceStatisticsDTO(eventId, totalRegistered, totalAttended, attendanceRate);
        }
    }
}
