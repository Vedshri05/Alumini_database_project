package com.engineering.alumni.controller;

import com.engineering.alumni.dto.ApiResponse;
import com.engineering.alumni.entity.Event;
import com.engineering.alumni.entity.EventRegistration;
import com.engineering.alumni.repository.EventRegistrationRepository;
import com.engineering.alumni.repository.EventRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/event-registrations")
public class EventRegistrationController {

    private final EventRegistrationRepository registrationRepo;
    private final EventRepository eventRepo;

    public EventRegistrationController(EventRegistrationRepository registrationRepo,
                                       EventRepository eventRepo) {
        this.registrationRepo = registrationRepo;
        this.eventRepo = eventRepo;
    }

    // Register a user (student or alumni) for an event
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<?>> register(@RequestBody Map<String, String> body) {
        String eventId = body.get("eventId");
        String userEmail = body.get("userEmail");
        String userName = body.get("userName");
        String userRole = body.get("userRole");

        if (registrationRepo.existsByEventIdAndUserEmail(eventId, userEmail)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(ApiResponse.error("Already registered for this event"));
        }

        Event event = eventRepo.findById(eventId)
            .orElseThrow(() -> new RuntimeException("Event not found"));

        EventRegistration reg = new EventRegistration();
        reg.setEvent(event);
        reg.setUserEmail(userEmail);
        reg.setUserName(userName);
        reg.setUserRole(userRole);

        registrationRepo.save(reg);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ApiResponse.success("Registered successfully", null));
    }

    // Get all registrations for an event (admin view)
    @GetMapping("/event/{eventId}")
    public ResponseEntity<ApiResponse<List<EventRegistration>>> getByEvent(@PathVariable String eventId) {
        List<EventRegistration> regs = registrationRepo.findByEventId(eventId);
        return ResponseEntity.ok(ApiResponse.success("Registrations fetched", regs));
    }

    // Check if a user is registered for an event
    @GetMapping("/check")
    public ResponseEntity<ApiResponse<Boolean>> check(
            @RequestParam String eventId,
            @RequestParam String userEmail) {
        boolean registered = registrationRepo.existsByEventIdAndUserEmail(eventId, userEmail);
        return ResponseEntity.ok(ApiResponse.success("Check complete", registered));
    }

    // Get all events a user registered for
    @GetMapping("/user/{userEmail}")
    public ResponseEntity<ApiResponse<List<EventRegistration>>> getByUser(@PathVariable String userEmail) {
        List<EventRegistration> regs = registrationRepo.findByUserEmail(userEmail);
        return ResponseEntity.ok(ApiResponse.success("User registrations fetched", regs));
    }
}
