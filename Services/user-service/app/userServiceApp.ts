import express, { Application, Request, Response,NextFunction } from "express";
import Config from "../config/config";
import cors from "cors";
import PassportJWTStrategy from "../strategies/jwtStrategy";
import UserRouter from "../routes/userRoute";
import AuthRouter from "../routes/authRoute";
import ConsoleLoggerService from "../../logger-service/services/consoleLoggerService";
import { sendErrorResponse } from "shared/utilities/Response";

class UserServiceApp {
  private static instance: UserServiceApp;

  private app: Application;
  private port: number;
  private config: Config;
  private passportJWTStrategy: PassportJWTStrategy;
  private userRouter: UserRouter;
  private authRouter: AuthRouter;

  private constructor(
    config: Config,
    passportJWTStrategy: PassportJWTStrategy,
    userRouter: UserRouter,
    authRouter: AuthRouter
  ) {
    this.app = express();
    this.config = config;
    this.port = this.config.getPort();
    this.passportJWTStrategy = passportJWTStrategy;
    this.userRouter = userRouter;
    this.authRouter = authRouter;

    // Initializing middleware and routes
    this.initializeMiddleware();
    this.initializeRoutes();
    this.setupErrorHandling();
  }

  public static getInstance(
    config: Config,
    passportJWTStrategy: PassportJWTStrategy,
    userRouter: UserRouter,
    authRouter: AuthRouter
  ): UserServiceApp {
    if (!UserServiceApp.instance) {
      UserServiceApp.instance = new UserServiceApp(
        config,
        passportJWTStrategy,
        userRouter,
        authRouter
      );
    }
    return UserServiceApp.instance;
  }
  private initializeMiddleware(): void {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(this.passportJWTStrategy.initialize());
  }
  private initializeRoutes(): void {
    this.app.use("/authenticate", this.authRouter.getRouter());
    this.app.use("/", this.userRouter.getRouter());
  }
  private setupErrorHandling() {
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error("Internal server error:", err);
        sendErrorResponse(res, "Internal server Error", err, 500);
      }
    );
  }
  public start(): void {
    this.app.listen(this.port, () => {
      ConsoleLoggerService.log(`User service running on port ${this.port}`);
    });
  }
}

export default UserServiceApp;
