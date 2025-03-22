package com.eventfusion.user_service.dto;

import com.eventfusion.user_service.enums.UserStatus;

public class UserDTO {

        private String id;

        private String username;
        private String firstName;
        private String lastName;

        private String email;

        private String phoneNumber;

        private UserStatus accountStatus;

        public UserDTO(String username, String firstName, String lastName, String email, String phoneNumber, String password) {
            this.username = username;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.phoneNumber = phoneNumber;
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

        public UserStatus getAccountStatus() {
            return accountStatus;
        }

        public void setAccountStatus(UserStatus accountStatus) {
            this.accountStatus = accountStatus;
        }


}
