package com.engineering.alumni.repository;

import com.engineering.alumni.entity.Attendance;
import com.engineering.alumni.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, String> {
    
    // Find attendance records by event
    List<Attendance> findByEvent(Event event);
    
    // Find attendance by alumni ID and event ID
    Optional<Attendance> findByAlumniIdAndEventId(String alumniId, String eventId);
    
    // Get attendance count by status for an event
    @Query("SELECT a.status, COUNT(a) FROM Attendance a WHERE a.event.id = :eventId GROUP BY a.status")
    List<Object[]> getAttendanceCountByStatus(@Param("eventId") String eventId);
    
    // Get total attendance for an event
    @Query("SELECT COUNT(a) FROM Attendance a WHERE a.event.id = :eventId AND a.status = 'ATTENDED'")
    Long getTotalAttendanceForEvent(@Param("eventId") String eventId);
    
    // Get attendance rate for an event
    @Query("SELECT " +
           "CAST(SUM(CASE WHEN a.status = 'ATTENDED' THEN 1 ELSE 0 END) AS FLOAT) / COUNT(a) * 100 " +
           "FROM Attendance a WHERE a.event.id = :eventId")
    Double getAttendanceRateForEvent(@Param("eventId") String eventId);
    
    // Get all events attended by an alumni
    @Query("SELECT a.event FROM Attendance a WHERE a.alumni.id = :alumniId AND a.status = 'ATTENDED'")
    List<Event> getAttendedEventsByAlumni(@Param("alumniId") String alumniId);
    
    // Get attendance records by status
    List<Attendance> findByStatus(Attendance.AttendanceStatus status);
    
    // Count registered attendees for an event
    @Query("SELECT COUNT(a) FROM Attendance a WHERE a.event.id = :eventId AND a.status IN ('REGISTERED', 'CONFIRMED', 'ATTENDED')")
    Long countRegisteredForEvent(@Param("eventId") String eventId);
}
