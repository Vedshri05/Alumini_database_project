package com.engineering.alumni.service;
import com.engineering.alumni.entity.JobPost;
import com.engineering.alumni.repository.JobPostRepository;
import com.engineering.alumni.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class JobService {
    private final JobPostRepository repo;
    private final UserRepository userRepo;
    public JobService(JobPostRepository repo, UserRepository userRepo) { this.repo = repo; this.userRepo = userRepo; }
    public JobPost create(String alumniEmail, JobPost post) {
        var alumni = userRepo.findByEmail(alumniEmail).orElseThrow(() -> new RuntimeException("Alumni not found"));
        post.setAlumniEmail(alumniEmail);
        post.setAlumniName(alumni.getName());
        return repo.save(post);
    }
    public List<JobPost> getAll() { return repo.findAllByOrderByCreatedAtDesc(); }
    public List<JobPost> getByAlumni(String email) { return repo.findByAlumniEmailOrderByCreatedAtDesc(email); }
    public JobPost apply(String jobId, String studentEmail) {
        var job = repo.findById(jobId).orElseThrow(() -> new RuntimeException("Job not found"));
        if (!job.getApplicants().contains(studentEmail)) job.getApplicants().add(studentEmail);
        return repo.save(job);
    }
}