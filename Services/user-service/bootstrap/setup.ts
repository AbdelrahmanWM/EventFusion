import Config from "../config/config";
import { DotenvStorageService } from "../../storage-service/services/envStorageService";
import { IUserService } from "../interfaces/IUserService";
import { IAuthService } from "../interfaces/IAuthService";
import { AuthenticateJWT } from "../middleware/authMiddleware";
import PassportJWTStrategy from "../strategies/jwtStrategy";
import UserService from "../services/userService";
import { AuthService } from "../services/authService";
import UserController from "../controllers/userController";
import UserRouter from "../routes/userRoute";
import { AuthController } from "../controllers/authController";
import AuthRouter from "../routes/authRoute";
import MongoDB from "shared/database/MongoDB";

export default class Setup {
  public static async setup() {
    const storageService: DotenvStorageService =
      DotenvStorageService.getInstance();
    const config: Config = Config.getInstance(storageService);
    const userService: IUserService = UserService.getInstance();
    const authService: IAuthService = AuthService.getInstance(config);
    const authenticateJWT: AuthenticateJWT = AuthenticateJWT.getInstance();
    const passportJWTStrategy: PassportJWTStrategy =
      PassportJWTStrategy.getInstance(config, userService);
    const userController: UserController =
      UserController.getInstance(userService);
    const userRouter: UserRouter = UserRouter.getInstance(
      userController,
      authenticateJWT
    );
    const authController: AuthController = AuthController.getInstance(
      userService,
      authService
    );
    const authRouter: AuthRouter = AuthRouter.getInstance(authController);
    const mongoDB: MongoDB = await MongoDB.getInstance(storageService);
    return { config, passportJWTStrategy, userRouter, authRouter };
  }
}
