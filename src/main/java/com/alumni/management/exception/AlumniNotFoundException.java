package com.alumni.management.exception;

public class AlumniNotFoundException extends RuntimeException {

    public AlumniNotFoundException(String message) {
        super(message);
    }
}