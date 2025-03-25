package com.eventfusion.user_service.model;

import com.eventfusion.user_service.dto.UserDTO;
import com.eventfusion.user_service.enums.UserStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;
@Document(collection="users")

public class User {
    @Id
    private String id;
    @Indexed(unique=true)
    private String username;
    private String firstName;
    @NotBlank(message="Last name is required")
    private String lastName;
    @Indexed(unique=true)

    private String email;
    @NotBlank(message="Phone number is required")
    @Size(min=10,max=15, message="Phone number must be between 10 and 15 digits")
    private String phoneNumber;
    @NotBlank(message="Password is required")
    @Size(min=6,message="Password must be at least 6 characters")
    private String password;
    @NotNull(message="Account status is required")
    private UserStatus accountStatus;

    public User() {}

    public User(String username, String firstName, String lastName, String email, String phoneNumber, String password) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.accountStatus=UserStatus.PENDING; // we can change that
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserStatus getAccountStatus() {
        return accountStatus;
    }

    public void setAccountStatus(UserStatus accountStatus) {
        this.accountStatus = accountStatus;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", password='" + password + '\'' +
                ", accountStatus=" + accountStatus +
                '}';
    }

    public void updateFromUserDTO(UserDTO userDTO){
        System.out.println(userDTO);
        System.out.println(this);
        if (userDTO.getUsername() != null) {
            this.setUsername(userDTO.getUsername());
        }

        if (userDTO.getFirstName() != null) {
            this.setFirstName(userDTO.getFirstName());
        }

        if (userDTO.getLastName() != null) {
            this.setLastName(userDTO.getLastName());
        }

        if (userDTO.getEmail() != null) {
            this.setEmail(userDTO.getEmail());
        }

        if (userDTO.getPhoneNumber() != null) {
            this.setPhoneNumber(userDTO.getPhoneNumber());
        }
        System.out.println(this);


        if (userDTO.getAccountStatus() != null) {
            this.setAccountStatus(userDTO.getAccountStatus()); // Enum value from UserStatus (PENDING, ACTIVE, etc.)
        }
    }
}
