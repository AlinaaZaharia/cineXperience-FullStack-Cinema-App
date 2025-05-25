package com.example.cinexperiencemanagementbackendapp.service;

import com.example.cinexperiencemanagementbackendapp.entity.MovieSession;
import java.time.LocalDateTime;

import java.util.List;

public interface MovieSessionService {
    MovieSession createSession(MovieSession session);
    List<MovieSession> getSessionsForMovie(int movieId);
    List<MovieSession> getSessionsForMovieInCity(int movieId, Long cityId);
    List<LocalDateTime> getStartTimesForMovie(int movieId);
    List<MovieSession> getSessionsByCity(int cityId);
}
