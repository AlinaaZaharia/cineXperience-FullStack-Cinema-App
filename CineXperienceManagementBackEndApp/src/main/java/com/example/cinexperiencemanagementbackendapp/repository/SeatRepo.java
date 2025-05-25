package com.example.cinexperiencemanagementbackendapp.repository;

import com.example.cinexperiencemanagementbackendapp.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatRepo extends JpaRepository<Seat, Long> {
}
