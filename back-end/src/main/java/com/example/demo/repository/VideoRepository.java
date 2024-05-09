package com.example.demo.repository;

import com.example.demo.entity.VideoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoRepository extends JpaRepository<VideoEntity, Integer> {

    @Query("SELECT u FROM VideoEntity u WHERE u.course = :course")
    List<VideoEntity> findByCourse(String course);
}
