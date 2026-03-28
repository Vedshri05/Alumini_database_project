package com.engineering.alumni.repository;
import com.engineering.alumni.entity.MentorshipRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface MentorshipRequestRepository extends JpaRepository<MentorshipRequest, String> {
    List<MentorshipRequest> findByStudentEmailOrderByCreatedAtDesc(String email);
    List<MentorshipRequest> findByAlumniEmailOrderByCreatedAtDesc(String email);
    boolean existsByStudentEmailAndAlumniEmailAndStatus(String s, String a, MentorshipRequest.Status status);
}