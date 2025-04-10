import express, { Application, Request, Response,NextFunction } from "express";
import Config from "../config/config";
import cors from "cors";
import ConsoleLoggerService from "../../logger-service/services/consoleLoggerService";
import { sendErrorResponse } from "shared/utilities/Response";
import EventRouter from "event-service/routes/eventRouter";
import PollRouter from "event-service/routes/pollRouter";
import FeedbackRouter from "event-service/routes/feedbackRouter";

class EventServiceApp {
  private static instance: EventServiceApp;

  private app: Application;
  private port: number;
  private config: Config;
  private eventRouter: EventRouter;
private pollRouter: PollRouter;
private feedbackRouter: FeedbackRouter;
  private constructor(
    config: Config,
    eventRouter: EventRouter,
    pollRouter: PollRouter,
    feedbackRouter: FeedbackRouter
  ) {
    this.app = express();
    this.config = config;
    this.port = this.config.getPort();
    this.eventRouter=eventRouter;
    this.pollRouter=pollRouter;
    this.feedbackRouter=feedbackRouter;
    // Initializing middleware and routes
    this.initializeMiddleware();
    this.initializeRoutes();
    this.setupErrorHandling();
  }

  public static getInstance(
    config: Config,
    eventRouter: EventRouter,
    pollRouter: PollRouter,
    feedbackRouter: FeedbackRouter
  ): EventServiceApp {
    if (!EventServiceApp.instance) {
      EventServiceApp.instance = new EventServiceApp(
        config,
        eventRouter,
        pollRouter,
        feedbackRouter
      );
    }
    return EventServiceApp.instance;
  }
  private initializeMiddleware(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }
  private initializeRoutes(): void {
    this.app.use("/", this.eventRouter.getRouter());
    this.app.use("/polls", this.pollRouter.getRouter());
    this.app.use("/feedback",this.feedbackRouter.getRouter())
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
      ConsoleLoggerService.log(`Event service running on port ${this.port}`);
    });
  }
}

export default EventServiceApp;
