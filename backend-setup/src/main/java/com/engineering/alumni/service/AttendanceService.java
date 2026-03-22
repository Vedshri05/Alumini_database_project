package com.engineering.alumni.service;

import com.engineering.alumni.dto.AttendanceDTO;
import com.engineering.alumni.dto.AttendanceStatisticsDTO;
import com.engineering.alumni.entity.Attendance;
import com.engineering.alumni.entity.Event;
import com.engineering.alumni.repository.AlumniRepository;
import com.engineering.alumni.repository.AttendanceRepository;
import com.engineering.alumni.repository.EventRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AttendanceService {
    private static final Logger log = LoggerFactory.getLogger(AttendanceService.class);
    private final AttendanceRepository attendanceRepository;
    private final EventRepository eventRepository;
    private final AlumniRepository alumniRepository;

    public AttendanceService(AttendanceRepository attendanceRepository, EventRepository eventRepository,
            AlumniRepository alumniRepository) {
        this.attendanceRepository = attendanceRepository;
        this.eventRepository = eventRepository;
        this.alumniRepository = alumniRepository;
    }

    // Register alumni for event
    public AttendanceDTO registerForEvent(String eventId, String alumniId) {
        log.info("Registering alumni {} for event {}", alumniId, eventId);

        // Check if already registered
        if (attendanceRepository.findByAlumniIdAndEventId(alumniId, eventId).isPresent()) {
            throw new RuntimeException("Alumni already registered for this event");
        }

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        var alumni = alumniRepository.findById(alumniId)
                .orElseThrow(() -> new RuntimeException("Alumni not found"));

        Attendance attendance = Attendance.builder()
                .event(event)
                .alumni(alumni)
                .status(Attendance.AttendanceStatus.REGISTERED)
                .build();

        Attendance saved = attendanceRepository.save(attendance);
        return AttendanceDTO.fromEntity(saved);
    }

    // Mark attendance
    public AttendanceDTO markAttendance(String eventId, String alumniId) {
        log.info("Marking attendance for alumni {} in event {}", alumniId, eventId);

        Attendance attendance = attendanceRepository.findByAlumniIdAndEventId(alumniId, eventId)
                .orElseThrow(() -> new RuntimeException("Attendance record not found"));

        attendance.setStatus(Attendance.AttendanceStatus.ATTENDED);
        attendance.setCheckedInAt(LocalDateTime.now());

        Attendance updated = attendanceRepository.save(attendance);
        return AttendanceDTO.fromEntity(updated);
    }

    // Get attendance records for an event
    public List<AttendanceDTO> getEventAttendance(String eventId) {
        log.info("Fetching attendance records for event {}", eventId);

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        return attendanceRepository.findByEvent(event).stream()
                .map(AttendanceDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // Get events attended by alumni
    public List<String> getAttendedEventsByAlumni(String alumniId) {
        log.info("Fetching events attended by alumni {}", alumniId);

        return attendanceRepository.getAttendedEventsByAlumni(alumniId).stream()
                .map(Event::getId)
                .collect(Collectors.toList());
    }

    // Get attendance rate for an event
    public Double getAttendanceRate(String eventId) {
        log.info("Calculating attendance rate for event {}", eventId);

        Double rate = attendanceRepository.getAttendanceRateForEvent(eventId);
        return rate != null ? rate : 0.0;
    }

    // Get attendance statistics for an event
    public AttendanceStatisticsDTO getEventAttendanceStats(String eventId) {
        log.info("Fetching attendance statistics for event {}", eventId);

        Long totalRegistered = attendanceRepository.countRegisteredForEvent(eventId);
        Long totalAttended = attendanceRepository.getTotalAttendanceForEvent(eventId);
        Double attendanceRate = getAttendanceRate(eventId);

        return AttendanceStatisticsDTO.builder()
                .eventId(eventId)
                .totalRegistered(totalRegistered != null ? totalRegistered : 0L)
                .totalAttended(totalAttended != null ? totalAttended : 0L)
                .attendanceRate(attendanceRate)
                .build();
    }

    // Get all attendance records
    public List<AttendanceDTO> getAllAttendance() {
        log.info("Fetching all attendance records");
        return attendanceRepository.findAll().stream()
                .map(AttendanceDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // Update attendance status
    public AttendanceDTO updateAttendanceStatus(String attendanceId, Attendance.AttendanceStatus status) {
        log.info("Updating attendance {} to status {}", attendanceId, status);

        Attendance attendance = attendanceRepository.findById(attendanceId)
                .orElseThrow(() -> new RuntimeException("Attendance record not found"));

        attendance.setStatus(status);
        Attendance updated = attendanceRepository.save(attendance);
        return AttendanceDTO.fromEntity(updated);
    }
}
