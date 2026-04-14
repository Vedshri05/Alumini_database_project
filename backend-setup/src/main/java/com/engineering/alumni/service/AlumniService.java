package com.engineering.alumni.service;

import com.engineering.alumni.dto.AlumniDTO;
import com.engineering.alumni.dto.ApiResponse;
import com.engineering.alumni.dto.AlumniStatisticsDTO;
import com.engineering.alumni.entity.Alumni;
import com.engineering.alumni.entity.Employment;
import com.engineering.alumni.entity.HigherStudies;
import com.engineering.alumni.entity.Company;
import com.engineering.alumni.entity.EngineeringBranch;
import com.engineering.alumni.repository.AlumniRepository;
import com.engineering.alumni.repository.EmploymentRepository;
import com.engineering.alumni.repository.HigherStudiesRepository;
import com.engineering.alumni.repository.CompanyRepository;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.web.multipart.MultipartFile;

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AlumniService {

    private final AlumniRepository alumniRepository;
    private final EmploymentRepository employmentRepository;
    private final HigherStudiesRepository higherStudiesRepository;
    private final CompanyRepository companyRepository;
    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(AlumniService.class);

    public AlumniService(AlumniRepository alumniRepository, 
                        EmploymentRepository employmentRepository,
                        HigherStudiesRepository higherStudiesRepository,
                        CompanyRepository companyRepository) {
        this.alumniRepository = alumniRepository;
        this.employmentRepository = employmentRepository;
        this.higherStudiesRepository = higherStudiesRepository;
        this.companyRepository = companyRepository;
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

    // Create new alumni (returns DTO for REST endpoints)
    public AlumniDTO createAlumni(AlumniDTO alumniDTO) {
        log.info("Creating new alumni: {}", alumniDTO.getSName());

        // Check if email already exists
        if (alumniRepository.findByEmail(alumniDTO.getEmail()).isPresent()) {
            throw new RuntimeException("Alumni with email " + alumniDTO.getEmail() + " already exists");
        }

        Alumni alumni = alumniDTO.toEntity();
        Alumni savedAlumni = alumniRepository.save(alumni);
        return AlumniDTO.fromEntity(savedAlumni);
    }

    // Create new alumni and return entity (for internal bulk import)
    private Alumni createAlumniEntity(AlumniDTO alumniDTO) {
        log.info("Creating new alumni entity: {}", alumniDTO.getSName());

        // Validate required fields
        if (alumniDTO.getSName() == null || alumniDTO.getSName().isBlank()) {
            throw new RuntimeException("Name (s_name) is required and cannot be empty");
        }
        if (alumniDTO.getEmail() == null || alumniDTO.getEmail().isBlank()) {
            throw new RuntimeException("Email is required and cannot be empty");
        }
        if (alumniDTO.getBranch() == null) {
            throw new RuntimeException("Branch is required");
        }
        if (alumniDTO.getGraduationYear() == null) {
            throw new RuntimeException("Graduation year is required");
        }

        // Check if email already exists
        if (alumniRepository.findByEmail(alumniDTO.getEmail()).isPresent()) {
            throw new RuntimeException("Duplicate: Email " + alumniDTO.getEmail() + " already exists. Ensure all emails are unique.");
        }

        Alumni alumni = alumniDTO.toEntity();
        return alumniRepository.save(alumni);
    }

    // Update alumni
    public AlumniDTO updateAlumni(String id, AlumniDTO alumniDTO) {
        log.info("Updating alumni with ID: {}", id);

        Alumni alumni = alumniRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Alumni not found with ID: " + id));

        alumni.setSName(alumniDTO.getSName());
        alumni.setEmail(alumniDTO.getEmail());
        alumni.setPhoneNo(alumniDTO.getPhoneNo());
        alumni.setGraduationYear(alumniDTO.getGraduationYear());
        alumni.setBranch(alumniDTO.getBranch());
        alumni.setLinkedinProfile(alumniDTO.getLinkedinProfile());
        alumni.setGender(alumniDTO.getGender());

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
    public List<AlumniDTO> getAlumniByBranch(EngineeringBranch branch) {
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
                        obj -> ((EngineeringBranch) obj[0]).name(),
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
    @Transactional(propagation = Propagation.NOT_SUPPORTED)
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
                        if (!record.isMapped("s_name") || !record.isMapped("email")) {
                            throw new IllegalArgumentException("Missing required headers: s_name or email");
                        }

                        String sName = record.get("s_name");
                        String email = record.get("email");
                        
                        // Validate required fields are not empty
                        if (sName == null || sName.isBlank()) {
                            throw new IllegalArgumentException("s_name cannot be empty");
                        }
                        if (email == null || email.isBlank()) {
                            throw new IllegalArgumentException("email cannot be empty");
                        }
                        
                        dto.setSName(sName);
                        dto.setEmail(email);

                        // Optional: s_id
                        if (record.isMapped("s_id"))
                            dto.setSId(record.get("s_id"));
                        else if (record.isMapped("S_ID"))
                            dto.setSId(record.get("S_ID"));
                        else if (record.isMapped("S_Id"))
                            dto.setSId(record.get("S_Id"));
                        
                        // Optional: phone_no
                        if (record.isMapped("phone_no"))
                            dto.setPhoneNo(record.get("phone_no"));
                        
                        // Graduation Year - Handle formats like "2012-13" and "2020"
                        String gradYear = null;
                        if (record.isMapped("graduation_year")) gradYear = record.get("graduation_year");
                        else if (record.isMapped("Graduation_Year")) gradYear = record.get("Graduation_Year");
                        if (gradYear != null && !gradYear.isBlank()) {
                            try {
                                // Handle both "2012-13" and "2020" formats - extract first 4 digits
                                String yearStr = gradYear.replaceAll("[^0-9]", "");
                                if (yearStr.length() >= 4) {
                                    dto.setGraduationYear(Integer.parseInt(yearStr.substring(0, 4)));
                                }
                            } catch (Exception e) {
                                log.warn("Could not parse graduation year: {}", gradYear);
                            }
                        }
                        
                        // Branch - Handle both full names and abbreviations
                        String branch = null;
                        if (record.isMapped("branch")) branch = record.get("branch");
                        else if (record.isMapped("Branch")) branch = record.get("Branch");
                        if (branch != null && !branch.isBlank()) {
                            try {
                                // Try to parse as enum directly (if abbreviation like "CS", "IT")
                                dto.setBranch(EngineeringBranch.valueOf(branch.toUpperCase().replace(" ", "_")));
                            } catch (IllegalArgumentException e) {
                                // If not found, try to match by full name
                                EngineeringBranch matchedBranch = matchBranchByName(branch);
                                if (matchedBranch != null) {
                                    dto.setBranch(matchedBranch);
                                } else {
                                    throw new IllegalArgumentException("Invalid branch: " + branch + ". Expected one of: CS, IT, ENTC, ECE, AIDS or their full names");
                                }
                            }
                        }
                        
                        // LinkedIn Profile
                        if (record.isMapped("linkedin_profile"))
                            dto.setLinkedinProfile(record.get("linkedin_profile"));
                        else if (record.isMapped("LinkedIn_Profile"))
                            dto.setLinkedinProfile(record.get("LinkedIn_Profile"));
                        
                        // Gender
                        if (record.isMapped("gender"))
                            dto.setGender(record.get("gender"));
                        else if (record.isMapped("Gender"))
                            dto.setGender(record.get("Gender"));

                        // Process each record in its own transaction to prevent rollback issues
                        ImportResult result = importSingleAlumni(dto, record);
                        if (result.success) {
                            totalImported++;
                        } else {
                            totalFailed++;
                            errors.add("File " + file.getOriginalFilename() + " Row " + record.getRecordNumber() + ": " + result.error);
                        }
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

    // Process single alumni record in its own transaction to prevent rollback cascading
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    private ImportResult importSingleAlumni(AlumniDTO dto, CSVRecord record) {
        try {
            // Create alumni record first (required for employment and higher studies)
            Alumni alumni = createAlumniEntity(dto);
            
            // Handle Employment Information if present
            String companyName = record.isMapped("company_name") ? record.get("company_name") : 
                               (record.isMapped("Company_Name") ? record.get("Company_Name") : null);
            String companyLocation = record.isMapped("company_location") ? record.get("company_location") : 
                                   (record.isMapped("Company_Location") ? record.get("Company_Location") : null);
            String position = record.isMapped("position") ? record.get("position") : 
                            (record.isMapped("Position") ? record.get("Position") : null);
            
            String startDateStr = null;
            if (record.isMapped("start_date")) startDateStr = record.get("start_date");
            else if (record.isMapped("Start_Date")) startDateStr = record.get("Start_Date");
            else if (record.isMapped("Employment_Start_Date")) startDateStr = record.get("Employment_Start_Date");
            
            String endDateStr = null;
            if (record.isMapped("end_date")) endDateStr = record.get("end_date");
            else if (record.isMapped("End_Date")) endDateStr = record.get("End_Date");
            else if (record.isMapped("Employment_End_Date")) endDateStr = record.get("Employment_End_Date");
            
            if ((companyName != null && !companyName.isBlank()) || 
                (position != null && !position.isBlank())) {
                try {
                    Employment employment = new Employment();
                    employment.setAlumni(alumni);
                    employment.setPosition(position);
                    
                    if (companyName != null && !companyName.isBlank()) {
                        Company company = findOrCreateCompany(companyName, companyLocation);
                        employment.setCompany(company);
                    }
                    
                    if (startDateStr != null && !startDateStr.isBlank()) {
                        employment.setStartDate(parseDate(startDateStr));
                    }
                    if (endDateStr != null && !endDateStr.isBlank()) {
                        employment.setEndDate(parseDate(endDateStr));
                    }
                    
                    if (employment.getCompany() != null) {
                        employmentRepository.save(employment);
                    }
                } catch (Exception e) {
                    log.warn("Could not create employment record for alumni {}: {}", dto.getSId(), e.getMessage());
                }
            }
            
            // Handle Higher Studies Information if present
            String collegeName = record.isMapped("college_name") ? record.get("college_name") : 
                               (record.isMapped("College_Name") ? record.get("College_Name") : null);
            String collegeLocation = record.isMapped("college_location") ? record.get("college_location") : 
                                   (record.isMapped("College_Location") ? record.get("College_Location") : null);
            String domain = record.isMapped("domain_of_study") ? record.get("domain_of_study") : 
                          (record.isMapped("Domain_Of_Study") ? record.get("Domain_Of_Study") : null);
            
            String hsStartYearStr = null;
            if (record.isMapped("start_year")) hsStartYearStr = record.get("start_year");
            else if (record.isMapped("Start_Year")) hsStartYearStr = record.get("Start_Year");
            else if (record.isMapped("HS_Start_Year")) hsStartYearStr = record.get("HS_Start_Year");
            
            String hsEndYearStr = null;
            if (record.isMapped("end_year")) hsEndYearStr = record.get("end_year");
            else if (record.isMapped("End_Year")) hsEndYearStr = record.get("End_Year");
            else if (record.isMapped("HS_End_Year")) hsEndYearStr = record.get("HS_End_Year");
            
            if ((collegeName != null && !collegeName.isBlank()) || 
                (domain != null && !domain.isBlank())) {
                try {
                    HigherStudies higherStudies = new HigherStudies();
                    higherStudies.setAlumni(alumni);
                    higherStudies.setCollegeName(collegeName);
                    higherStudies.setLocation(collegeLocation);
                    higherStudies.setDomainOfStudy(domain);
                    
                    if (hsStartYearStr != null && !hsStartYearStr.isBlank()) {
                        String yearStr = hsStartYearStr.replaceAll("[^0-9]", "");
                        if (yearStr.length() >= 4) {
                            higherStudies.setStartYear(Integer.parseInt(yearStr.substring(0, 4)));
                        }
                    }
                    if (hsEndYearStr != null && !hsEndYearStr.isBlank()) {
                        String yearStr = hsEndYearStr.replaceAll("[^0-9]", "");
                        if (yearStr.length() >= 4) {
                            higherStudies.setEndYear(Integer.parseInt(yearStr.substring(0, 4)));
                        }
                    }
                    
                    if (higherStudies.getCollegeName() != null || higherStudies.getDomainOfStudy() != null) {
                        higherStudiesRepository.save(higherStudies);
                    }
                } catch (Exception e) {
                    log.warn("Could not create higher studies record for alumni {}: {}", dto.getSId(), e.getMessage());
                }
            }
            
            return new ImportResult(true, null);
        } catch (Exception e) {
            return new ImportResult(false, e.getMessage());
        }
    }

    // Helper class for import results
    private static class ImportResult {
        boolean success;
        String error;

        ImportResult(boolean success, String error) {
            this.success = success;
            this.error = error;
        }
    }

    // Helper method to match branch by full name
    private EngineeringBranch matchBranchByName(String branchName) {
        if (branchName == null || branchName.isBlank()) {
            return null;
        }
        
        String normalizedInput = branchName.trim().toLowerCase();
        
        for (EngineeringBranch branch : EngineeringBranch.values()) {
            if (branch.getFullName().toLowerCase().equals(normalizedInput) ||
                branch.name().toLowerCase().equals(normalizedInput)) {
                return branch;
            }
        }
        
        return null;
    }

    // Helper method to parse date strings in various formats
    private LocalDate parseDate(String dateStr) {
        if (dateStr == null || dateStr.isBlank()) {
            return null;
        }
        
        dateStr = dateStr.trim();
        
        // Try common date formats
        DateTimeFormatter[] formatters = {
            DateTimeFormatter.ofPattern("yyyy-MM-dd"),
            DateTimeFormatter.ofPattern("dd-MM-yyyy"),
            DateTimeFormatter.ofPattern("MM/dd/yyyy"),
            DateTimeFormatter.ofPattern("yyyy/MM/dd"),
            DateTimeFormatter.ofPattern("dd/MM/yyyy")
        };
        
        for (DateTimeFormatter formatter : formatters) {
            try {
                return LocalDate.parse(dateStr, formatter);
            } catch (DateTimeParseException ignored) {
                // Try next format
            }
        }
        
        log.warn("Could not parse date: {}", dateStr);
        return null;
    }

    // Helper method to find or create a company
    private Company findOrCreateCompany(String companyName, String location) {
        if (companyName == null || companyName.isBlank()) {
            return null;
        }
        
        return companyRepository.findByCompanyName(companyName)
                .orElseGet(() -> {
                    Company company = new Company();
                    company.setCompanyName(companyName);
                    company.setLocation(location);
                    return companyRepository.save(company);
                });
    }
}

