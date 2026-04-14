package com.engineering.alumni.controller;

import com.engineering.alumni.dto.ApiResponse;
import com.engineering.alumni.dto.HigherStudiesDTO;
import com.engineering.alumni.service.HigherStudiesService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/higher-studies")
public class HigherStudiesController {
    private static final Logger log = LoggerFactory.getLogger(HigherStudiesController.class);
    private final HigherStudiesService higherStudiesService;

    public HigherStudiesController(HigherStudiesService higherStudiesService) {
        this.higherStudiesService = higherStudiesService;
    }

    @GetMapping("/alumni/{sId}")
    public ResponseEntity<ApiResponse<List<HigherStudiesDTO>>> getHigherStudiesByAlumniId(@PathVariable String sId) {
        log.info("GET /api/higher-studies/alumni/{} - Fetching higher studies records", sId);
        List<HigherStudiesDTO> higherStudies = higherStudiesService.getHigherStudiesByAlumniId(sId);
        return ResponseEntity.ok(ApiResponse.success("Higher studies records fetched successfully", higherStudies));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<HigherStudiesDTO>> createHigherStudies(@Valid @RequestBody HigherStudiesDTO higherStudiesDTO) {
        log.info("POST /api/higher-studies - Creating new higher studies record");
        HigherStudiesDTO createdHigherStudies = higherStudiesService.createHigherStudies(higherStudiesDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Higher studies record created successfully", createdHigherStudies));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<HigherStudiesDTO>> updateHigherStudies(@PathVariable Integer id, @Valid @RequestBody HigherStudiesDTO higherStudiesDTO) {
        log.info("PUT /api/higher-studies/{} - Updating higher studies record", id);
        HigherStudiesDTO updatedHigherStudies = higherStudiesService.updateHigherStudies(id, higherStudiesDTO);
        return ResponseEntity.ok(ApiResponse.success("Higher studies record updated successfully", updatedHigherStudies));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteHigherStudies(@PathVariable Integer id) {
        log.info("DELETE /api/higher-studies/{} - Deleting higher studies record", id);
        higherStudiesService.deleteHigherStudies(id);
        return ResponseEntity.ok(ApiResponse.success("Higher studies record deleted successfully"));
    }
}
