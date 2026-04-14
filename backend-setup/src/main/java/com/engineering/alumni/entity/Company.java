package com.engineering.alumni.entity;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "company")
public class Company {
    public Company() {}

    public Company(Integer companyId, String companyName, String location) {
        this.companyId = companyId;
        this.companyName = companyName;
        this.location = location;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "company_id")
    private Integer companyId;

    @Column(name = "company_name", nullable = false)
    private String companyName;

    @Column(name = "location")
    private String location;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL)
    private Set<Employment> employments;

    // Getters and setters
    public Integer getCompanyId() { return companyId; }
    public void setCompanyId(Integer companyId) { this.companyId = companyId; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public Set<Employment> getEmployments() { return employments; }
    public void setEmployments(Set<Employment> employments) { this.employments = employments; }
}
