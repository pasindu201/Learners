package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseDTO {
    private int id;
    private String courseName;
    private String tutorName;
    private String type;
    private String courseDuration;
    private String profilePicture;
    private String minimumAnnualSalary;
    private String jobsAvailable;
    private String yourPreferences;
    private String image;

}
