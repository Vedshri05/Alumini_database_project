package com.engineering.alumni.controller;

import com.engineering.alumni.dto.ApiResponse;
import com.engineering.alumni.dto.AttendanceDTO;
import com.engineering.alumni.entity.Attendance;
import com.engineering.alumni.service.AttendanceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {
    private static final Logger log = LoggerFactory.getLogger(AttendanceController.class);
    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    /**
     * Register alumni for event
     */
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AttendanceDTO>> registerForEvent(
            @RequestParam String eventId,
            @RequestParam String alumniId) {
        log.info("POST /api/attendance/register - Registering alumni {} for event {}", alumniId, eventId);
        AttendanceDTO attendance = attendanceService.registerForEvent(eventId, alumniId);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ApiResponse.success("Alumni registered for event successfully", attendance));
    }

    /**
     * Mark attendance (check-in)
     */
    @PostMapping("/check-in")
    public ResponseEntity<ApiResponse<AttendanceDTO>> markAttendance(
            @RequestParam String eventId,
            @RequestParam String alumniId) {
        log.info("POST /api/attendance/check-in - Marking attendance for alumni {} in event {}", alumniId, eventId);
        AttendanceDTO attendance = attendanceService.markAttendance(eventId, alumniId);
        return ResponseEntity.ok(ApiResponse.success("Attendance marked successfully", attendance));
    }

    /**
     * Get attendance records for an event
     */
    @GetMapping("/event/{eventId}")
    public ResponseEntity<ApiResponse<List<AttendanceDTO>>> getEventAttendance(
            @PathVariable String eventId) {
        log.info("GET /api/attendance/event/{} - Fetching attendance records", eventId);
        List<AttendanceDTO> records = attendanceService.getEventAttendance(eventId);
        return ResponseEntity.ok(ApiResponse.success("Attendance records fetched successfully", records));
    }

    /**
     * Get events attended by alumni
     */
    @GetMapping("/alumni/{alumniId}")
    public ResponseEntity<ApiResponse<List<String>>> getAttendedEventsByAlumni(
            @PathVariable String alumniId) {
        log.info("GET /api/attendance/alumni/{} - Fetching events attended by alumni", alumniId);
        List<String> events = attendanceService.getAttendedEventsByAlumni(alumniId);
        return ResponseEntity.ok(ApiResponse.success("Events attended fetched successfully", events));
    }

    /**
     * Get attendance rate for an event
     */
    @GetMapping("/event/{eventId}/rate")
    public ResponseEntity<ApiResponse<Double>> getAttendanceRate(
            @PathVariable String eventId) {
        log.info("GET /api/attendance/event/{}/rate - Calculating attendance rate", eventId);
        Double rate = attendanceService.getAttendanceRate(eventId);
        return ResponseEntity.ok(ApiResponse.success("Attendance rate calculated successfully", rate));
    }

    /**
     * Get attendance statistics for an event
     */
    @GetMapping("/event/{eventId}/stats")
    public ResponseEntity<ApiResponse<?>> getEventAttendanceStats(
            @PathVariable String eventId) {
        log.info("GET /api/attendance/event/{}/stats - Fetching attendance statistics", eventId);
        return ResponseEntity.ok(ApiResponse.success("Attendance statistics", 
            attendanceService.getEventAttendanceStats(eventId)));
    }

    /**
     * Get all attendance records
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<AttendanceDTO>>> getAllAttendance() {
        log.info("GET /api/attendance - Fetching all attendance records");
        List<AttendanceDTO> records = attendanceService.getAllAttendance();
        return ResponseEntity.ok(ApiResponse.success("All attendance records fetched successfully", records));
    }

    /**
     * Update attendance status
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<AttendanceDTO>> updateAttendanceStatus(
            @PathVariable String id,
            @RequestParam Attendance.AttendanceStatus status) {
        log.info("PUT /api/attendance/{}/status - Updating attendance status to {}", id, status);
        AttendanceDTO attendance = attendanceService.updateAttendanceStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success("Attendance status updated successfully", attendance));
    }
}
