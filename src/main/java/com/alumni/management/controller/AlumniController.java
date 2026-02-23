package com.alumni.management.controller;

import com.alumni.management.dto.AlumniRequestDTO;
import com.alumni.management.dto.AlumniResponseDTO;
import com.alumni.management.service.AlumniService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/alumni")
public class AlumniController {

    @Autowired
    private AlumniService alumniService;

    @PostMapping
    public ResponseEntity<AlumniResponseDTO> createAlumni(
            @Valid @RequestBody AlumniRequestDTO dto) {

        return ResponseEntity.ok(alumniService.createAlumni(dto));
    }

    @GetMapping
    public ResponseEntity<Page<AlumniResponseDTO>> getAllAlumni(Pageable pageable) {
        return ResponseEntity.ok(alumniService.getAllAlumni(pageable));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<AlumniResponseDTO>> searchAlumni(
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) Integer graduationYear,
            Pageable pageable) {

        return ResponseEntity.ok(
                alumniService.searchAlumni(
                        firstName,
                        email,
                        department,
                        graduationYear,
                        pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlumniResponseDTO> getAlumniById(@PathVariable Long id) {
        return ResponseEntity.ok(alumniService.getAlumniById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AlumniResponseDTO> updateAlumni(
            @PathVariable Long id,
            @Valid @RequestBody AlumniRequestDTO dto) {

        return ResponseEntity.ok(alumniService.updateAlumni(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAlumni(@PathVariable Long id) {
        alumniService.deleteAlumni(id);
        return ResponseEntity.ok("Alumni deleted successfully!");
    }
}