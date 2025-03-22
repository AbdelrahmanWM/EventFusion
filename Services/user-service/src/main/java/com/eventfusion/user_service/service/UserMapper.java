package com.eventfusion.user_service.service;

import com.eventfusion.user_service.dto.UserDTO;
import com.eventfusion.user_service.dto.UserRegistrationDTO;
import com.eventfusion.user_service.model.User;
import org.springframework.stereotype.Service;

@Service
public class UserMapper {
    public UserDTO userToUserDTO(User user){
        return new UserDTO(user.getUsername(),user.getFirstName(),user.getLastName(),user.getEmail(),user.getPhoneNumber(),user.getPassword());
    };
    public User userDTOToUser(UserDTO dtoUser){
        User user= new User(dtoUser.getUsername(),dtoUser.getFirstName(),dtoUser.getLastName(),dtoUser.getEmail(), dtoUser.getPhoneNumber(), "");
        user.setId(dtoUser.getId());
        return user;
    }
    public User userRegistrationDTOToUser(UserRegistrationDTO dtoUser){
        return new User(dtoUser.getUsername(),dtoUser.getFirstName(),dtoUser.getLastName(),dtoUser.getEmail(), dtoUser.getPhoneNumber(), dtoUser.getPassword());
    }
}
