package com.engineering.alumni.repository;

import com.engineering.alumni.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, String> {
    
    // Find events by status
    List<Event> findByStatus(Event.EventStatus status);
    
    // Find events by type
    List<Event> findByEventType(Event.EventType eventType);
    
    // Find upcoming events
    @Query("SELECT e FROM Event e WHERE e.eventDate > :now AND e.status != 'CANCELLED' ORDER BY e.eventDate ASC")
    List<Event> findUpcomingEvents(@Param("now") LocalDateTime now);
    
    // Find past events
    @Query("SELECT e FROM Event e WHERE e.eventDate <= :now ORDER BY e.eventDate DESC")
    List<Event> findPastEvents(@Param("now") LocalDateTime now);
    
    // Search events by title or description
    @Query("SELECT e FROM Event e WHERE " +
           "LOWER(e.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(e.description) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Event> searchEvents(@Param("searchTerm") String searchTerm);
    
    // Get event count by type
    @Query("SELECT e.eventType, COUNT(e) FROM Event e GROUP BY e.eventType")
    List<Object[]> getEventCountByType();
    
    // Find events by date range
    @Query("SELECT e FROM Event e WHERE e.eventDate BETWEEN :startDate AND :endDate ORDER BY e.eventDate ASC")
    List<Event> findEventsByDateRange(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
}
