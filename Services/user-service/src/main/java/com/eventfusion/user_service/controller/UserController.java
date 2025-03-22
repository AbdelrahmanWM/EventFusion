package com.eventfusion.user_service.controller;

import com.eventfusion.user_service.dto.UserDTO;
import com.eventfusion.user_service.dto.UserRegistrationDTO;
import com.eventfusion.user_service.respository.UserRepository;
import com.eventfusion.user_service.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @PostMapping
    @Valid
    public ResponseEntity<UserDTO>registerUser(@RequestBody UserRegistrationDTO userRegistrationDTO){
        if (userRepository.existsByUsername(userRegistrationDTO.getUsername())) {
            throw new IllegalArgumentException("Username is already taken");
        }

        // Check if email already exists
        if (userRepository.existsByEmail(userRegistrationDTO.getEmail())) {
            throw new IllegalArgumentException("Email is already taken");
        }
        UserDTO createdUser = userService.registerUser(userRegistrationDTO);
        return ResponseEntity.ok(createdUser);
    }


}
