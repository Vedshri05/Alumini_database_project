package com.engineering.alumni.controller;
import com.engineering.alumni.dto.ApiResponse;
import com.engineering.alumni.entity.User;
import com.engineering.alumni.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserProfileController {
    private final UserRepository repo;
    public UserProfileController(UserRepository repo) { this.repo = repo; }

    @GetMapping("/alumni")
    public ResponseEntity<?> getAllAlumni() {
        List<User> list = repo.findAll().stream().filter(u -> "ALUMNI".equals(u.getRole())).toList();
        return ResponseEntity.ok(ApiResponse.success("Alumni list", list));
    }

    @GetMapping("/students")
    public ResponseEntity<?> getAllStudents() {
        List<User> list = repo.findAll().stream().filter(u -> "STUDENT".equals(u.getRole())).toList();
        return ResponseEntity.ok(ApiResponse.success("Student list", list));
    }

    @GetMapping("/{email}")
    public ResponseEntity<?> getProfile(@PathVariable String email) {
        return repo.findByEmail(email)
            .map(u -> ResponseEntity.ok(ApiResponse.success("Profile", u)))
            .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{email}")
    public ResponseEntity<?> updateProfile(@PathVariable String email, @RequestBody Map<String, Object> body) {
        return repo.findByEmail(email).map(u -> {
            if (body.containsKey("name")) u.setName((String) body.get("name"));
            if (body.containsKey("phone")) u.setPhone((String) body.get("phone"));
            if (body.containsKey("branch")) u.setBranch((String) body.get("branch"));
            if (body.get("graduationYear") != null) u.setGraduationYear(Integer.parseInt(body.get("graduationYear").toString()));
            repo.save(u);
            return ResponseEntity.ok(ApiResponse.success("Updated", u));
        }).orElse(ResponseEntity.notFound().build());
    }
}