package com.example.cinexperiencemanagementbackendapp.service.impl;

import com.example.cinexperiencemanagementbackendapp.entity.Movie;
import com.example.cinexperiencemanagementbackendapp.entity.MovieSession;
import com.example.cinexperiencemanagementbackendapp.entity.Seat;
import com.example.cinexperiencemanagementbackendapp.repository.MovieRepo;
import com.example.cinexperiencemanagementbackendapp.repository.MovieSessionRepo;
import com.example.cinexperiencemanagementbackendapp.service.MovieSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class MovieSessionServiceImpl implements MovieSessionService {

    @Autowired
    private MovieSessionRepo sessionRepo;

    @Autowired
    private MovieRepo movieRepo;

    @Override
    public MovieSession createSession(MovieSession session) {

        Movie movie = movieRepo.findById(session.getMovie().getId()).orElseThrow(() -> new RuntimeException("Movie not found with ID: " + session.getMovie().getId()));
        session.setMovie(movie);
        MovieSession savedSession = sessionRepo.save(session);

        if(session.getSeats() == null || session.getSeats().isEmpty()){
            List<Seat> generatedSeats = new ArrayList<>();
            for(int row=1; row<=6; row++){
                for(int num=1; num<=6; num++){
                    Seat seat = new Seat();
                    seat.setRoww(row);
                    seat.setNumber(num);
                    seat.setReserved(false);
                    seat.setSession(savedSession);
                    generatedSeats.add(seat);
                }
            }
            session.setSeats(generatedSeats);
        }
        return sessionRepo.save(savedSession);
    }

    @Override
    public List<MovieSession> getSessionsForMovie(int movieId) {
        List<MovieSession> sessions = sessionRepo.findSessionsByMovieId(movieId);
        if(sessions.isEmpty()) {
            System.out.println("Nu s-au gasit sesiuni pentru filmul cu ID-ul: "+movieId);
        }
        return sessions;
    }

    @Override
    public List<MovieSession> getSessionsForMovieInCity(int movieId, Long cityId) {
        return sessionRepo.findByMovieIdAndCityId(movieId, cityId);
    }

    @Override
    public List<LocalDateTime> getStartTimesForMovie(int movieId) {
        return sessionRepo.findSessionsByMovieId(movieId)
                .stream()
                .map(MovieSession::getStartTime)
                .toList();
    }

    @Override
    public List<MovieSession> getSessionsByCity(int cityId) {
        return sessionRepo.findByCityId(cityId);
    }

}
