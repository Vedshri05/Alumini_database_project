package com.engineering.alumni.service;

import com.engineering.alumni.dto.CompanyDTO;
import com.engineering.alumni.entity.Company;
import com.engineering.alumni.repository.CompanyRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CompanyService {
    private static final Logger log = LoggerFactory.getLogger(CompanyService.class);
    private final CompanyRepository companyRepository;

    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public List<CompanyDTO> getAllCompanies() {
        log.info("Fetching all companies");
        return companyRepository.findAll().stream()
                .map(c -> new CompanyDTO(c.getCompanyId(), c.getCompanyName(), c.getLocation()))
                .collect(Collectors.toList());
    }

    public CompanyDTO getCompanyById(Integer id) {
        log.info("Fetching company with ID: {}", id);
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found with ID: " + id));
        return new CompanyDTO(company.getCompanyId(), company.getCompanyName(), company.getLocation());
    }

    public CompanyDTO createCompany(CompanyDTO companyDTO) {
        log.info("Creating new company: {}", companyDTO.getCompanyName());
        Company company = new Company(null, companyDTO.getCompanyName(), companyDTO.getLocation());
        Company savedCompany = companyRepository.save(company);
        return new CompanyDTO(savedCompany.getCompanyId(), savedCompany.getCompanyName(), savedCompany.getLocation());
    }

    public CompanyDTO updateCompany(Integer id, CompanyDTO companyDTO) {
        log.info("Updating company with ID: {}", id);
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found with ID: " + id));
        company.setCompanyName(companyDTO.getCompanyName());
        company.setLocation(companyDTO.getLocation());
        Company updatedCompany = companyRepository.save(company);
        return new CompanyDTO(updatedCompany.getCompanyId(), updatedCompany.getCompanyName(), updatedCompany.getLocation());
    }

    public void deleteCompany(Integer id) {
        log.info("Deleting company with ID: {}", id);
        if (!companyRepository.existsById(id)) {
            throw new RuntimeException("Company not found with ID: " + id);
        }
        companyRepository.deleteById(id);
    }
}
