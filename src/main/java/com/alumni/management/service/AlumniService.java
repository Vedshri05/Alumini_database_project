package com.alumni.management.service;

import com.alumni.management.entity.Alumni;
import java.util.List;

public interface AlumniService {

    Alumni createAlumni(Alumni alumni);

    List<Alumni> getAllAlumni();

    Alumni getAlumniById(Long id);

    Alumni updateAlumni(Long id, Alumni alumni);

    void deleteAlumni(Long id);
}