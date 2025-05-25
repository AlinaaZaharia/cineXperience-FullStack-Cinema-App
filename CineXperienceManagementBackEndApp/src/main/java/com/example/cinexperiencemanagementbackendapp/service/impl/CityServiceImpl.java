package com.example.cinexperiencemanagementbackendapp.service.impl;

import com.example.cinexperiencemanagementbackendapp.entity.City;
import com.example.cinexperiencemanagementbackendapp.repository.CityRepo;
import com.example.cinexperiencemanagementbackendapp.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityServiceImpl implements CityService {
    @Autowired
    private CityRepo cityRepo;

    @Override
    public List<City> getAllCities() {
        return cityRepo.findAll();
    }

    @Override
    public City addCity(City city) {
        return cityRepo.save(city);
    }
}
