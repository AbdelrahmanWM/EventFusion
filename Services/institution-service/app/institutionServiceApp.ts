import express, { Application, Request, Response, NextFunction } from "express";
import Config from "../config/config"; // Configuration class
import cors from "cors"; // To handle Cross-Origin Resource Sharing
import InstitutionRouter from "../routes/institutionRouter"; // Institution Router
import ConsoleLoggerService from "../../logger-service/services/consoleLoggerService"; // Logger service

class InstitutionServiceApp {
  private static instance: InstitutionServiceApp;

  private app: Application;
  private port: number;
  private config: Config;
  private institutionRouter: InstitutionRouter;

  private constructor(
    config: Config,
    institutionRouter: InstitutionRouter
  ) {
    this.app = express();
    this.config = config;
    this.port = this.config.getPort();
    this.institutionRouter = institutionRouter;

    this.initializeMiddleware();
    this.initializeRoutes();
  }

  // Singleton pattern: Ensure a single instance
  public static getInstance(
    config: Config,
    institutionRouter: InstitutionRouter
  ): InstitutionServiceApp {
    if (!InstitutionServiceApp.instance) {
      InstitutionServiceApp.instance = new InstitutionServiceApp(
        config,
        institutionRouter
      );
    }
    return InstitutionServiceApp.instance;
  }

  private initializeMiddleware(): void {
    this.app.use(express.json()); 
    this.app.use(cors()); 
  }

  // Route setup
  private initializeRoutes(): void {
    this.app.use("/", this.institutionRouter.getRouter()); 
  }


  public start(): void {
    this.app.listen(this.port, () => {
      ConsoleLoggerService.log(`Institution Service running on port ${this.port}`);
    });
  }
}

export default InstitutionServiceApp;