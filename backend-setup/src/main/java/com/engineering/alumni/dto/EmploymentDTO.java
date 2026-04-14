package com.engineering.alumni.dto;

import java.time.LocalDate;

public class EmploymentDTO {
    private Integer empId;
    private String sId;
    private Integer companyId;
    private String companyName;
    private String companyLocation;
    private String position;
    private LocalDate startDate;
    private LocalDate endDate;

    public EmploymentDTO() {}

    public EmploymentDTO(Integer empId, String sId, Integer companyId, String companyName, String companyLocation, String position, LocalDate startDate, LocalDate endDate) {
        this.empId = empId;
        this.sId = sId;
        this.companyId = companyId;
        this.companyName = companyName;
        this.companyLocation = companyLocation;
        this.position = position;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Integer getEmpId() { return empId; }
    public void setEmpId(Integer empId) { this.empId = empId; }
    public String getSId() { return sId; }
    public void setSId(String sId) { this.sId = sId; }
    public Integer getCompanyId() { return companyId; }
    public void setCompanyId(Integer companyId) { this.companyId = companyId; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public String getCompanyLocation() { return companyLocation; }
    public void setCompanyLocation(String companyLocation) { this.companyLocation = companyLocation; }
    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }
    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
}
