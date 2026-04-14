package com.engineering.alumni.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "employment")
public class Employment {
    public Employment() {}

    public Employment(Integer empId, Alumni alumni, Company company, String position, LocalDate startDate, LocalDate endDate) {
        this.empId = empId;
        this.alumni = alumni;
        this.company = company;
        this.position = position;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "emp_id")
    private Integer empId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "s_id", referencedColumnName = "s_id")
    private Alumni alumni;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", referencedColumnName = "company_id")
    private Company company;

    @Column(name = "position")
    private String position;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    // Getters and setters
    public Integer getEmpId() { return empId; }
    public void setEmpId(Integer empId) { this.empId = empId; }
    public Alumni getAlumni() { return alumni; }
    public void setAlumni(Alumni alumni) { this.alumni = alumni; }
    public Company getCompany() { return company; }
    public void setCompany(Company company) { this.company = company; }
    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }
    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
}
