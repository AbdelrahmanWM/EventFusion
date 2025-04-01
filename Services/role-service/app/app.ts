import express, { Application } from "express";
import Config from "../config/config";
import cors from "cors";
import ConsoleLoggerService from "../../logger-service/services/consoleLoggerService";
import RoleRouter from "role-service/routes/roleRoute";

class RoleServiceApp {
  private static instance: RoleServiceApp;

  private app: Application;
  private port: number;
  private config: Config;
  private roleRouter: RoleRouter;

  private constructor(config: Config, roleRouter: RoleRouter) {
    this.app = express();
    this.config = config;
    this.port = this.config.getPort();
    this.roleRouter = roleRouter;
    // Initializing middleware and routes
    this.initializeMiddleware();
    this.initializeRoutes();
  }

  public static getInstance(
    config: Config,
    roleRouter: RoleRouter
  ): RoleServiceApp {
    if (!RoleServiceApp.instance) {
      RoleServiceApp.instance = new RoleServiceApp(config, roleRouter);
    }
    return RoleServiceApp.instance;
  }
  private initializeMiddleware(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }
  private initializeRoutes(): void {
    this.app.use("/roles", this.roleRouter.getRouter());
  }
  public start(): void {
    this.app.listen(this.port, () => {
      ConsoleLoggerService.log(`Server running on port ${this.port}`);
    });
  }
}

export default RoleServiceApp;
