package com.eventfusion.user_service.service;
import com.eventfusion.user_service.dto.UserDTO;
import com.eventfusion.user_service.dto.UserRegistrationDTO;
import com.eventfusion.user_service.model.User;
import com.eventfusion.user_service.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImp implements UserService{
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserMapper userMapper;

    @Override
    public UserDTO registerUser(UserRegistrationDTO userDTO) {
        User user = userMapper.userRegistrationDTOToUser(userDTO);
        String encryptedPassword=passwordEncoder.encode(userDTO.getPassword());
        user.setPassword(encryptedPassword);
        user=userRepository.save(user);
        return userMapper.userToUserDTO(user);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<UserDTO>result=new ArrayList<>();
        List<User>users = userRepository.findAll();
        for(User user: users){
            result.add(userMapper.userToUserDTO(user));
        }
        return result;
    }

    @Override
    public Optional<UserDTO> getUserById(String id) {

        Optional<User> user = userRepository.findById(id);
        return user.map(userMapper::userToUserDTO);

    }

    @Override
    public UserDTO updateUser(String id, UserDTO userDTO) {
        Optional<User> foundUser = userRepository.findById(id);
        if (foundUser.isEmpty()){
            return null;
        }
        User user=foundUser.get();
        user.updateFromUserDTO(userDTO);
        User updatedUser =userRepository.save(user);
        return userMapper.userToUserDTO(updatedUser);

    }

    @Override
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
}
