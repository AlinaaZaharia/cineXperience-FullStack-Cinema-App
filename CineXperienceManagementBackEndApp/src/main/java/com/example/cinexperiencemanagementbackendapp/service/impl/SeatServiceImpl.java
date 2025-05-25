package com.example.cinexperiencemanagementbackendapp.service.impl;

import com.example.cinexperiencemanagementbackendapp.entity.Seat;
import com.example.cinexperiencemanagementbackendapp.repository.SeatRepo;
import com.example.cinexperiencemanagementbackendapp.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SeatServiceImpl implements SeatService {

    @Autowired
    private SeatRepo seatRepo;

    @Override
    public Seat reserveSeat(Long seatId) {
        Seat seat = seatRepo.findById(seatId).orElseThrow(() -> new RuntimeException("Locul nu a fost găsit"));
        if (seat.isReserved()) {
            throw new RuntimeException("Locul este deja rezervat.");
        }
        seat.setReserved(true);
        return seatRepo.save(seat);
    }
}
