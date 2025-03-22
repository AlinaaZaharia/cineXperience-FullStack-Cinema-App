package com.example.cinexperiencemanagementbackendapp.controller;

import com.example.cinexperiencemanagementbackendapp.entity.Movie;
import com.example.cinexperiencemanagementbackendapp.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/cinema")
public class MovieController {
    @Autowired
    private MovieService movieService;

    @GetMapping("/all")
    public List<Movie> getAllMoviesController() {
        return movieService.getAllMovies();
    }

    @PostMapping("/insert")
    public Movie insertMovieInDb(@RequestBody Movie movie){
        return movieService.insertMovieIntoDatabase(movie);
    }

    @GetMapping("/viewmovie/{id}")
    public Movie getMovieByIdController(@PathVariable("id") int id){
        return movieService.getMovieById(id);
    }

    @PutMapping("/updatemovie/{id}")
    Movie updateMovieById(@PathVariable int id, @RequestBody Movie movie) {
        return movieService.updateMovie(id, movie);
    }

    @DeleteMapping("/deletemovie/{id}")
    void deleteMovieById(@PathVariable int id) {
        movieService.deleteMovie(id);
    }

}
