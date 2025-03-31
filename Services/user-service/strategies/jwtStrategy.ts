import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import passport from "passport";
import Config from "../config/config";
import { IUserService } from "../interfaces/IUserService";
import ConsoleLoggerService from "../../logger-service/services/consoleLoggerService";

// Singleton design pattern
// Dependency Injection of Config, and IUserService
export class PassportJWTStrategy {
  private static instance: PassportJWTStrategy;
  private  config: Config;
  private userService: IUserService;
    
  private constructor(config: Config, userService: IUserService) {
    this.config=config;
    this.userService=userService;
    this.initializeStrategy()
  }

  public static getInstance(config: Config, userService: IUserService): PassportJWTStrategy{
    if(! PassportJWTStrategy.instance){
        PassportJWTStrategy.instance=new PassportJWTStrategy(config, userService);
    }
    return PassportJWTStrategy.instance;
  }

  private initializeStrategy(): void {
    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: this.config.getJwtSecret(),
    };

    passport.use(
        new JwtStrategy(options,async(payload, done)=>{
            try{
                const user =await this.userService.getUserByUsername(payload.username);
                if (user){
                    return done(null,user);
                }
                return done(null,false)
            }catch(error){ 
                /// Using logger service
                ConsoleLoggerService.logError("Error in JWT Strategy: ",error);
                return done(error,false)
            }
        })
    );
  }
  public initialize(){
    return passport.initialize();
  }
}

export default PassportJWTStrategy