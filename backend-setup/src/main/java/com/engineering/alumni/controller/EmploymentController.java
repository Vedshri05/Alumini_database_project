package com.engineering.alumni.controller;

import com.engineering.alumni.dto.ApiResponse;
import com.engineering.alumni.dto.EmploymentDTO;
import com.engineering.alumni.service.EmploymentService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employment")
public class EmploymentController {
    private static final Logger log = LoggerFactory.getLogger(EmploymentController.class);
    private final EmploymentService employmentService;

    public EmploymentController(EmploymentService employmentService) {
        this.employmentService = employmentService;
    }

    @GetMapping("/alumni/{sId}")
    public ResponseEntity<ApiResponse<List<EmploymentDTO>>> getEmploymentByAlumniId(@PathVariable String sId) {
        log.info("GET /api/employment/alumni/{} - Fetching employment records", sId);
        List<EmploymentDTO> employments = employmentService.getEmploymentByAlumniId(sId);
        return ResponseEntity.ok(ApiResponse.success("Employment records fetched successfully", employments));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<EmploymentDTO>> createEmployment(@Valid @RequestBody EmploymentDTO employmentDTO) {
        log.info("POST /api/employment - Creating new employment record");
        EmploymentDTO createdEmployment = employmentService.createEmployment(employmentDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Employment record created successfully", createdEmployment));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<EmploymentDTO>> updateEmployment(@PathVariable Integer id, @Valid @RequestBody EmploymentDTO employmentDTO) {
        log.info("PUT /api/employment/{} - Updating employment record", id);
        EmploymentDTO updatedEmployment = employmentService.updateEmployment(id, employmentDTO);
        return ResponseEntity.ok(ApiResponse.success("Employment record updated successfully", updatedEmployment));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteEmployment(@PathVariable Integer id) {
        log.info("DELETE /api/employment/{} - Deleting employment record", id);
        employmentService.deleteEmployment(id);
        return ResponseEntity.ok(ApiResponse.success("Employment record deleted successfully"));
    }
}
