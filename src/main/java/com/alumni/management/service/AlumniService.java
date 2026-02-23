
package com.alumni.management.service;

import com.alumni.management.dto.AlumniRequestDTO;
import com.alumni.management.dto.AlumniResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AlumniService {

    AlumniResponseDTO createAlumni(AlumniRequestDTO dto);

    Page<AlumniResponseDTO> getAllAlumni(Pageable pageable);

    Page<AlumniResponseDTO> searchAlumni(
            String firstName,
            String email,
            String department,
            Integer graduationYear,
            Pageable pageable);

    AlumniResponseDTO getAlumniById(Long id);

    AlumniResponseDTO updateAlumni(Long id, AlumniRequestDTO dto);

    void deleteAlumni(Long id);
}