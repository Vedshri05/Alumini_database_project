package com.engineering.alumni.service;

import com.engineering.alumni.entity.MentorshipRequest;
import com.engineering.alumni.repository.MentorshipRequestRepository;
import com.engineering.alumni.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MentorshipService {

    private final MentorshipRequestRepository repo;
    private final UserRepository userRepo;

    public MentorshipService(MentorshipRequestRepository repo, UserRepository userRepo) {
        this.repo = repo;
        this.userRepo = userRepo;
    }

    public MentorshipRequest sendRequest(String studentEmail, String alumniEmail, String message) {
        // Get names — fall back to email prefix if user not found
        String studentName = userRepo.findByEmail(studentEmail)
            .map(u -> u.getName())
            .orElse(studentEmail.split("@")[0]);

        String alumniName = userRepo.findByEmail(alumniEmail)
            .map(u -> u.getName())
            .orElse(alumniEmail.split("@")[0]);

        if (repo.existsByStudentEmailAndAlumniEmailAndStatus(
                studentEmail, alumniEmail, MentorshipRequest.Status.PENDING)) {
            throw new RuntimeException("A pending request already exists for this alumni.");
        }

        var req = new MentorshipRequest();
        req.setStudentEmail(studentEmail);
        req.setAlumniEmail(alumniEmail);
        req.setStudentName(studentName);
        req.setAlumniName(alumniName);
        req.setMessage(message);
        return repo.save(req);
    }

    public MentorshipRequest updateStatus(String id, String status, String scheduledAt) {
        var req = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Request not found"));
        req.setStatus(MentorshipRequest.Status.valueOf(status.toUpperCase()));
        if (scheduledAt != null && !scheduledAt.isEmpty())
            req.setScheduledAt(LocalDateTime.parse(scheduledAt));
        return repo.save(req);
    }

    public List<MentorshipRequest> getByStudent(String email) {
        return repo.findByStudentEmailOrderByCreatedAtDesc(email);
    }

    public List<MentorshipRequest> getByAlumni(String email) {
        return repo.findByAlumniEmailOrderByCreatedAtDesc(email);
    }
}