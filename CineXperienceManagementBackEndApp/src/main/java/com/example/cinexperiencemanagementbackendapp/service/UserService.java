package com.example.cinexperiencemanagementbackendapp.service;

import com.example.cinexperiencemanagementbackendapp.entity.User;

public interface UserService {
    User registerUser(User user);
    User loginUser(String username, String password);
}
