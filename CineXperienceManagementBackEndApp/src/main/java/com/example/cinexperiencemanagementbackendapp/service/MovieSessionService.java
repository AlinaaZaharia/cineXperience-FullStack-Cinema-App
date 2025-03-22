package com.example.cinexperiencemanagementbackendapp.service;

import com.example.cinexperiencemanagementbackendapp.entity.MovieSession;

import java.util.List;

public interface MovieSessionService {
    MovieSession createSession(MovieSession session);
    List<MovieSession> getSessionsForMovie(int movieId);
}
