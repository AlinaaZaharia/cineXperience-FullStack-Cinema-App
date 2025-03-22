package com.example.cinexperiencemanagementbackendapp.repository;

import com.example.cinexperiencemanagementbackendapp.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepo extends JpaRepository<Movie, Integer> {
}
