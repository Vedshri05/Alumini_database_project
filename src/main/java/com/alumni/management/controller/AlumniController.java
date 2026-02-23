package com.alumni.management.controller;

import com.alumni.management.entity.Alumni;
import com.alumni.management.service.AlumniService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alumni")
public class AlumniController {

    @Autowired
    private AlumniService alumniService;

    // ✅ Create Alumni
    @PostMapping
    public ResponseEntity<Alumni> createAlumni(@Valid @RequestBody Alumni alumni) {
        return ResponseEntity.ok(alumniService.createAlumni(alumni));
    }

    // ✅ Get All Alumni
    @GetMapping
    public ResponseEntity<List<Alumni>> getAllAlumni() {
        return ResponseEntity.ok(alumniService.getAllAlumni());
    }

    // ✅ Get Alumni By ID
    @GetMapping("/{id}")
    public ResponseEntity<Alumni> getAlumniById(@PathVariable Long id) {
        return ResponseEntity.ok(alumniService.getAlumniById(id));
    }

    // ✅ Update Alumni
    @PutMapping("/{id}")
    public ResponseEntity<Alumni> updateAlumni(@PathVariable Long id,
            @Valid @RequestBody Alumni alumni) {
        return ResponseEntity.ok(alumniService.updateAlumni(id, alumni));
    }

    // ✅ Delete Alumni
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAlumni(@PathVariable Long id) {
        alumniService.deleteAlumni(id);
        return ResponseEntity.ok("Alumni deleted successfully!");
    }
}