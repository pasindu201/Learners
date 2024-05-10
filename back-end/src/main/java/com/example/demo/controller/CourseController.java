package com.example.demo.controller;

import com.example.demo.dto.CourseContentDTO;
import com.example.demo.dto.CourseDTO;
import com.example.demo.entity.CourseEntity;
import com.example.demo.entity.VideoEntity;
import com.example.demo.service.VideoService;
import com.example.demo.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.sql.Blob;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/courses")
public class CourseController
{

    @Autowired
    private VideoService videoService;

    @Autowired
    private CourseService courseService;

    // Endpoint to save a set of exercises (a workout plan) to the database
    @PostMapping("/saveVideo")
    public ResponseEntity<String> saveVideo(
            @RequestParam("course") String course,
            @RequestParam("lecture") String lecture,
            @RequestParam("video") MultipartFile video) {

        VideoEntity exercise = new VideoEntity();
        exercise.setCourse(course);
        exercise.setLecture(lecture);

        try {
            // Handle image upload
            byte[] videoBytes = video.getBytes();
            Blob blobVideo = new javax.sql.rowset.serial.SerialBlob(videoBytes);
            exercise.setVideo(blobVideo);

            // Save the exercise
            videoService.saveVideo(exercise);

            // Return a successful response
            return ResponseEntity.status(HttpStatus.CREATED).body("Exercise saved successfully.");
        } catch (Exception e) {
            // Handle potential exceptions and return an appropriate error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to save exercise: " + e.getMessage());
        }
    }

    @PostMapping("/saveCourse")
    public ResponseEntity<String> saveCourse(@RequestParam("courseName") String courseName,
                                             @RequestParam("tutorName") String tutorName,
                                             @RequestParam("type") String type,
                                             @RequestParam("description") String description,
                                             @RequestParam("profilePicture") MultipartFile profilePicture,
                                             @RequestParam("image") MultipartFile image,
                                             @RequestParam("courseDuration") String courseDuration,
                                             @RequestParam("minimumAnnualSalary") String minimumAnnualSalary,
                                             @RequestParam("jobsAvailable") String jobsAvailable,
                                             @RequestParam("yourPreferences") String yourPreferences) {
        try {
            // Create a new CourseEntity
            CourseEntity courseEntity = new CourseEntity();
            courseEntity.setCourseName(courseName);
            courseEntity.setTutorName(tutorName);
            courseEntity.setType(type);
            courseEntity.setDescription(description);
            courseEntity.setCourseDuration(courseDuration);
            courseEntity.setMinimumAnnualSalary(minimumAnnualSalary);
            courseEntity.setJobsAvailable(jobsAvailable);
            courseEntity.setYourPreferences(yourPreferences);

            // Convert the profile picture and image to byte[] and set them in the entity
            if (!profilePicture.isEmpty()) {
                Blob blobProfilePicture = new SerialBlob(profilePicture.getBytes());
                courseEntity.setProfilePicture(blobProfilePicture);
            }

            if (!image.isEmpty()) {
                Blob blobImage = new SerialBlob(image.getBytes());
                courseEntity.setImage(blobImage);
            }

            // Save the course entity using your repository
            courseService.saveCourse(courseEntity);

            // Return a success response
            return ResponseEntity.status(HttpStatus.CREATED).body("Course saved successfully.");
        } catch (Exception e) {
            // Handle potential IO exceptions during file upload
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Failed to save course: Error reading file data.");
        }
    }


    // Endpoint to get a workout plan by name
    @GetMapping("/allCourses")
    public ResponseEntity<List<CourseDTO>> getAllWorkoutPlans() {
        List<CourseDTO> workOutPlans = courseService.getAllCourses();
        return ResponseEntity.ok(workOutPlans);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable("id") int id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("descriptionUpdate/{id}/{description}")
    public ResponseEntity<String> updateDescription(@PathVariable("id") int id,
                                                    @PathVariable("description") String newDescription) {
        courseService.updateDescription(id, newDescription);
        return ResponseEntity.ok("Successfully updated video");
    }

    @GetMapping("getContent/{courseId}")
    public ResponseEntity<CourseContentDTO> getCourseContent(@PathVariable("courseId") int courseId){
        CourseContentDTO courseContentDTO = courseService.getCourseContent(courseId);
        return ResponseEntity.ok(courseContentDTO);
    }
}