import jwt, { SignOptions } from "jsonwebtoken";
import { IUser } from "../interfaces/IUser";
import Config from "../config/config";

// Singleton
export class AuthService {
  public static instance: AuthService;
  config: Config;
  private constructor(config: Config) {
    this.config = config;
  }
  public static getInstance(config: Config): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService(config);
    }
    return AuthService.instance;
  }
  public generateToken(user: IUser): string {
    // Ensure jwtSecret is a valid string, and token expiration is a valid string or number
    const jwtSecret = this.config.getJwtSecret();
    const tokenExpiry = "1h";

    const options: SignOptions = {
      expiresIn: tokenExpiry, // can be a string like "1h" or a number like 3600
    };

    return jwt.sign({ username: user.username,userID: user._id }, jwtSecret, options);
  }
}
