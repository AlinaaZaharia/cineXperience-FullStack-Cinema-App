package com.example.cinexperiencemanagementbackendapp.service;

import com.example.cinexperiencemanagementbackendapp.entity.City;
import java.util.List;

public interface CityService {
    List<City> getAllCities();
    City addCity(City city);
}

