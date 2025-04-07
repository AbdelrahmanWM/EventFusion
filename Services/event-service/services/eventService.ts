import { ISession } from "event-service/interfaces/ISession";
import { IEvent } from "../interfaces/IEvent";
import EventModel from "event-service/models/event";
import ServicesClient from "ServicesClient/servicesClient";
import { IEventService } from "event-service/interfaces/IEventService";

class EventService implements IEventService {
  static instance: EventService | null = null;
  private servicesClient: ServicesClient;
  public static getInstance(servicesClient: ServicesClient): EventService {
    if (!EventService.instance) {
      EventService.instance = new EventService(servicesClient);
    }
    return EventService.instance;
  }

  private constructor(servicesClient: ServicesClient) {
    this.servicesClient = servicesClient;
  }
  async getEventListForUser(userID: string): Promise<IEvent[]> {
    try {
      interface IRole {user: string, event:string, roles:Array<string>}      
      const roles: IRole[] = await this.servicesClient.getRolesByUser(userID) as IRole[];

      const eventIDs = roles.map((role) => role.event);

      const events = await EventModel.find({ _id: { $in: eventIDs } });

      return events;
    } catch (err: any) {
      console.error("Failed to fetch event list for user:", err.message);
      throw new Error("Failed to fetch event list for user.");
    }

  }
  async getEventListForUserByRole(userID: string, role: string): Promise<IEvent[]> {
    try {
      interface IRole {user: string, event:string, roles:Array<string>}      
      const roles: IRole[] = await this.servicesClient.getRolesByUser(userID) as IRole[];

      const eventIDs = roles.filter((r)=>r.roles.some((rr)=>rr==role)).map((role) => role.event);

      const events = await EventModel.find({ _id: { $in: eventIDs } });

      return events;
    } catch (err: any) {
      console.error("Failed to fetch event list for user:", err.message);
      throw new Error("Failed to fetch event list for user.");
    }
  }

  public async getEvents(): Promise<IEvent[]> {
    return await EventModel.find();
  }

  public async getEventById(eventID: string): Promise<IEvent> {
    const event = await EventModel.findById(eventID);
    if (!event) throw new Error("Event not found");
    return event;
  }

  public async createEvent(eventData: Partial<IEvent>): Promise<IEvent> {
    const newEvent = new EventModel(eventData);
    await newEvent.save();
    return newEvent;
  }

  public async updateEvent(
    eventID: string,
    updates: Partial<IEvent>
  ): Promise<IEvent> {
    const updatedEvent = await EventModel.findByIdAndUpdate(eventID, updates, {
      new: true,
    });
    if (!updatedEvent) throw new Error("Event not found");
    return updatedEvent;
  }

  public async deleteEvent(eventID: string): Promise<IEvent> {
    const deletedEvent = await EventModel.findByIdAndDelete(eventID);
    if (!deletedEvent) throw new Error("Event not found");
    return deletedEvent;
  }

  public async addUserToEvent(
    userID: string,
    eventID: string,
    role: string
  ): Promise<void> {
    try {
      await this.servicesClient.assignUserRole(userID, eventID, role);
    } catch (error: any) {
      throw error;
    }
  }
    public async removeUserFromEvent(
    userID: string,
    eventID: string,
    role: string
  ): Promise<void> {
    try {
      await this.servicesClient.unassignUserRole(userID, eventID, role);
    } catch (error: any) {
      throw error;
    }
  }
public async addSession(eventID: string, session: ISession): Promise<IEvent> {
  try {
    const event = await EventModel.findById(eventID);
    if (!event) {
      throw new Error("Event not found.");
    }

    event.agenda.push(session);
    await event.save();
    return event;
  } catch (error: any) {
    throw new Error(`Failed to add session: ${error.message}`);
  }
}

// Remove a session from the agenda
public async removeSessionByTitle(eventID: string, title: string): Promise<IEvent> {
  try {
    const event = await EventModel.findById(eventID);
    if (!event) {
      throw new Error("Event not found.");
    }

    const sessionIndex = event.agenda.findIndex((session) => session.title === title);
    if (sessionIndex === -1) {
      throw new Error("Session not found.");
    }

    event.agenda.splice(sessionIndex, 1);
    await event.save();
    return event;
  } catch (error: any) {
    throw new Error(`Failed to remove session: ${error.message}`);
  }
}
}

export default EventService;
