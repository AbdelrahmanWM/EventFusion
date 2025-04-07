import { Request, Response } from "express";
import { IEventService } from "../interfaces/IEventService";
import { sendSuccessResponse, sendErrorResponse } from "../../shared/utilities/Response";

export class EventController {
  private static instance: EventController;
  private eventService: IEventService;

  private constructor(eventService: IEventService) {
    this.eventService = eventService;
  }

  public static getInstance(eventService: IEventService): EventController {
    if (!EventController.instance) {
      EventController.instance = new EventController(eventService);
    }
    return EventController.instance;
  }

  public getEvents = async (req: Request, res: Response): Promise<void> => {
    try {
      const events = await this.eventService.getEvents();
      sendSuccessResponse(res, "Successfully fetched events.", events, 200);
    } catch (error) {
      sendErrorResponse(res, "Failed to fetch events.", error, 500);
    }
  };

  public getEventById = async (req: Request, res: Response): Promise<void> => {
    const { eventID } = req.params;
    try {
      const event = await this.eventService.getEventById(eventID);
      sendSuccessResponse(res, "Successfully fetched event details.", event, 200);
    } catch (error) {
      sendErrorResponse(res, "Event not found.", error, 404);
    }
  };

  public createEvent = async (req: Request, res: Response): Promise<void> => {
    try {
      const eventData = req.body;
      const event = await this.eventService.createEvent(eventData);
      sendSuccessResponse(res, "Successfully created event.", event, 201);
    } catch (error) {
      sendErrorResponse(res, "Failed to create event.", error, 500);
    }
  };

  public updateEvent = async (req: Request, res: Response): Promise<void> => {
    const { eventID } = req.params;
    const updates = req.body;
    try {
      const updatedEvent = await this.eventService.updateEvent(eventID, updates);
      sendSuccessResponse(res, "Successfully updated event.", updatedEvent, 200);
    } catch (error) {
      sendErrorResponse(res, "Event not found.", error, 404);
    }
  };

  public deleteEvent = async (req: Request, res: Response): Promise<void> => {
    const { eventID } = req.params;
    try {
      const deletedEvent = await this.eventService.deleteEvent(eventID);
      sendSuccessResponse(res, "Successfully deleted event.", deletedEvent, 200);
    } catch (error) {
      sendErrorResponse(res, "Event not found.", error, 404);
    }
  };

  public addUserToEvent = async (req: Request, res: Response): Promise<void> => {
    const { userID, role } = req.body;
    const { eventID } = req.params;
    try {
      await this.eventService.addUserToEvent(userID, eventID, role);
      sendSuccessResponse(res, "Successfully added user to event.", null, 200);
    } catch (error) {
      sendErrorResponse(res, "Failed to add user to event.", error, 500);
    }
  };

  public removeUserFromEvent = async (req: Request, res: Response): Promise<void> => {
    const { userID, role } = req.body;
    const { eventID } = req.params;
    try {
      await this.eventService.removeUserFromEvent(userID, eventID, role);
      sendSuccessResponse(res, "Successfully removed user from event.", null, 200);
    } catch (error) {
      sendErrorResponse(res, "Failed to remove user from event.", error, 500);
    }
  };

  public addSession = async (req: Request, res: Response): Promise<void> => {
    const { eventID } = req.params;
    const session = req.body;
    try {
      const updatedEvent = await this.eventService.addSession(eventID, session);
      sendSuccessResponse(res, "Successfully added session to the agenda.", updatedEvent, 200);
    } catch (error) {
      sendErrorResponse(res, "Failed to add session to the agenda.", error, 500);
    }
  };

  public removeSessionByTitle = async (req: Request, res: Response): Promise<void> => {
    const { eventID } = req.params;
    const { title } = req.body;
    try {
      const updatedEvent = await this.eventService.removeSessionByTitle(eventID, title);
      sendSuccessResponse(res, "Successfully removed session from the agenda.", updatedEvent, 200);
    } catch (error) {
      sendErrorResponse(res, "Failed to remove session from the agenda.", error, 500);
    }
  };

  public getEventListForUserByRole = async (req: Request, res: Response): Promise<void> => {
    const { userID } = req.params;
    const { role } = req.query;
    try {
      const events = await this.eventService.getEventListForUserByRole(userID, role as string);
      sendSuccessResponse(res, "Successfully fetched events for user by role.", events, 200);
    } catch (error) {
      sendErrorResponse(res, "Failed to fetch events for user by role.", error, 500);
    }
  };
}

export default EventController;