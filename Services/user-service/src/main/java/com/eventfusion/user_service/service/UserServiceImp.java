package com.eventfusion.user_service.service;
import com.eventfusion.user_service.dto.UserDTO;
import com.eventfusion.user_service.dto.UserRegistrationDTO;
import com.eventfusion.user_service.model.User;
import com.eventfusion.user_service.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.List;
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
