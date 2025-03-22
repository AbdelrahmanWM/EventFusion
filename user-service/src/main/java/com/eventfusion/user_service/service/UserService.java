package com.eventfusion.user_service.service;

import com.eventfusion.user_service.dto.UserDTO;
import com.eventfusion.user_service.model.User;

import java.util.List;

public interface UserService {
    UserDTO createUser(UserDTO userDTO);
    List<UserDTO> getAllUsers();
    UserDTO getUserById(String id);
    UserDTO updateUser(String id, UserDTO userDTO);
    void deleteUser(String id);

}
