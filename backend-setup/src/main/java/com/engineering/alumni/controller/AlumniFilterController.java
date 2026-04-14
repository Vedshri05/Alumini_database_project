package com.engineering.alumni.controller;

import com.engineering.alumni.dto.AlumniDTO;
import com.engineering.alumni.service.AlumniFilterService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/alumni/filter")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AlumniFilterController {
    private static final Logger log = LoggerFactory.getLogger(AlumniFilterController.class);
    private final AlumniFilterService alumniFilterService;

    public AlumniFilterController(AlumniFilterService alumniFilterService) {
        this.alumniFilterService = alumniFilterService;
    }

    /**
     * Get all alumni
     * GET /api/alumni/filter/all
     */
    @GetMapping("/all")
    public ResponseEntity<?> getAllAlumni() {
        try {
            List<AlumniDTO> alumni = alumniFilterService.getAllAlumni();
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Retrieved " + alumni.size() + " alumni records");
            response.put("data", alumni);
            response.put("count", alumni.size());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error fetching all alumni", e);
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    /**
     * Filter by branch
     * GET /api/alumni/filter/by-branch?branch=CS
     */
    @GetMapping("/by-branch")
    public ResponseEntity<?> getAlumniByBranch(@RequestParam String branch) {
        try {
            List<AlumniDTO> alumni = alumniFilterService.getAlumniByBranch(branch);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Retrieved " + alumni.size() + " alumni for branch: " + branch);
            response.put("data", alumni);
            response.put("count", alumni.size());
            response.put("filter", Map.of("branch", branch));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error fetching alumni by branch", e);
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    /**
     * Filter by graduation year
     * GET /api/alumni/filter/by-year?year=2019
     */
    @GetMapping("/by-year")
    public ResponseEntity<?> getAlumniByGraduationYear(@RequestParam Integer year) {
        try {
            List<AlumniDTO> alumni = alumniFilterService.getAlumniByGraduationYear(year);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Retrieved " + alumni.size() + " alumni from year: " + year);
            response.put("data", alumni);
            response.put("count", alumni.size());
            response.put("filter", Map.of("graduationYear", year));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error fetching alumni by year", e);
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    /**
     * Filter by branch AND year
     * GET /api/alumni/filter/by-branch-year?branch=CS&year=2019
     */
    @GetMapping("/by-branch-year")
    public ResponseEntity<?> getAlumniByBranchAndYear(
            @RequestParam String branch,
            @RequestParam Integer year) {
        try {
            List<AlumniDTO> alumni = alumniFilterService.getAlumniByBranchAndYear(branch, year);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Retrieved " + alumni.size() + " alumni for " + branch + " from year " + year);
            response.put("data", alumni);
            response.put("count", alumni.size());
            response.put("filter", Map.of("branch", branch, "graduationYear", year));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error fetching alumni by branch and year", e);
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    /**
     * Search by name
     * GET /api/alumni/filter/search-name?name=Rajesh
     */
    @GetMapping("/search-name")
    public ResponseEntity<?> searchAlumniByName(@RequestParam String name) {
        try {
            List<AlumniDTO> alumni = alumniFilterService.searchAlumniByName(name);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Found " + alumni.size() + " alumni matching name: " + name);
            response.put("data", alumni);
            response.put("count", alumni.size());
            response.put("searchTerm", name);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error searching alumni by name", e);
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    /**
     * Search by email
     * GET /api/alumni/filter/search-email?email=gmail.com
     */
    @GetMapping("/search-email")
    public ResponseEntity<?> searchAlumniByEmail(@RequestParam String email) {
        try {
            List<AlumniDTO> alumni = alumniFilterService.searchAlumniByEmail(email);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Found " + alumni.size() + " alumni with email containing: " + email);
            response.put("data", alumni);
            response.put("count", alumni.size());
            response.put("searchTerm", email);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error searching alumni by email", e);
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    /**
     * Filter by company
     * GET /api/alumni/filter/by-company?company=Google
     */
    @GetMapping("/by-company")
    public ResponseEntity<?> getAlumniByCompany(@RequestParam String company) {
        try {
            List<AlumniDTO> alumni = alumniFilterService.getAlumniByCompany(company);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Retrieved " + alumni.size() + " alumni who worked at " + company);
            response.put("data", alumni);
            response.put("count", alumni.size());
            response.put("filter", Map.of("company", company));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error fetching alumni by company", e);
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    /**
     * Get alumni with higher studies
     * GET /api/alumni/filter/with-higher-studies
     */
    @GetMapping("/with-higher-studies")
    public ResponseEntity<?> getAlumniWithHigherStudies() {
        try {
            List<AlumniDTO> alumni = alumniFilterService.getAlumniWithHigherStudies();
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Retrieved " + alumni.size() + " alumni with higher studies records");
            response.put("data", alumni);
            response.put("count", alumni.size());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error fetching alumni with higher studies", e);
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    /**
     * Get alumni with employment records
     * GET /api/alumni/filter/with-employment
     */
    @GetMapping("/with-employment")
    public ResponseEntity<?> getAlumniWithEmployment() {
        try {
            List<AlumniDTO> alumni = alumniFilterService.getAlumniWithEmployment();
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Retrieved " + alumni.size() + " alumni with employment records");
            response.put("data", alumni);
            response.put("count", alumni.size());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error fetching alumni with employment", e);
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    /**
     * Get statistics/summary
     * GET /api/alumni/filter/statistics
     */
    @GetMapping("/statistics")
    public ResponseEntity<?> getStatistics() {
        try {
            Map<String, Object> stats = new HashMap<>();
            stats.put("totalAlumni", alumniFilterService.getAllAlumni().size());
            stats.put("withEmployment", alumniFilterService.getAlumniWithEmployment().size());
            stats.put("withHigherStudies", alumniFilterService.getAlumniWithHigherStudies().size());
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Alumni statistics retrieved");
            response.put("data", stats);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error fetching statistics", e);
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        }
    }
}
