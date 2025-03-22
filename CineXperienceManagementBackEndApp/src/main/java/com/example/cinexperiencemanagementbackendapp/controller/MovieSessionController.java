package com.example.cinexperiencemanagementbackendapp.controller;

import com.example.cinexperiencemanagementbackendapp.entity.MovieSession;
import com.example.cinexperiencemanagementbackendapp.service.MovieSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
@CrossOrigin(origins="http://localhost:3000")
public class MovieSessionController {
    @Autowired
    private MovieSessionService movieSessionService;

    @PostMapping("/add")
    public MovieSession addSession(@RequestBody MovieSession session){
        return movieSessionService.createSession(session);
    }

    @GetMapping("/movie/{movieId}")
    public List<MovieSession> getSessionsByMovie(@PathVariable int movieId) {
        return movieSessionService.getSessionsForMovie(movieId);
    }
}
