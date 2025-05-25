package com.example.cinexperiencemanagementbackendapp.service.impl;

import com.example.cinexperiencemanagementbackendapp.entity.User;
import com.example.cinexperiencemanagementbackendapp.repository.UserRepo;
import com.example.cinexperiencemanagementbackendapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public User registerUser(User user) {
        if (userRepo.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists.");
        }
        return userRepo.save(user); // fără hash
    }

    @Override
    public User loginUser(String username, String password) {
        return userRepo.findByUsername(username)
                .filter(u -> u.getPassword().equals(password)) // comparație simplă
                .orElseThrow(() -> new RuntimeException("Invalid credentials."));
    }
}
