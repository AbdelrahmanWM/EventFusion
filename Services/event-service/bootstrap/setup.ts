import Config from "../config/config";
import { DotenvStorageService } from "../../storage-service/services/envStorageService";
import MongoDB from "shared/database/MongoDB";
import { IEventService } from "event-service/interfaces/IEventService";
import EventService from "event-service/services/eventService";
import ServicesClient from "ServicesClient/servicesClient";
import ServiceClientConfig from "ServicesClient/config/config";
import { IPollService } from "event-service/interfaces/IPollService";
import PollService from "event-service/services/pollService";
import EventController from "event-service/controllers/eventController";
import PollController from "event-service/controllers/pollController";
import { IFeedbackService } from "event-service/interfaces/IFeedbackService";
import FeedbackService from "event-service/services/feedbackService";
import FeedbackController from "event-service/controllers/feedbackController";
import EventRouter from "event-service/routes/eventRouter";
import FeedbackRouter from "event-service/routes/feedbackRouter";
import PollRouter from "event-service/routes/pollRouter";

export default class Setup {
  public static async setup() {
    const storageService: DotenvStorageService =
      DotenvStorageService.getInstance();
    const config: Config = Config.getInstance(storageService);
    const serviceClientConfig = ServiceClientConfig.getInstance(storageService); 
    const servicesClient =ServicesClient.getInstance(serviceClientConfig.getURL());
    const eventService:IEventService = EventService.getInstance(servicesClient);
    const pollService:IPollService =PollService.getInstance();
    const feedbackService: IFeedbackService = FeedbackService.getInstance(); 
    const eventController = EventController.getInstance(eventService);
    const pollController = PollController.getInstance(pollService);
    const feedbackController = FeedbackController.getInstance(feedbackService);
    const eventRouter = EventRouter.getInstance(eventController);
    const feedbackRouter = FeedbackRouter.getInstance(feedbackController);
    const pollRouter = PollRouter.getInstance(pollController);
    await MongoDB.getInstance(storageService);
    return { config, eventRouter, pollRouter, feedbackRouter };
  }
}
