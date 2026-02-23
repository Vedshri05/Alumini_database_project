package com.alumni.management.service;

import com.alumni.management.entity.Alumni;
import com.alumni.management.exception.AlumniNotFoundException;
import com.alumni.management.repository.AlumniRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlumniServiceImpl implements AlumniService {

    @Autowired
    private AlumniRepository alumniRepository;

    @Override
    public Alumni createAlumni(Alumni alumni) {
        return alumniRepository.save(alumni);
    }

    @Override
    public List<Alumni> getAllAlumni() {
        return alumniRepository.findAll();
    }

    @Override
    public Alumni getAlumniById(Long id) {
        return alumniRepository.findById(id)
                .orElseThrow(() -> new AlumniNotFoundException("Alumni with id " + id + " not found"));
    }

    @Override
    public Alumni updateAlumni(Long id, Alumni updatedAlumni) {

        Alumni alumni = alumniRepository.findById(id)
                .orElseThrow(() -> new AlumniNotFoundException("Alumni with id " + id + " not found"));

        alumni.setFirstName(updatedAlumni.getFirstName());
        alumni.setLastName(updatedAlumni.getLastName());
        alumni.setEmail(updatedAlumni.getEmail());
        alumni.setPhone(updatedAlumni.getPhone());
        alumni.setGraduationYear(updatedAlumni.getGraduationYear());
        alumni.setDepartment(updatedAlumni.getDepartment());
        alumni.setCurrentCompany(updatedAlumni.getCurrentCompany());

        return alumniRepository.save(alumni);
    }

    @Override
    public void deleteAlumni(Long id) {

        if (!alumniRepository.existsById(id)) {
            throw new AlumniNotFoundException("Alumni with id " + id + " not found");
        }

        alumniRepository.deleteById(id);
    }
}