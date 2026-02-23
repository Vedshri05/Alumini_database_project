package com.alumni.management.mapper;

import com.alumni.management.dto.AlumniRequestDTO;
import com.alumni.management.dto.AlumniResponseDTO;
import com.alumni.management.entity.Alumni;

public class AlumniMapper {

    public static Alumni toEntity(AlumniRequestDTO dto) {
        Alumni alumni = new Alumni();
        alumni.setFirstName(dto.getFirstName());
        alumni.setLastName(dto.getLastName());
        alumni.setEmail(dto.getEmail());
        alumni.setPhone(dto.getPhone());
        alumni.setGraduationYear(dto.getGraduationYear());
        alumni.setDepartment(dto.getDepartment());
        alumni.setCurrentCompany(dto.getCurrentCompany());
        return alumni;
    }

    public static AlumniResponseDTO toDTO(Alumni alumni) {
        AlumniResponseDTO dto = new AlumniResponseDTO();
        dto.setId(alumni.getId());
        dto.setFirstName(alumni.getFirstName());
        dto.setLastName(alumni.getLastName());
        dto.setEmail(alumni.getEmail());
        dto.setPhone(alumni.getPhone());
        dto.setGraduationYear(alumni.getGraduationYear());
        dto.setDepartment(alumni.getDepartment());
        dto.setCurrentCompany(alumni.getCurrentCompany());
        return dto;
    }
}