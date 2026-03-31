package com.engineering.alumni.repository;

import com.engineering.alumni.entity.EventRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRegistrationRepository extends JpaRepository<EventRegistration, String> {
    List<EventRegistration> findByEventId(String eventId);
    Optional<EventRegistration> findByEventIdAndUserEmail(String eventId, String userEmail);
    List<EventRegistration> findByUserEmail(String userEmail);
    boolean existsByEventIdAndUserEmail(String eventId, String userEmail);
}
