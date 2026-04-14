package com.engineering.alumni.service;

import com.engineering.alumni.dto.HigherStudiesDTO;
import com.engineering.alumni.entity.Alumni;
import com.engineering.alumni.entity.HigherStudies;
import com.engineering.alumni.repository.AlumniRepository;
import com.engineering.alumni.repository.HigherStudiesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class HigherStudiesService {
    private static final Logger log = LoggerFactory.getLogger(HigherStudiesService.class);
    private final HigherStudiesRepository higherStudiesRepository;
    private final AlumniRepository alumniRepository;

    public HigherStudiesService(HigherStudiesRepository higherStudiesRepository, AlumniRepository alumniRepository) {
        this.higherStudiesRepository = higherStudiesRepository;
        this.alumniRepository = alumniRepository;
    }

    public List<HigherStudiesDTO> getHigherStudiesByAlumniId(String sId) {
        log.info("Fetching higher studies records for alumni: {}", sId);
        return higherStudiesRepository.findBySId(sId).stream()
                .map(hs -> new HigherStudiesDTO(hs.getHsId(), hs.getAlumni().getSId(), hs.getCollegeName(),
                        hs.getLocation(), hs.getDomainOfStudy(), hs.getStartYear(), hs.getEndYear()))
                .collect(Collectors.toList());
    }

    public HigherStudiesDTO createHigherStudies(HigherStudiesDTO higherStudiesDTO) {
        log.info("Creating new higher studies record for alumni: {}", higherStudiesDTO.getSId());
        Alumni alumni = alumniRepository.findById(higherStudiesDTO.getSId())
                .orElseThrow(() -> new RuntimeException("Alumni not found with ID: " + higherStudiesDTO.getSId()));

        HigherStudies higherStudies = new HigherStudies(null, alumni, higherStudiesDTO.getCollegeName(),
                higherStudiesDTO.getLocation(), higherStudiesDTO.getDomainOfStudy(),
                higherStudiesDTO.getStartYear(), higherStudiesDTO.getEndYear());
        HigherStudies savedHigherStudies = higherStudiesRepository.save(higherStudies);
        return new HigherStudiesDTO(savedHigherStudies.getHsId(), savedHigherStudies.getAlumni().getSId(),
                savedHigherStudies.getCollegeName(), savedHigherStudies.getLocation(),
                savedHigherStudies.getDomainOfStudy(), savedHigherStudies.getStartYear(),
                savedHigherStudies.getEndYear());
    }

    public HigherStudiesDTO updateHigherStudies(Integer id, HigherStudiesDTO higherStudiesDTO) {
        log.info("Updating higher studies record with ID: {}", id);
        HigherStudies higherStudies = higherStudiesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Higher studies record not found with ID: " + id));

        higherStudies.setCollegeName(higherStudiesDTO.getCollegeName());
        higherStudies.setLocation(higherStudiesDTO.getLocation());
        higherStudies.setDomainOfStudy(higherStudiesDTO.getDomainOfStudy());
        higherStudies.setStartYear(higherStudiesDTO.getStartYear());
        higherStudies.setEndYear(higherStudiesDTO.getEndYear());
        HigherStudies updatedHigherStudies = higherStudiesRepository.save(higherStudies);
        return new HigherStudiesDTO(updatedHigherStudies.getHsId(), updatedHigherStudies.getAlumni().getSId(),
                updatedHigherStudies.getCollegeName(), updatedHigherStudies.getLocation(),
                updatedHigherStudies.getDomainOfStudy(), updatedHigherStudies.getStartYear(),
                updatedHigherStudies.getEndYear());
    }

    public void deleteHigherStudies(Integer id) {
        log.info("Deleting higher studies record with ID: {}", id);
        if (!higherStudiesRepository.existsById(id)) {
            throw new RuntimeException("Higher studies record not found with ID: " + id);
        }
        higherStudiesRepository.deleteById(id);
    }
}
