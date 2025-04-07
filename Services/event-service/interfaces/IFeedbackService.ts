import { IFeedback } from "./IFeedback";

export interface IFeedbackService {
  getEventFeedback(eventID: string): Promise<IFeedback[]>; 
  createFeedback(eventID: string, userID: string, rating: number, comment?: string): Promise<IFeedback>; 
  deleteFeedback(feedbackID: string): Promise<IFeedback>; 
}
