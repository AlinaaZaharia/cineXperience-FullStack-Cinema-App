package com.example.cinexperiencemanagementbackendapp.controller;

import com.example.cinexperiencemanagementbackendapp.entity.Movie;
import com.example.cinexperiencemanagementbackendapp.entity.User;
import com.example.cinexperiencemanagementbackendapp.repository.UserRepo;
import com.example.cinexperiencemanagementbackendapp.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/cinema")
public class MovieController {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private MovieService movieService;

    @GetMapping("/all")
    public List<Movie> getAllMoviesController() {
        return movieService.getAllMovies();
    }

    @PostMapping("/insert")
    public Movie insertMovieInDb(@RequestBody Movie movie, @RequestParam("userId") Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getRole().toString().equals("ADMIN")) {
            throw new RuntimeException("Unauthorized: only admins can insert movies.");
        }

        return movieService.insertMovieIntoDatabase(movie);
    }

    @PutMapping("/updatemovie/{id}")
    public Movie updateMovieById(@PathVariable int id, @RequestBody Movie movie, @RequestParam("userId") Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getRole().toString().equals("ADMIN")) {
            throw new RuntimeException("Unauthorized: only admins can update movies.");
        }

        return movieService.updateMovie(id, movie);
    }

    @DeleteMapping("/deletemovie/{id}")
    public void deleteMovieById(@PathVariable int id, @RequestParam("userId") Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getRole().toString().equals("ADMIN")) {
            throw new RuntimeException("Unauthorized: only admins can delete movies.");
        }

        movieService.deleteMovie(id);
    }

    @GetMapping("/viewmovie/{id}")
    public Movie getMovieByIdController(@PathVariable("id") int id){
        return movieService.getMovieById(id);
    }

}
