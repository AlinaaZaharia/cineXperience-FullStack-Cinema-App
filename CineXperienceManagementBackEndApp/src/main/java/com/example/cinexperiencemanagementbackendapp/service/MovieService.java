package com.example.cinexperiencemanagementbackendapp.service;
import com.example.cinexperiencemanagementbackendapp.entity.Movie;

import java.util.List;

public interface MovieService {
    List<Movie> getAllMovies();

    Movie insertMovieIntoDatabase(Movie movie);

    Movie getMovieById(int id);

    Movie updateMovie(int id, Movie movie);

     void deleteMovie(int id);

}
