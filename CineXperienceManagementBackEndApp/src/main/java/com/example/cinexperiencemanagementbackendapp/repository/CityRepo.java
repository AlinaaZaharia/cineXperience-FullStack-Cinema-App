package com.example.cinexperiencemanagementbackendapp.repository;

import com.example.cinexperiencemanagementbackendapp.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepo extends JpaRepository<City, Long> {
}
