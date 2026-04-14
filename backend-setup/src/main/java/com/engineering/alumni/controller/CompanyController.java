package com.engineering.alumni.controller;

import com.engineering.alumni.dto.ApiResponse;
import com.engineering.alumni.dto.CompanyDTO;
import com.engineering.alumni.service.CompanyService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {
    private static final Logger log = LoggerFactory.getLogger(CompanyController.class);
    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<CompanyDTO>>> getAllCompanies() {
        log.info("GET /api/companies - Fetching all companies");
        List<CompanyDTO> companies = companyService.getAllCompanies();
        return ResponseEntity.ok(ApiResponse.success("Companies fetched successfully", companies));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CompanyDTO>> getCompanyById(@PathVariable Integer id) {
        log.info("GET /api/companies/{} - Fetching company by ID", id);
        CompanyDTO company = companyService.getCompanyById(id);
        return ResponseEntity.ok(ApiResponse.success("Company fetched successfully", company));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CompanyDTO>> createCompany(@Valid @RequestBody CompanyDTO companyDTO) {
        log.info("POST /api/companies - Creating new company: {}", companyDTO.getCompanyName());
        CompanyDTO createdCompany = companyService.createCompany(companyDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Company created successfully", createdCompany));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CompanyDTO>> updateCompany(@PathVariable Integer id, @Valid @RequestBody CompanyDTO companyDTO) {
        log.info("PUT /api/companies/{} - Updating company", id);
        CompanyDTO updatedCompany = companyService.updateCompany(id, companyDTO);
        return ResponseEntity.ok(ApiResponse.success("Company updated successfully", updatedCompany));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCompany(@PathVariable Integer id) {
        log.info("DELETE /api/companies/{} - Deleting company", id);
        companyService.deleteCompany(id);
        return ResponseEntity.ok(ApiResponse.success("Company deleted successfully"));
    }
}
