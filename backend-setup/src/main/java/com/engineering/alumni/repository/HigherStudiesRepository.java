package com.engineering.alumni.repository;

import com.engineering.alumni.entity.HigherStudies;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HigherStudiesRepository extends JpaRepository<HigherStudies, Integer> {
    @Query("SELECT hs FROM HigherStudies hs WHERE hs.alumni.sId = :sId")
    List<HigherStudies> findBySId(@Param("sId") String sId);
}
