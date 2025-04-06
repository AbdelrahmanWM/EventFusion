import { Router } from "express";
import PollController from "../controllers/pollController";

// singleton
// Dependency Injection
// Separation of concerns
export default class PollRouter {
  private static instance: PollRouter;
  private pollController: PollController;
  private router: Router;

  private constructor(pollController: PollController) {
    this.router = Router();
    this.pollController = pollController;
    this.bindRoutes();
  }

  public static getInstance(pollController: PollController): PollRouter {
    if (!PollRouter.instance) {
      PollRouter.instance = new PollRouter(pollController);
    }
    return PollRouter.instance;
  }

  private bindRoutes(): void {
    // Get poll by ID
    this.router.get("/polls/:pollID", this.pollController.getPoll);

    // Create a new poll
    this.router.post("/polls", this.pollController.createPoll);

    // Update votes for a poll option
    this.router.put("/polls/:pollID/vote", this.pollController.updateOptionVotes);

    // Close poll
    this.router.put("/polls/:pollID/close", this.pollController.closePoll);

    // Open poll
    this.router.put("/polls/:pollID/open", this.pollController.openPoll);

    // Delete poll
    this.router.delete("/polls/:pollID", this.pollController.deletePoll);
  }

  public getRouter(): Router {
    return this.router;
  }
}
