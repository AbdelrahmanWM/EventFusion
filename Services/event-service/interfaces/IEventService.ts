import { IEvent } from "./IEvent";
import { ISession } from "./ISession";

export interface IEventService {
  getEventListForUser(userID: string): Promise<IEvent[]>;
  getEventListForUserByRole(userID: string, role: string): Promise<IEvent[]>;
  getEvents(): Promise<IEvent[]>;
  getEventById(eventID: string): Promise<IEvent>;
  createEvent(eventData: Partial<IEvent>): Promise<IEvent>;
  updateEvent(eventID: string, updates: Partial<IEvent>): Promise<IEvent>;
  deleteEvent(eventID: string): Promise<IEvent>;
  addUserToEvent(userID: string, eventID: string, role: string): Promise<void>;
  removeUserFromEvent(
    userID: string,
    eventID: string,
    role: string
  ): Promise<void>;
  addSession(eventID: string, session: ISession): Promise<IEvent>;
  removeSessionByTitle(eventID: string, title: string): Promise<IEvent>;
}
