package com.engineering.alumni.service;

import com.engineering.alumni.dto.AlumniDTO;
import com.engineering.alumni.dto.ApiResponse;
import com.engineering.alumni.dto.AlumniStatisticsDTO;
import com.engineering.alumni.entity.Alumni;
import com.engineering.alumni.repository.AlumniRepository;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AlumniService {

    private final AlumniRepository alumniRepository;
    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(AlumniService.class);

    public AlumniService(AlumniRepository alumniRepository) {
        this.alumniRepository = alumniRepository;
    }

    // Get all alumni
    public List<AlumniDTO> getAllAlumni() {
        log.info("Fetching all alumni");
        return alumniRepository.findAll().stream()
                .map(AlumniDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // Get alumni by ID
    public AlumniDTO getAlumniById(String id) {
        log.info("Fetching alumni with ID: {}", id);
        return alumniRepository.findById(id)
                .map(AlumniDTO::fromEntity)
                .orElseThrow(() -> new RuntimeException("Alumni not found with ID: " + id));
    }

    // Create new alumni
    public AlumniDTO createAlumni(AlumniDTO alumniDTO) {
        log.info("Creating new alumni: {}", alumniDTO.getName());

        // Check if email already exists
        if (alumniRepository.findByEmail(alumniDTO.getEmail()).isPresent()) {
            throw new RuntimeException("Alumni with email " + alumniDTO.getEmail() + " already exists");
        }

        Alumni alumni = alumniDTO.toEntity();
        Alumni savedAlumni = alumniRepository.save(alumni);
        return AlumniDTO.fromEntity(savedAlumni);
    }

    // Update alumni
    public AlumniDTO updateAlumni(String id, AlumniDTO alumniDTO) {
        log.info("Updating alumni with ID: {}", id);

        Alumni alumni = alumniRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Alumni not found with ID: " + id));

        alumni.setName(alumniDTO.getName());
        alumni.setEmail(alumniDTO.getEmail());
        alumni.setPhone(alumniDTO.getPhone());
        alumni.setGraduationYear(alumniDTO.getGraduationYear());
        alumni.setBranch(alumniDTO.getBranch());
        alumni.setCurrentPosition(alumniDTO.getCurrentPosition());
        alumni.setCompany(alumniDTO.getCompany());
        alumni.setLocation(alumniDTO.getLocation());
        alumni.setLinkedinUrl(alumniDTO.getLinkedinUrl());

        Alumni updatedAlumni = alumniRepository.save(alumni);
        return AlumniDTO.fromEntity(updatedAlumni);
    }

    // Delete alumni
    public void deleteAlumni(String id) {
        log.info("Deleting alumni with ID: {}", id);

        if (!alumniRepository.existsById(id)) {
            throw new RuntimeException("Alumni not found with ID: " + id);
        }

        alumniRepository.deleteById(id);
    }

    // Get alumni by branch
    public List<AlumniDTO> getAlumniByBranch(Alumni.EngineeringBranch branch) {
        log.info("Fetching alumni by branch: {}", branch);
        return alumniRepository.findByBranch(branch).stream()
                .map(AlumniDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // Get alumni by graduation year
    public List<AlumniDTO> getAlumniByYear(Integer year) {
        log.info("Fetching alumni by year: {}", year);
        return alumniRepository.findByGraduationYear(year).stream()
                .map(AlumniDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // Search alumni
    public List<AlumniDTO> searchAlumni(String searchTerm) {
        log.info("Searching alumni with term: {}", searchTerm);
        return alumniRepository.searchAlumni(searchTerm).stream()
                .map(AlumniDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // Get statistics
    public AlumniStatisticsDTO getStatistics() {
        log.info("Fetching alumni statistics");

        long totalAlumni = alumniRepository.count();

        // Get branch breakdown (filter out nulls)
        var branchBreakdown = alumniRepository.getAlumniCountByBranch().stream()
                .filter(obj -> obj[0] != null)
                .collect(Collectors.toMap(
                        obj -> ((Alumni.EngineeringBranch) obj[0]).name(),
                        obj -> ((Number) obj[1]).longValue()));

        // Get year breakdown (filter out nulls)
        var yearBreakdown = alumniRepository.getAlumniCountByYear().stream()
                .filter(obj -> obj[0] != null)
                .collect(Collectors.toMap(
                        obj -> obj[0].toString(),
                        obj -> ((Number) obj[1]).longValue()));

        return AlumniStatisticsDTO.builder()
                .totalAlumni(totalAlumni)
                .branchBreakdown(branchBreakdown)
                .yearBreakdown(yearBreakdown)
                .build();
    }

    // Bulk import alumni from multiple CSV files
    public ApiResponse<?> bulkImport(MultipartFile[] files) {
        log.info("Bulk importing alumni from {} files", files.length);
        int totalImported = 0;
        int totalFailed = 0;
        List<String> errors = new ArrayList<>();

        for (MultipartFile file : files) {
            try (CSVParser parser = CSVParser.parse(file.getInputStream(), StandardCharsets.UTF_8,
                    CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim())) {

                for (CSVRecord record : parser) {
                    try {
                        AlumniDTO dto = new AlumniDTO();
                        // Required fields
                        if (!record.isMapped("name") || !record.isMapped("email")) {
                            throw new IllegalArgumentException("Missing required headers: name or email");
                        }

                        dto.setName(record.get("name"));
                        dto.setEmail(record.get("email"));

                        // Optional fields - handle both spaced and camelCase headers
                        if (record.isMapped("phone"))
                            dto.setPhone(record.get("phone"));
                        
                        // Graduation Year
                        String gradYear = null;
                        if (record.isMapped("graduationYear")) gradYear = record.get("graduationYear");
                        else if (record.isMapped("Graduation Year")) gradYear = record.get("Graduation Year");
                        if (gradYear != null && !gradYear.isBlank())
                            dto.setGraduationYear(Integer.parseInt(gradYear));
                        
                        // Branch
                        String branch = null;
                        if (record.isMapped("branch")) branch = record.get("branch");
                        else if (record.isMapped("Branch")) branch = record.get("Branch");
                        if (branch != null && !branch.isBlank())
                            dto.setBranch(Alumni.EngineeringBranch.valueOf(branch));
                        
                        // Current Position
                        if (record.isMapped("currentPosition"))
                            dto.setCurrentPosition(record.get("currentPosition"));
                        else if (record.isMapped("Current Position"))
                            dto.setCurrentPosition(record.get("Current Position"));
                        
                        // Company
                        if (record.isMapped("company"))
                            dto.setCompany(record.get("company"));
                        else if (record.isMapped("Company"))
                            dto.setCompany(record.get("Company"));
                        
                        // Location
                        if (record.isMapped("location"))
                            dto.setLocation(record.get("location"));
                        else if (record.isMapped("Location"))
                            dto.setLocation(record.get("Location"));
                        
                        // LinkedIn URL
                        if (record.isMapped("linkedinUrl"))
                            dto.setLinkedinUrl(record.get("linkedinUrl"));
                        else if (record.isMapped("LinkedIn URL"))
                            dto.setLinkedinUrl(record.get("LinkedIn URL"));

                        createAlumni(dto);
                        totalImported++;
                    } catch (Exception e) {
                        totalFailed++;
                        errors.add("File " + file.getOriginalFilename() + " Row " + record.getRecordNumber() + ": "
                                + e.getMessage());
                    }
                }
            } catch (Exception e) {
                errors.add("File " + file.getOriginalFilename() + ": " + e.getMessage());
            }
        }

        String message = "Import completed: " + totalImported + " imported, " + totalFailed + " failed.";
        if (!errors.isEmpty()) {
            return ApiResponse.error(message, String.join("; ", errors));
        }
        return ApiResponse.success(message);
    }
}
