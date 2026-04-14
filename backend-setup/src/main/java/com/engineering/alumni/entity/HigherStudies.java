package com.engineering.alumni.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "higher_studies")
public class HigherStudies {
    public HigherStudies() {}

    public HigherStudies(Integer hsId, Alumni alumni, String collegeName, String location, String domainOfStudy, Integer startYear, Integer endYear) {
        this.hsId = hsId;
        this.alumni = alumni;
        this.collegeName = collegeName;
        this.location = location;
        this.domainOfStudy = domainOfStudy;
        this.startYear = startYear;
        this.endYear = endYear;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hs_id")
    private Integer hsId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "s_id", referencedColumnName = "s_id")
    private Alumni alumni;

    @Column(name = "college_name")
    private String collegeName;

    @Column(name = "location")
    private String location;

    @Column(name = "domain_of_study")
    private String domainOfStudy;

    @Column(name = "start_year")
    private Integer startYear;

    @Column(name = "end_year")
    private Integer endYear;

    // Getters and setters
    public Integer getHsId() { return hsId; }
    public void setHsId(Integer hsId) { this.hsId = hsId; }
    public Alumni getAlumni() { return alumni; }
    public void setAlumni(Alumni alumni) { this.alumni = alumni; }
    public String getCollegeName() { return collegeName; }
    public void setCollegeName(String collegeName) { this.collegeName = collegeName; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getDomainOfStudy() { return domainOfStudy; }
    public void setDomainOfStudy(String domainOfStudy) { this.domainOfStudy = domainOfStudy; }
    public Integer getStartYear() { return startYear; }
    public void setStartYear(Integer startYear) { this.startYear = startYear; }
    public Integer getEndYear() { return endYear; }
    public void setEndYear(Integer endYear) { this.endYear = endYear; }
}
