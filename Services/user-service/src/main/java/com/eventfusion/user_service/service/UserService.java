package com.eventfusion.user_service.service;

import com.eventfusion.user_service.dto.UserDTO;
import com.eventfusion.user_service.dto.UserRegistrationDTO;
import java.util.List;
import java.util.Optional;

public interface UserService {
    UserDTO registerUser(UserRegistrationDTO userDTO);

    List<UserDTO> getAllUsers();

    Optional<UserDTO> getUserById(String id);

    UserDTO updateUser(String id, UserDTO userDTO);

    void deleteUser(String id);

}
