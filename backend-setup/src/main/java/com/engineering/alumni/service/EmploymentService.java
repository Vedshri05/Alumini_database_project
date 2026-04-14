package com.engineering.alumni.service;

import com.engineering.alumni.dto.EmploymentDTO;
import com.engineering.alumni.entity.Alumni;
import com.engineering.alumni.entity.Company;
import com.engineering.alumni.entity.Employment;
import com.engineering.alumni.repository.AlumniRepository;
import com.engineering.alumni.repository.CompanyRepository;
import com.engineering.alumni.repository.EmploymentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class EmploymentService {
    private static final Logger log = LoggerFactory.getLogger(EmploymentService.class);
    private final EmploymentRepository employmentRepository;
    private final AlumniRepository alumniRepository;
    private final CompanyRepository companyRepository;

    public EmploymentService(EmploymentRepository employmentRepository, AlumniRepository alumniRepository, CompanyRepository companyRepository) {
        this.employmentRepository = employmentRepository;
        this.alumniRepository = alumniRepository;
        this.companyRepository = companyRepository;
    }

    public List<EmploymentDTO> getEmploymentByAlumniId(String sId) {
        log.info("Fetching employment records for alumni: {}", sId);
        return employmentRepository.findByAlumniSIdOrderByStartDateDesc(sId).stream()
                .map(e -> new EmploymentDTO(e.getEmpId(), e.getAlumni().getSId(), e.getCompany().getCompanyId(),
                        e.getCompany().getCompanyName(), e.getCompany().getLocation(), e.getPosition(), e.getStartDate(), e.getEndDate()))
                .collect(Collectors.toList());
    }

    public EmploymentDTO createEmployment(EmploymentDTO employmentDTO) {
        log.info("Creating new employment record for alumni: {}", employmentDTO.getSId());
        Alumni alumni = alumniRepository.findById(employmentDTO.getSId())
                .orElseThrow(() -> new RuntimeException("Alumni not found with ID: " + employmentDTO.getSId()));
        Company company = companyRepository.findById(employmentDTO.getCompanyId())
                .orElseThrow(() -> new RuntimeException("Company not found with ID: " + employmentDTO.getCompanyId()));

        Employment employment = new Employment(null, alumni, company, employmentDTO.getPosition(),
                employmentDTO.getStartDate(), employmentDTO.getEndDate());
        Employment savedEmployment = employmentRepository.save(employment);
        return new EmploymentDTO(savedEmployment.getEmpId(), savedEmployment.getAlumni().getSId(),
                savedEmployment.getCompany().getCompanyId(), savedEmployment.getCompany().getCompanyName(),
                savedEmployment.getCompany().getLocation(), savedEmployment.getPosition(), savedEmployment.getStartDate(), savedEmployment.getEndDate());
    }

    public EmploymentDTO updateEmployment(Integer id, EmploymentDTO employmentDTO) {
        log.info("Updating employment record with ID: {}", id);
        Employment employment = employmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employment record not found with ID: " + id));
        Company company = companyRepository.findById(employmentDTO.getCompanyId())
                .orElseThrow(() -> new RuntimeException("Company not found with ID: " + employmentDTO.getCompanyId()));

        employment.setCompany(company);
        employment.setPosition(employmentDTO.getPosition());
        employment.setStartDate(employmentDTO.getStartDate());
        employment.setEndDate(employmentDTO.getEndDate());
        Employment updatedEmployment = employmentRepository.save(employment);
        return new EmploymentDTO(updatedEmployment.getEmpId(), updatedEmployment.getAlumni().getSId(),
                updatedEmployment.getCompany().getCompanyId(), updatedEmployment.getCompany().getCompanyName(),
                updatedEmployment.getCompany().getLocation(), updatedEmployment.getPosition(), updatedEmployment.getStartDate(), updatedEmployment.getEndDate());
    }

    public void deleteEmployment(Integer id) {
        log.info("Deleting employment record with ID: {}", id);
        if (!employmentRepository.existsById(id)) {
            throw new RuntimeException("Employment record not found with ID: " + id);
        }
        employmentRepository.deleteById(id);
    }
}
