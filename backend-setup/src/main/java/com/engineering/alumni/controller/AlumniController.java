package com.engineering.alumni.controller;

import com.engineering.alumni.dto.AlumniDTO;
import com.engineering.alumni.dto.ApiResponse;
import com.engineering.alumni.entity.Alumni;
import com.engineering.alumni.entity.EngineeringBranch;
import com.engineering.alumni.service.AlumniService;
import jakarta.validation.Valid;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alumni")
public class AlumniController {
    private static final Logger log = LoggerFactory.getLogger(AlumniController.class);
    private final AlumniService alumniService;

    public AlumniController(AlumniService alumniService) {
        this.alumniService = alumniService;
    }

    /**
     * Get all alumni
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<AlumniDTO>>> getAllAlumni() {
        log.info("GET /api/alumni - Fetching all alumni");
        List<AlumniDTO> alumni = alumniService.getAllAlumni();
        return ResponseEntity.ok(ApiResponse.success("Alumni fetched successfully", alumni));
    }

    /**
     * Get alumni by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AlumniDTO>> getAlumniById(@PathVariable String id) {
        log.info("GET /api/alumni/{} - Fetching alumni by ID", id);
        AlumniDTO alumni = alumniService.getAlumniById(id);
        return ResponseEntity.ok(ApiResponse.success("Alumni fetched successfully", alumni));
    }

    /**
     * Create new alumni
     */
    @PostMapping
    public ResponseEntity<ApiResponse<AlumniDTO>> createAlumni(@Valid @RequestBody AlumniDTO alumniDTO) {
        log.info("POST /api/alumni - Creating new alumni: {}", alumniDTO.getSName());
        AlumniDTO createdAlumni = alumniService.createAlumni(alumniDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Alumni created successfully", createdAlumni));
    }

    /**
     * Update alumni
     */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<AlumniDTO>> updateAlumni(
            @PathVariable String id,
            @Valid @RequestBody AlumniDTO alumniDTO) {
        log.info("PUT /api/alumni/{} - Updating alumni", id);
        AlumniDTO updatedAlumni = alumniService.updateAlumni(id, alumniDTO);
        return ResponseEntity.ok(ApiResponse.success("Alumni updated successfully", updatedAlumni));
    }

    /**
     * Delete alumni
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteAlumni(@PathVariable String id) {
        log.info("DELETE /api/alumni/{} - Deleting alumni", id);
        alumniService.deleteAlumni(id);
        return ResponseEntity.ok(ApiResponse.success("Alumni deleted successfully"));
    }

    /**
     * Get alumni by branch
     */
    @GetMapping("/branch/{branch}")
    public ResponseEntity<ApiResponse<List<AlumniDTO>>> getAlumniByBranch(
            @PathVariable String branch) {
        log.info("GET /api/alumni/branch/{} - Fetching alumni by branch", branch);
        try {
            EngineeringBranch branchEnum = EngineeringBranch.valueOf(branch.toUpperCase().replace(" ", "_"));
            List<AlumniDTO> alumni = alumniService.getAlumniByBranch(branchEnum);
            return ResponseEntity.ok(ApiResponse.success("Alumni by branch fetched successfully", alumni));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Invalid branch: " + branch + ". Valid options: CS, IT, ENTC, ECE, AIDS"));
        }
    }

    /**
     * Get alumni by graduation year
     */
    @GetMapping("/year/{year}")
    public ResponseEntity<ApiResponse<List<AlumniDTO>>> getAlumniByYear(
            @PathVariable Integer year) {
        log.info("GET /api/alumni/year/{} - Fetching alumni by year", year);
        List<AlumniDTO> alumni = alumniService.getAlumniByYear(year);
        return ResponseEntity.ok(ApiResponse.success("Alumni by year fetched successfully", alumni));
    }

    /**
     * Search alumni
     */
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<AlumniDTO>>> searchAlumni(
            @RequestParam String query) {
        log.info("GET /api/alumni/search - Searching alumni with query: {}", query);
        List<AlumniDTO> alumni = alumniService.searchAlumni(query);
        return ResponseEntity.ok(ApiResponse.success("Alumni search results", alumni));
    }

    /**
     * Get alumni statistics
     */
    @GetMapping("/stats/overview")
    public ResponseEntity<ApiResponse<?>> getStatistics() {
        log.info("GET /api/alumni/stats/overview - Fetching alumni statistics");
        return ResponseEntity.ok(ApiResponse.success("Alumni statistics", alumniService.getStatistics()));
    }

    /**
     * Bulk import alumni from multiple CSV files
     */
    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<?>> uploadAlumniFiles(@RequestParam("files") MultipartFile[] files) {
        log.info("POST /api/alumni/upload - Bulk import alumni from files");
        return ResponseEntity.ok(alumniService.bulkImport(files));
    }
}
