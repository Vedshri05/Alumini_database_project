package com.engineering.alumni.service;

import com.engineering.alumni.dto.AlumniDTO;
import com.engineering.alumni.entity.Alumni;
import com.engineering.alumni.repository.AlumniRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AlumniFilterService {
    private static final Logger log = LoggerFactory.getLogger(AlumniFilterService.class);
    private final AlumniRepository alumniRepository;

    public AlumniFilterService(AlumniRepository alumniRepository) {
        this.alumniRepository = alumniRepository;
    }

    /**
     * Get all alumni with complete information
     */
    public List<AlumniDTO> getAllAlumni() {
        log.info("Fetching all alumni records");
        return alumniRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Filter alumni by branch
     */
    public List<AlumniDTO> getAlumniByBranch(String branch) {
        log.info("Fetching alumni by branch: {}", branch);
        return alumniRepository.findAll().stream()
                .filter(a -> a.getBranch() != null && a.getBranch().toString().equalsIgnoreCase(branch))
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Filter alumni by graduation year
     */
    public List<AlumniDTO> getAlumniByGraduationYear(Integer year) {
        log.info("Fetching alumni by graduation year: {}", year);
        return alumniRepository.findByGraduationYear(year).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Filter alumni by both branch and graduation year
     */
    public List<AlumniDTO> getAlumniByBranchAndYear(String branch, Integer year) {
        log.info("Fetching alumni by branch: {} and year: {}", branch, year);
        return alumniRepository.findAll().stream()
                .filter(a -> (a.getBranch() != null && a.getBranch().toString().equalsIgnoreCase(branch)) &&
                           (a.getGraduationYear() != null && a.getGraduationYear().equals(year)))
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Search alumni by name (partial match)
     */
    public List<AlumniDTO> searchAlumniByName(String name) {
        log.info("Searching alumni by name: {}", name);
        return alumniRepository.findAll().stream()
                .filter(a -> a.getSName() != null && a.getSName().toLowerCase().contains(name.toLowerCase()))
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Search alumni by email
     */
    public List<AlumniDTO> searchAlumniByEmail(String email) {
        log.info("Searching alumni by email: {}", email);
        return alumniRepository.findAll().stream()
                .filter(a -> a.getEmail() != null && a.getEmail().toLowerCase().contains(email.toLowerCase()))
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get alumni who have worked at a specific company
     */
    public List<AlumniDTO> getAlumniByCompany(String companyName) {
        log.info("Fetching alumni by company: {}", companyName);
        return alumniRepository.findAll().stream()
                .filter(a -> a.getEmployments() != null && 
                           a.getEmployments().stream()
                           .anyMatch(e -> e.getCompany() != null && 
                                        e.getCompany().getCompanyName().toLowerCase()
                                         .contains(companyName.toLowerCase())))
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get alumni with higher studies records
     */
    public List<AlumniDTO> getAlumniWithHigherStudies() {
        log.info("Fetching alumni with higher studies records");
        return alumniRepository.findAll().stream()
                .filter(a -> a.getHigherStudies() != null && !a.getHigherStudies().isEmpty())
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get alumni with employment records
     */
    public List<AlumniDTO> getAlumniWithEmployment() {
        log.info("Fetching alumni with employment records");
        return alumniRepository.findAll().stream()
                .filter(a -> a.getEmployments() != null && !a.getEmployments().isEmpty())
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Convert Alumni entity to DTO with all relationships
     */
    private AlumniDTO convertToDTO(Alumni alumni) {
        AlumniDTO dto = new AlumniDTO();
        dto.setSId(alumni.getSId());
        dto.setSName(alumni.getSName());
        dto.setBranch(alumni.getBranch());
        dto.setGraduationYear(alumni.getGraduationYear());
        dto.setPhoneNo(alumni.getPhoneNo());
        dto.setEmail(alumni.getEmail());
        dto.setLinkedinProfile(alumni.getLinkedinProfile());
        dto.setGender(alumni.getGender());
        return dto;
    }
}
