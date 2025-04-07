import { Request, Response } from "express";
import { IFeedbackService } from "event-service/interfaces/IFeedbackService";
import { sendSuccessResponse, sendErrorResponse } from "../../shared/utilities/Response";

export class FeedbackController {
  private static instance: FeedbackController;
  feedbackService: IFeedbackService;

  private constructor(feedbackService: IFeedbackService) {
    this.feedbackService = feedbackService;
  }

  public static getInstance(feedbackService: IFeedbackService): FeedbackController {
    if (!FeedbackController.instance) {
      FeedbackController.instance = new FeedbackController(feedbackService);
    }
    return FeedbackController.instance;
  }

  public getEventFeedback = async (req: Request, res: Response): Promise<void> => {
    const { eventID } = req.params;
    try {
      const feedbacks = await this.feedbackService.getEventFeedback(eventID);
      sendSuccessResponse(res, "Successfully fetched feedback.", feedbacks, 200);
    } catch (error) {
      sendErrorResponse(res, "Failed to fetch feedback.", error, 500);
    }
  };

  public createFeedback = async (req: Request, res: Response): Promise<void> => {
    const { eventID, userID, rating, comment } = req.body;
    try {
      const feedback = await this.feedbackService.createFeedback(eventID, userID, rating, comment);
      sendSuccessResponse(res, "Successfully created feedback.", feedback, 201);
    } catch (error) {
      sendErrorResponse(res, "Failed to create feedback.", error, 500);
    }
  };

  public deleteFeedback = async (req: Request, res: Response): Promise<void> => {
    const { feedbackID } = req.params;
    try {
      const deletedFeedback = await this.feedbackService.deleteFeedback(feedbackID);
      sendSuccessResponse(res, "Successfully deleted feedback.", deletedFeedback, 200);
    } catch (error) {
      sendErrorResponse(res, "Failed to delete feedback.", error, 500);
    }
  };
}

export default FeedbackController;