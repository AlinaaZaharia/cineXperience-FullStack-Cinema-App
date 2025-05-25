package com.example.cinexperiencemanagementbackendapp.controller;

import com.example.cinexperiencemanagementbackendapp.entity.User;
import com.example.cinexperiencemanagementbackendapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return userService.loginUser(user.getUsername(), user.getPassword());
    }
}
