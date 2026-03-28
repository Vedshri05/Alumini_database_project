package com.engineering.alumni.repository;
import com.engineering.alumni.entity.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface JobPostRepository extends JpaRepository<JobPost, String> {
    List<JobPost> findAllByOrderByCreatedAtDesc();
    List<JobPost> findByAlumniEmailOrderByCreatedAtDesc(String email);
}