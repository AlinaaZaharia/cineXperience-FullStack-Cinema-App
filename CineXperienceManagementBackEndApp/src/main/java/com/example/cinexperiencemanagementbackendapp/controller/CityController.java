package com.example.cinexperiencemanagementbackendapp.controller;

import com.example.cinexperiencemanagementbackendapp.entity.City;
import com.example.cinexperiencemanagementbackendapp.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cities")
@CrossOrigin(origins = "http://localhost:3000")
public class CityController {
    @Autowired
    private CityService cityService;

    @GetMapping("/all")
    public List<City> getAllCities() {
        return cityService.getAllCities();
    }

    @PostMapping("/add")
    public City addCity(@RequestBody City city) {
        return cityService.addCity(city);
    }
}
