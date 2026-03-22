package com.engineering.alumni.dto;

import java.util.Map;

public class AlumniStatisticsDTO {
    private Long totalAlumni;
    private Map<String, Long> branchBreakdown;
    private Map<String, Long> yearBreakdown;

    public AlumniStatisticsDTO() {
    }

    public AlumniStatisticsDTO(Long totalAlumni, Map<String, Long> branchBreakdown, Map<String, Long> yearBreakdown) {
        this.totalAlumni = totalAlumni;
        this.branchBreakdown = branchBreakdown;
        this.yearBreakdown = yearBreakdown;
    }

    public Long getTotalAlumni() {
        return totalAlumni;
    }

    public void setTotalAlumni(Long totalAlumni) {
        this.totalAlumni = totalAlumni;
    }

    public Map<String, Long> getBranchBreakdown() {
        return branchBreakdown;
    }

    public void setBranchBreakdown(Map<String, Long> branchBreakdown) {
        this.branchBreakdown = branchBreakdown;
    }

    public Map<String, Long> getYearBreakdown() {
        return yearBreakdown;
    }

    public void setYearBreakdown(Map<String, Long> yearBreakdown) {
        this.yearBreakdown = yearBreakdown;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long totalAlumni;
        private Map<String, Long> branchBreakdown;
        private Map<String, Long> yearBreakdown;

        public Builder totalAlumni(Long totalAlumni) {
            this.totalAlumni = totalAlumni;
            return this;
        }

        public Builder branchBreakdown(Map<String, Long> branchBreakdown) {
            this.branchBreakdown = branchBreakdown;
            return this;
        }

        public Builder yearBreakdown(Map<String, Long> yearBreakdown) {
            this.yearBreakdown = yearBreakdown;
            return this;
        }

        public AlumniStatisticsDTO build() {
            return new AlumniStatisticsDTO(totalAlumni, branchBreakdown, yearBreakdown);
        }
    }
}
