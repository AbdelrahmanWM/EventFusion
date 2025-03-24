package com.eventfusion.user_service.controller;

import com.eventfusion.user_service.dto.UserDTO;
import com.eventfusion.user_service.dto.UserRegistrationDTO;
import com.eventfusion.user_service.respository.UserRepository;
import com.eventfusion.user_service.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
            throw new UserAlreadyExistsException("Username is already taken");
        }

        // Check if email already exists
        if (userRepository.existsByEmail(userRegistrationDTO.getEmail())) {
            throw new UserAlreadyExistsException("Email is already taken");
        };
        UserDTO createdUser = userService.registerUser(userRegistrationDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }
    @GetMapping
    public ResponseEntity<List<UserDTO>>getUsers(){
        List<UserDTO> users =userService.getAllUsers();
        return  ResponseEntity.ok(users);
    }
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO>getUser(@PathVariable("id") String userId){
        Optional<UserDTO> user = userService.getUserById(userId);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") String userId){
        Optional<UserDTO> user = userService.getUserById(userId);
        if (user.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/{id}")
    @Valid
    public ResponseEntity<UserDTO> updateUser(@PathVariable("id") String userId, @RequestBody  UserDTO userDTO){
        Optional<UserDTO> user = userService.getUserById(userId);
        if(user.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        UserDTO updatedUser =userService.updateUser(userId,userDTO);
        return ResponseEntity.ok(updatedUser);
    }


}
