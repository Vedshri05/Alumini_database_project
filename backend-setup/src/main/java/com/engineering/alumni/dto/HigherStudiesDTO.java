package com.engineering.alumni.dto;

public class HigherStudiesDTO {
    private Integer hsId;
    private String sId;
    private String collegeName;
    private String location;
    private String domainOfStudy;
    private Integer startYear;
    private Integer endYear;

    public HigherStudiesDTO() {}

    public HigherStudiesDTO(Integer hsId, String sId, String collegeName, String location, String domainOfStudy, Integer startYear, Integer endYear) {
        this.hsId = hsId;
        this.sId = sId;
        this.collegeName = collegeName;
        this.location = location;
        this.domainOfStudy = domainOfStudy;
        this.startYear = startYear;
        this.endYear = endYear;
    }

    public Integer getHsId() { return hsId; }
    public void setHsId(Integer hsId) { this.hsId = hsId; }
    public String getSId() { return sId; }
    public void setSId(String sId) { this.sId = sId; }
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
