package com.engineering.alumni.controller;
import com.engineering.alumni.dto.ApiResponse;
import com.engineering.alumni.entity.MentorshipRequest;
import com.engineering.alumni.service.MentorshipService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/mentorship")
public class MentorshipController {
    private final MentorshipService service;
    public MentorshipController(MentorshipService service) { this.service = service; }

    @PostMapping("/request")
    public ResponseEntity<?> sendRequest(@RequestBody Map<String, String> body) {
        try {
            var req = service.sendRequest(body.get("studentEmail"), body.get("alumniEmail"), body.get("message"));
            return ResponseEntity.ok(ApiResponse.success("Request sent", req));
        } catch (RuntimeException e) { return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage())); }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        try {
            var req = service.updateStatus(id, body.get("status"), body.get("scheduledAt"));
            return ResponseEntity.ok(ApiResponse.success("Status updated", req));
        } catch (RuntimeException e) { return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage())); }
    }

    @GetMapping("/student/{email}")
    public ResponseEntity<?> getByStudent(@PathVariable String email) {
        return ResponseEntity.ok(ApiResponse.success("Requests", service.getByStudent(email)));
    }

    @GetMapping("/alumni/{email}")
    public ResponseEntity<?> getByAlumni(@PathVariable String email) {
        return ResponseEntity.ok(ApiResponse.success("Requests", service.getByAlumni(email)));
    }
}