package com.alumni.management.specification;

import com.alumni.management.entity.Alumni;
import org.springframework.data.jpa.domain.Specification;

public class AlumniSpecification {

    public static Specification<Alumni> hasFirstName(String firstName) {
        return (root, query, cb) -> firstName == null ? null
                : cb.like(cb.lower(root.get("firstName")),
                        "%" + firstName.toLowerCase() + "%");
    }

    public static Specification<Alumni> hasEmail(String email) {
        return (root, query, cb) -> email == null ? null
                : cb.like(cb.lower(root.get("email")),
                        "%" + email.toLowerCase() + "%");
    }

    public static Specification<Alumni> hasDepartment(String department) {
        return (root, query, cb) -> department == null ? null : cb.equal(root.get("department"), department);
    }

    public static Specification<Alumni> hasGraduationYear(Integer year) {
        return (root, query, cb) -> year == null ? null : cb.equal(root.get("graduationYear"), year);
    }
}