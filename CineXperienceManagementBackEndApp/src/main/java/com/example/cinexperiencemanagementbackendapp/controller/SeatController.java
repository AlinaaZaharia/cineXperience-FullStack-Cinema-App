package com.example.cinexperiencemanagementbackendapp.controller;

import com.example.cinexperiencemanagementbackendapp.entity.Seat;
import com.example.cinexperiencemanagementbackendapp.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/seats")
@CrossOrigin(origins = "http://localhost:3000")
public class SeatController {

    @Autowired
    private SeatService seatService;

    @PutMapping("/reserve/{id}")
    public Seat reserveSeat(@PathVariable("id") Long id) {
        return seatService.reserveSeat(id);
    }
}
