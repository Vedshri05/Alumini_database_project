package com.engineering.alumni.controller;
import com.engineering.alumni.dto.ApiResponse;
import com.engineering.alumni.entity.JobPost;
import com.engineering.alumni.service.JobService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/jobs")
public class JobController {
    private final JobService service;
    public JobController(JobService service) { this.service = service; }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Map<String, Object> body) {
        try {
            var post = new JobPost();
            post.setTitle((String) body.get("title"));
            post.setCompany((String) body.get("company"));
            post.setDescription((String) body.get("description"));
            post.setLocation((String) body.get("location"));
            post.setSkills((String) body.get("skills"));
            post.setType((String) body.get("type"));
            var job = service.create((String) body.get("alumniEmail"), post);
            return ResponseEntity.ok(ApiResponse.success("Job posted", job));
        } catch (RuntimeException e) { return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage())); }
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(ApiResponse.success("Jobs", service.getAll()));
    }

    @GetMapping("/alumni/{email}")
    public ResponseEntity<?> getByAlumni(@PathVariable String email) {
        return ResponseEntity.ok(ApiResponse.success("Jobs", service.getByAlumni(email)));
    }

    @PostMapping("/{id}/apply")
    public ResponseEntity<?> apply(@PathVariable String id, @RequestBody Map<String, String> body) {
        try {
            var job = service.apply(id, body.get("studentEmail"));
            return ResponseEntity.ok(ApiResponse.success("Applied", job));
        } catch (RuntimeException e) { return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage())); }
    }
}