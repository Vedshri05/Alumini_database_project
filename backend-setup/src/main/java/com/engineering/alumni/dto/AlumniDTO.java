package com.engineering.alumni.dto;

import com.engineering.alumni.entity.Alumni;
import com.engineering.alumni.entity.EngineeringBranch;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public class AlumniDTO {
    @JsonProperty("sId")
    private String sId;

    @NotBlank(message = "Name is required")
    @JsonProperty("sName")
    private String sName;

    private String email;

    @JsonProperty("phoneNo")
    private String phoneNo;

    private Integer graduationYear;

    private EngineeringBranch branch;

    @JsonProperty("linkedinProfile")
    private String linkedinProfile;
    
    private String gender;
    
    @JsonProperty("employment")
    private List<EmploymentDTO> employment;
    
    @JsonProperty("higherStudies")
    private List<HigherStudiesDTO> higherStudies;

    public AlumniDTO() {
    }

    public AlumniDTO(String sId, String sName, String email, String phoneNo, Integer graduationYear,
            EngineeringBranch branch, String linkedinProfile, String gender) {
        this.sId = sId;
        this.sName = sName;
        this.email = email;
        this.phoneNo = phoneNo;
        this.graduationYear = graduationYear;
        this.branch = branch;
        this.linkedinProfile = linkedinProfile;
        this.gender = gender;
        this.employment = null;
        this.higherStudies = null;
    }

    // Getters and Setters
    public String getSId() {
        return sId;
    }

    public void setSId(String sId) {
        this.sId = sId;
    }

    public String getSName() {
        return sName;
    }

    public void setSName(String sName) {
        this.sName = sName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public Integer getGraduationYear() {
        return graduationYear;
    }

    public void setGraduationYear(Integer graduationYear) {
        this.graduationYear = graduationYear;
    }

    public EngineeringBranch getBranch() {
        return branch;
    }

    public void setBranch(EngineeringBranch branch) {
        this.branch = branch;
    }

    public String getLinkedinProfile() {
        return linkedinProfile;
    }

    public void setLinkedinProfile(String linkedinProfile) {
        this.linkedinProfile = linkedinProfile;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
    
    public List<EmploymentDTO> getEmployment() {
        return employment;
    }
    
    public void setEmployment(List<EmploymentDTO> employment) {
        this.employment = employment;
    }
    
    public List<HigherStudiesDTO> getHigherStudies() {
        return higherStudies;
    }
    
    public void setHigherStudies(List<HigherStudiesDTO> higherStudies) {
        this.higherStudies = higherStudies;
    }

    // Manual builder
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String sId;
        private String sName;
        private String email;
        private String phoneNo;
        private Integer graduationYear;
        private EngineeringBranch branch;
        private String linkedinProfile;
        private String gender;
        private List<EmploymentDTO> employment;
        private List<HigherStudiesDTO> higherStudies;

        public Builder sId(String sId) {
            this.sId = sId;
            return this;
        }

        public Builder sName(String sName) {
            this.sName = sName;
            return this;
        }

        public Builder email(String email) {
            this.email = email;
            return this;
        }

        public Builder phoneNo(String phoneNo) {
            this.phoneNo = phoneNo;
            return this;
        }

        public Builder graduationYear(Integer graduationYear) {
            this.graduationYear = graduationYear;
            return this;
        }

        public Builder branch(EngineeringBranch branch) {
            this.branch = branch;
            return this;
        }

        public Builder linkedinProfile(String linkedinProfile) {
            this.linkedinProfile = linkedinProfile;
            return this;
        }

        public Builder gender(String gender) {
            this.gender = gender;
            return this;
        }
        
        public Builder employment(List<EmploymentDTO> employment) {
            this.employment = employment;
            return this;
        }
        
        public Builder higherStudies(List<HigherStudiesDTO> higherStudies) {
            this.higherStudies = higherStudies;
            return this;
        }

        public AlumniDTO build() {
            AlumniDTO dto = new AlumniDTO(sId, sName, email, phoneNo, graduationYear, branch, linkedinProfile, gender);
            dto.employment = this.employment;
            dto.higherStudies = this.higherStudies;
            return dto;
        }
    }

    // Convert DTO to Entity
    public Alumni toEntity() {
        return Alumni.builder()
                .sId(this.sId)
                .sName(this.sName)
                .email(this.email)
                .phoneNo(this.phoneNo)
                .graduationYear(this.graduationYear)
                .branch(this.branch)
                .linkedinProfile(this.linkedinProfile)
                .gender(this.gender)
                .build();
    }

    // Convert Entity to DTO
    public static AlumniDTO fromEntity(Alumni alumni) {
        List<EmploymentDTO> employmentDTOs = null;
        if (alumni.getEmployments() != null && !alumni.getEmployments().isEmpty()) {
            employmentDTOs = alumni.getEmployments().stream()
                    .map(emp -> new EmploymentDTO(
                            emp.getEmpId(),
                            emp.getAlumni().getSId(),
                            emp.getCompany() != null ? emp.getCompany().getCompanyId() : null,
                            emp.getCompany() != null ? emp.getCompany().getCompanyName() : null,
                            emp.getCompany() != null ? emp.getCompany().getLocation() : null,
                            emp.getPosition(),
                            emp.getStartDate(),
                            emp.getEndDate()
                    ))
                    .toList();
        }
        
        List<HigherStudiesDTO> higherStudiesDTOs = null;
        if (alumni.getHigherStudies() != null && !alumni.getHigherStudies().isEmpty()) {
            higherStudiesDTOs = alumni.getHigherStudies().stream()
                    .map(hs -> new HigherStudiesDTO(
                            hs.getHsId(),
                            hs.getAlumni().getSId(),
                            hs.getCollegeName(),
                            hs.getLocation(),
                            hs.getDomainOfStudy(),
                            hs.getStartYear(),
                            hs.getEndYear()
                    ))
                    .toList();
        }
        
        return AlumniDTO.builder()
                .sId(alumni.getSId())
                .sName(alumni.getSName())
                .email(alumni.getEmail())
                .phoneNo(alumni.getPhoneNo())
                .graduationYear(alumni.getGraduationYear())
                .branch(alumni.getBranch())
                .linkedinProfile(alumni.getLinkedinProfile())
                .gender(alumni.getGender())
                .employment(employmentDTOs)
                .higherStudies(higherStudiesDTOs)
                .build();
    }
}
