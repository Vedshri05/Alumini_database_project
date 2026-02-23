package com.alumni.management.service;

import com.alumni.management.dto.AlumniRequestDTO;
import com.alumni.management.dto.AlumniResponseDTO;
import com.alumni.management.entity.Alumni;
import com.alumni.management.exception.AlumniNotFoundException;
import com.alumni.management.mapper.AlumniMapper;
import com.alumni.management.repository.AlumniRepository;
import com.alumni.management.specification.AlumniSpecification;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class AlumniServiceImpl implements AlumniService {

    private static final Logger logger = LoggerFactory.getLogger(AlumniServiceImpl.class);

    @Autowired
    private AlumniRepository alumniRepository;

    @Override
    public AlumniResponseDTO createAlumni(AlumniRequestDTO dto) {

        logger.info("Creating alumni with email: {}", dto.getEmail());

        Alumni alumni = AlumniMapper.toEntity(dto);
        Alumni saved = alumniRepository.save(alumni);

        return AlumniMapper.toDTO(saved);
    }

    @Override
    public Page<AlumniResponseDTO> getAllAlumni(Pageable pageable) {

        return alumniRepository.findAll(pageable)
                .map(AlumniMapper::toDTO);
    }

    @Override
    public Page<AlumniResponseDTO> searchAlumni(
            String firstName,
            String email,
            String department,
            Integer graduationYear,
            Pageable pageable) {

        Specification<Alumni> spec = Specification
                .where(AlumniSpecification.hasFirstName(firstName))
                .and(AlumniSpecification.hasEmail(email))
                .and(AlumniSpecification.hasDepartment(department))
                .and(AlumniSpecification.hasGraduationYear(graduationYear));

        return alumniRepository.findAll(spec, pageable)
                .map(AlumniMapper::toDTO);
    }

    @Override
    public AlumniResponseDTO getAlumniById(Long id) {

        logger.info("Fetching alumni with id: {}", id);

        Alumni alumni = alumniRepository.findById(id)
                .orElseThrow(() -> new AlumniNotFoundException("Alumni with id " + id + " not found"));

        return AlumniMapper.toDTO(alumni);
    }

    @Override
    public AlumniResponseDTO updateAlumni(Long id, AlumniRequestDTO dto) {

        Alumni alumni = alumniRepository.findById(id)
                .orElseThrow(() -> new AlumniNotFoundException("Alumni with id " + id + " not found"));

        alumni.setFirstName(dto.getFirstName());
        alumni.setLastName(dto.getLastName());
        alumni.setEmail(dto.getEmail());
        alumni.setPhone(dto.getPhone());
        alumni.setGraduationYear(dto.getGraduationYear());
        alumni.setDepartment(dto.getDepartment());
        alumni.setCurrentCompany(dto.getCurrentCompany());

        Alumni updated = alumniRepository.save(alumni);

        logger.info("Updated alumni with id: {}", id);

        return AlumniMapper.toDTO(updated);
    }

    @Override
    public void deleteAlumni(Long id) {

        if (!alumniRepository.existsById(id)) {
            throw new AlumniNotFoundException("Alumni with id " + id + " not found");
        }

        alumniRepository.deleteById(id);

        logger.warn("Deleted alumni with id: {}", id);
    }
}