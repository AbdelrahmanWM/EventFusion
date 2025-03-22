package com.eventfusion.user_service;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class
UserServiceApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.load();
		System.setProperty("MONGO_URL",dotenv.get("MONGO_URL"));
		SpringApplication.run(UserServiceApplication.class, args);
	}

}
