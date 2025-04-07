import { Router } from "express";
import EventController from "event-service/controllers/eventController";

// Singleton, Dependency Injection, Separation of Concerns
export default class EventRouter {
  private static instance: EventRouter;
  private eventController: EventController;
  private router: Router;

  private constructor(eventController: EventController) {
    this.router = Router();
    this.eventController = eventController;
    this.bindRoutes();
  }

  public static getInstance(eventController: EventController): EventRouter {
    if (!EventRouter.instance) {
      EventRouter.instance = new EventRouter(eventController);
    }
    return EventRouter.instance;
  }

  private bindRoutes(): void {
    // Event CRUD
    this.router.get("/", this.eventController.getEvents);
    this.router.get("/:eventID", this.eventController.getEventById);
    this.router.post("/", this.eventController.createEvent);
    this.router.put("/:eventID", this.eventController.updateEvent);
    this.router.delete("/:eventID", this.eventController.deleteEvent);

    // Add/Remove User to/from Event
    this.router.post("/:eventID/users", this.eventController.addUserToEvent);
    this.router.delete("/:eventID/users", this.eventController.removeUserFromEvent);

    // Agenda Session Management
    this.router.post("/:eventID/agenda", this.eventController.addSession);
    this.router.delete("/:eventID/agenda", this.eventController.removeSessionByTitle);

    // Get Events for User by Role
    this.router.get("/user/:userID", this.eventController.getEventListForUserByRole);
  }

  public getRouter(): Router {
    return this.router;
  }
}