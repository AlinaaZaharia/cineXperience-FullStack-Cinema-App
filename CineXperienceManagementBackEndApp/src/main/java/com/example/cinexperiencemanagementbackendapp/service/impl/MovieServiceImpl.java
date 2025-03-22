package com.example.cinexperiencemanagementbackendapp.service.impl;

import com.example.cinexperiencemanagementbackendapp.entity.Movie;
import com.example.cinexperiencemanagementbackendapp.repository.MovieRepo;
import com.example.cinexperiencemanagementbackendapp.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieServiceImpl implements MovieService {
    @Autowired
    private MovieRepo movieRepo;

    @Override
    public List<Movie> getAllMovies() {
        return movieRepo.findAll();
    }

    @Override
    public Movie insertMovieIntoDatabase(Movie movie) {
        return movieRepo.save(movie);
    }

    @Override
    public Movie getMovieById(int id) {
        return movieRepo.findById(id).get();
    }

    @Override
    public Movie updateMovie(int id, Movie movie) {
        Movie movieFromDB = movieRepo.findById(id).get();
        movieFromDB.setTitle(movie.getTitle());
        movieFromDB.setDescription(movie.getDescription());
        movieFromDB.setGenres(movie.getGenres());
        movieFromDB.setDuration(movie.getDuration());
        movieFromDB.setPosterUrl(movie.getPosterUrl());
        return movieRepo.save(movieFromDB);
    }

    @Override
    public void deleteMovie(int id) {
        movieRepo.deleteById(id);
    }
}
