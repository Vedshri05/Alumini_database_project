package com.engineering.alumni.repository;

import com.engineering.alumni.entity.Alumni;
import com.engineering.alumni.entity.EngineeringBranch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AlumniRepository extends JpaRepository<Alumni, String> {
    
    // Find by email
    Optional<Alumni> findByEmail(String email);
    
    // Find by branch
    List<Alumni> findByBranch(EngineeringBranch branch);
    
    // Find by graduation year
    List<Alumni> findByGraduationYear(Integer year);
    
    // Get alumni by branch and year
    List<Alumni> findByBranchAndGraduationYear(EngineeringBranch branch, Integer year);
    
    // Custom query: Get alumni count by branch
    @Query("SELECT a.branch, COUNT(a) FROM Alumni a GROUP BY a.branch")
    List<Object[]> getAlumniCountByBranch();
    
    // Custom query: Get alumni count by year
    @Query("SELECT a.graduationYear, COUNT(a) FROM Alumni a GROUP BY a.graduationYear ORDER BY a.graduationYear DESC")
    List<Object[]> getAlumniCountByYear();
    
    // Search alumni by name or email
    @Query("SELECT a FROM Alumni a WHERE " +
           "LOWER(a.sName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(a.email) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Alumni> searchAlumni(@Param("searchTerm") String searchTerm);
    
    // Count alumni by branch
    Long countByBranch(EngineeringBranch branch);
}
