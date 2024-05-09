package com.example.demo.service;

import com.example.demo.entity.VideoEntity;
import com.example.demo.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VideoService {

    @Autowired
    private VideoRepository videoRepository;

    // Method to save a set of video lectures to the database
    public void saveVideo(VideoEntity video) {
        videoRepository.save(video);
    }

    // Method to get all exercises by workout plan
    public List<VideoEntity> getVideosByCourse(String course) {
        return videoRepository.findByCourse(course);
    }

}