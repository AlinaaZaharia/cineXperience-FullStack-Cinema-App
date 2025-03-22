package com.example.cinexperiencemanagementbackendapp.repository;

import com.example.cinexperiencemanagementbackendapp.entity.MovieSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovieSessionRepo extends JpaRepository<MovieSession, Long> {
    List<MovieSession> findByMovieId(int movieId);
}
