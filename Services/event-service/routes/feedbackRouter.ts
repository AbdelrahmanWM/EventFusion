import { Router } from "express";
import FeedbackController from "event-service/controllers/feedbackController";
// Singleton
// Dependency Injection
// Separation of concerns
export default class FeedbackRouter {
  private static instance: FeedbackRouter;
  private feedbackController: FeedbackController;
  private router: Router;

  private constructor(feedbackController: FeedbackController) {
    this.router = Router();
    this.feedbackController = feedbackController;
    this.bindRoutes();
  }

  public static getInstance(feedbackController: FeedbackController): FeedbackRouter {
    if (!FeedbackRouter.instance) {
      FeedbackRouter.instance = new FeedbackRouter(feedbackController);
    }
    return FeedbackRouter.instance;
  }

  private bindRoutes(): void {
    // Get feedback for a specific event
    this.router.get("/:eventID", this.feedbackController.getEventFeedback);

    // Create new feedback
    this.router.post("/", this.feedbackController.createFeedback);

    // Delete feedback
    this.router.delete("/:feedbackID", this.feedbackController.deleteFeedback);
  }

  public getRouter(): Router {
    return this.router;
  }
}