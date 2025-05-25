package com.example.cinexperiencemanagementbackendapp.repository;

import com.example.cinexperiencemanagementbackendapp.entity.MovieSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MovieSessionRepo extends JpaRepository<MovieSession, Long> {
    List<MovieSession> findByMovieId(int movieId);

    @Query("SELECT ms FROM MovieSession ms WHERE ms.movie.id = :movieId")
    List<MovieSession> findSessionsByMovieId(@Param("movieId") int movieId);

    @Query("SELECT ms FROM MovieSession ms WHERE ms.movie.id = :movieId AND ms.city.id = :cityId")
    List<MovieSession> findByMovieIdAndCityId(@Param("movieId") int movieId, @Param("cityId") Long cityId);

    List<MovieSession> findByCityId(int cityId);
}
