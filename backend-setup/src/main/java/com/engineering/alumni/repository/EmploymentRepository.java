package com.engineering.alumni.repository;

import com.engineering.alumni.entity.Employment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmploymentRepository extends JpaRepository<Employment, Integer> {
    @Query("SELECT e FROM Employment e WHERE e.alumni.sId = :sId ORDER BY e.startDate DESC")
    List<Employment> findByAlumniSIdOrderByStartDateDesc(@Param("sId") String sId);
    
    @Query("SELECT e FROM Employment e WHERE e.company.companyId = :companyId")
    List<Employment> findByCompanyId(@Param("companyId") Integer companyId);
}
