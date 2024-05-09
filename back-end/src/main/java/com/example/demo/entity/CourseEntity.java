package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Blob;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="courses")
public class CourseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String courseName;
    private String tutorName;
    private String type;
    private String description;
    @Lob
    private Blob profilePicture;
    @Lob
    private Blob image;
    private String courseDuration;
    private String minimumAnnualSalary;
    private String jobsAvailable;
    private String yourPreferences;
}
