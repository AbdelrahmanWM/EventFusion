package com.eventfusion.user_service.respository;
import com.eventfusion.user_service.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User,String>{
}