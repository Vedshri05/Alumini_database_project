package com.engineering.alumni.entity;

public enum EngineeringBranch {
    CS("Computer Science"),
    IT("Information Technology"),
    ENTC("Electronics & Telecommunication"),
    ECE("Electronics & Communication Engineering"),
    AIDS("Artificial Intelligence & Data Science");

    private final String fullName;

    EngineeringBranch(String fullName) {
        this.fullName = fullName;
    }

    public String getFullName() {
        return fullName;
    }
}
