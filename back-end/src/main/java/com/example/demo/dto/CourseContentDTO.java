package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseContentDTO {
    private String description;
    private String courseName;
    private String tutorName;
    private String courseDuration;
    private String profilePicture;
    private String minimumAnnualSalary;
    private String jobsAvailable;
    private String yourPreferences;
    private String image;
    private List<VideoDTO> videoList;
}
