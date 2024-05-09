package com.example.demo.service;

import com.example.demo.dto.CourseContentDTO;
import com.example.demo.dto.CourseDTO;
import com.example.demo.dto.VideoDTO;
import com.example.demo.entity.CourseEntity;
import com.example.demo.entity.VideoEntity;
import com.example.demo.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private VideoService videoService;

    public List<CourseDTO> getAllCourses() {
        // Use the repository's findAll() method to fetch all WorkoutDescriptionEntity entities
        List<CourseEntity> courseEntities = courseRepository.findAll();
        int length = courseEntities.size();
        List<CourseDTO> courseDTOS = new ArrayList<>(length);
        for (CourseEntity course : courseEntities) {
            CourseDTO courseDTO = new CourseDTO();
            courseDTO.setId(course.getId());
            courseDTO.setCourseName(course.getCourseName());
            courseDTO.setTutorName(course.getTutorName());
            courseDTO.setCourseDuration(course.getCourseDuration());
            courseDTO.setType(course.getType());
            courseDTO.setJobsAvailable(course.getJobsAvailable());
            courseDTO.setMinimumAnnualSalary(course.getMinimumAnnualSalary());
            courseDTO.setYourPreferences(course.getYourPreferences());

            String image = encodeToString(course.getImage());
            String profilePicture = encodeToString(course.getProfilePicture());

            courseDTO.setImage(image);
            courseDTO.setProfilePicture(profilePicture);
            courseDTOS.add(courseDTO);
        }
        return courseDTOS;
    }

    private String encodeToString(Blob image) {
        try {
            byte[] imgBytes = image.getBytes(1, (int) image.length());
            return Base64.getEncoder().encodeToString(imgBytes);
        } catch (Exception e) {
            return null;
        }
    }

    public CourseContentDTO getCourseContent(int courseId) {
        List<CourseEntity> courseEntities = courseRepository.findByCourseId(courseId);
        CourseEntity courseEntity = courseEntities.get(0);
        String course = courseEntity.getCourseName();
        List<VideoEntity> videoLectures = videoService.getVideosByCourse(course);
        int length = videoLectures.size();
        List<VideoDTO> allVideos = new ArrayList<>(length);

        for (VideoEntity video : videoLectures) {
            VideoDTO videoDTO = new VideoDTO();

            videoDTO.setLecture(video.getLecture());
            String videoString = encodeToString(video.getVideo());
            videoDTO.setVideo(videoString);
            videoDTO.setId(video.getId());

            allVideos.add(videoDTO);
        }
        CourseContentDTO courseContentDTO = new CourseContentDTO();
        courseContentDTO.setVideoList(allVideos);

        courseContentDTO.setCourseName(courseEntity.getCourseName());
        courseContentDTO.setCourseDuration(courseEntity.getCourseDuration());
        courseContentDTO.setDescription(courseEntity.getDescription());
        courseContentDTO.setTutorName(courseEntity.getTutorName());
        String profileString = encodeToString(courseEntity.getProfilePicture());
        courseContentDTO.setProfilePicture(profileString);
        String imageStr = encodeToString(courseEntity.getImage());
        courseContentDTO.setImage(imageStr);
        courseContentDTO.setJobsAvailable(courseEntity.getJobsAvailable());
        courseContentDTO.setYourPreferences(courseEntity.getYourPreferences());
        courseContentDTO.setMinimumAnnualSalary(courseEntity.getMinimumAnnualSalary());
        return courseContentDTO;
    }

    public void saveCourse(CourseEntity course) {
        courseRepository.save(course);
    }

    public void deleteCourse(int id) {
        courseRepository.deleteById(id);
    }

    public void updateDescription(int id, String newDescription) {
        Optional<CourseEntity> optionalPost = courseRepository.findById(id);
        if (optionalPost.isPresent()) {
            CourseEntity post = optionalPost.get();
            post.setDescription(newDescription);
            courseRepository.save(post);
        }
    }
}
