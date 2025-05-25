package com.example.cinexperiencemanagementbackendapp.controller;

import com.example.cinexperiencemanagementbackendapp.entity.MovieSession;
import com.example.cinexperiencemanagementbackendapp.service.MovieSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
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

    @GetMapping("/viewsession/{movieId}")
    public List<MovieSession> getSessionsByMovie(@PathVariable int movieId) {
        return movieSessionService.getSessionsForMovie(movieId);
    }

    @GetMapping("/viewsession/{movieId}/{cityId}")
    public List<MovieSession> getSessionsByMovieAndCity(@PathVariable int movieId, @PathVariable Long cityId) {
        return movieSessionService.getSessionsForMovieInCity(movieId, cityId);
    }

    @GetMapping("/movie-times/{movieId}")
    public List<LocalDateTime> getAllTimesForMovie(@PathVariable int movieId) {
        return movieSessionService.getStartTimesForMovie(movieId);
    }

    @GetMapping("/by-city/{cityId}")
    public List<MovieSession> getSessionsByCity(@PathVariable int cityId) {
        return movieSessionService.getSessionsByCity(cityId); // <- aici era problema
    }


}
