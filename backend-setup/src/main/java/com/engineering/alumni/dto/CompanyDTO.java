package com.engineering.alumni.dto;

public class CompanyDTO {
    private Integer companyId;
    private String companyName;
    private String location;

    public CompanyDTO() {}

    public CompanyDTO(Integer companyId, String companyName, String location) {
        this.companyId = companyId;
        this.companyName = companyName;
        this.location = location;
    }

    public Integer getCompanyId() { return companyId; }
    public void setCompanyId(Integer companyId) { this.companyId = companyId; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
}
