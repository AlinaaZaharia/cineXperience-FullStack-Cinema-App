package com.example.cinexperiencemanagementbackendapp.controller;

import com.example.cinexperiencemanagementbackendapp.entity.MovieSession;
import com.example.cinexperiencemanagementbackendapp.repository.MovieRepo;
import com.example.cinexperiencemanagementbackendapp.repository.MovieSessionRepo;
import com.example.cinexperiencemanagementbackendapp.service.MovieSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sessions")
@CrossOrigin(origins="http://localhost:3000")
public class MovieSessionController {
    @Autowired
    private MovieSessionService movieSessionService;

    @Autowired
    private MovieSessionRepo sessionRepo;

    @PostMapping("/add")
    public MovieSession addSession(@RequestBody MovieSession session) {
        return sessionRepo.save(session);
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
        return movieSessionService.getSessionsByCity(cityId);
    }

    @GetMapping("/{sessionId}/city/{cityId}")
    public ResponseEntity<MovieSession> getSessionByIdAndCity(@PathVariable int sessionId, @PathVariable int cityId) {
        Optional<MovieSession> sessionOpt = sessionRepo.findByIdAndCityId(sessionId, cityId);
        return sessionOpt.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<MovieSession> updateSession(@PathVariable int id, @RequestBody MovieSession session) {
        return sessionRepo.findById((long) id).map(existing -> {
            existing.setStartTime(session.getStartTime());
            existing.setHallName(session.getHallName());
            return ResponseEntity.ok(sessionRepo.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteSession(@PathVariable int id) {
        sessionRepo.deleteById((long) id);
        return ResponseEntity.noContent().build();
    }



}
