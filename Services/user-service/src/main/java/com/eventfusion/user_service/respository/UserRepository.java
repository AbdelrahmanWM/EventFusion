package com.eventfusion.user_service.respository;
import com.eventfusion.user_service.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User,String>{
    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    User findByUsername(String username);

    User findByEmail(String email);
}