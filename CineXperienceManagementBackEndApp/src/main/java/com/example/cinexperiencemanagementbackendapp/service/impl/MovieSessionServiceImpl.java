package com.example.cinexperiencemanagementbackendapp.service.impl;

import com.example.cinexperiencemanagementbackendapp.entity.MovieSession;
import com.example.cinexperiencemanagementbackendapp.entity.Seat;
import com.example.cinexperiencemanagementbackendapp.repository.MovieSessionRepo;
import com.example.cinexperiencemanagementbackendapp.service.MovieSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MovieSessionServiceImpl implements MovieSessionService {

    @Autowired
    private MovieSessionRepo sessionRepo;

    @Override
    public MovieSession createSession(MovieSession session) {
        if(session.getSeats() == null || session.getSeats().isEmpty()){
            List<Seat> generatedSeats = new ArrayList<>();
            for(int row=1; row<=8; row++){
                for(int num=1; num<=10; num++){
                    Seat seat = new Seat();
                    seat.setRoww(row);
                    seat.setNumber(num);
                    seat.setReserved(false);
                    seat.setSession(session);
                    generatedSeats.add(seat);
                }
            }
            session.setSeats(generatedSeats);
        }
        return sessionRepo.save(session);
    }

    @Override
    public List<MovieSession> getSessionsForMovie(int movieId) {
        return sessionRepo.findByMovieId(movieId);
    }
}
