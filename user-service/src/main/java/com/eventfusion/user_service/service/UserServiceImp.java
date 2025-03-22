package com.eventfusion.user_service.service;

import com.eventfusion.user_service.dto.UserDTO;
import com.eventfusion.user_service.model.User;
import com.eventfusion.user_service.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserServiceImp implements UserService{
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        User user = new User();
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return null;
    }

    @Override
    public UserDTO getUserById(String id) {
        return null;
    }

    @Override
    public UserDTO updateUser(String id, UserDTO userDTO) {
        return null;
    }

    @Override
    public void deleteUser(String id) {

    }
}
