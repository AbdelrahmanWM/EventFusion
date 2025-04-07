import { IFeedback } from "../interfaces/IFeedback";
import FeedbackModel from "event-service/models/feedback";

class FeedbackService {
  static instance: FeedbackService | null = null;

  public static getInstance(): FeedbackService {
    if (!FeedbackService.instance) {
      FeedbackService.instance = new FeedbackService();
    }
    return FeedbackService.instance;
  }

  private constructor() {}

  // Get all feedback for a specific event
  public async getEventFeedback(eventID: string): Promise<IFeedback[]> {
    try {
      const feedbacks = await FeedbackModel.find({ eventID }).populate("userID");
      return feedbacks;
    } catch (error: any) {
      throw new Error("Failed to fetch event feedback: " + error.message);
    }
  }

  // Create new feedback
  public async createFeedback(eventID: string, userID: string, rating: number, comment?: string): Promise<IFeedback> {
    try {
      const newFeedback = new FeedbackModel({ eventID, userID, rating, comment });
      await newFeedback.save();
      return newFeedback;
    } catch (error: any) {
      throw new Error("Failed to create feedback: " + error.message);
    }
  }

  // Delete feedback
  public async deleteFeedback(feedbackID: string): Promise<IFeedback> {
    try {
      const deletedFeedback = await FeedbackModel.findByIdAndDelete(feedbackID);
      if (!deletedFeedback) {
        throw new Error("Feedback not found.");
      }
      return deletedFeedback;
    } catch (error: any) {
      throw new Error("Failed to delete feedback: " + error.message);
    }
  }
}

export default FeedbackService;