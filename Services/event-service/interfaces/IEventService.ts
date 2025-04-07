import { IEvent } from "./IEvent";

export interface IEventService {
    getEventList(): Promise<IEvent[]>;
    getEventListForUser(username: string):Promise<IEvent[]>;
    getEventListForUserByRole(username: string, role: string):Promise<IEvent[]>;
    getEvent():Promise<IEvent|null>;
    createEvent(eventDate: IEvent):Promise<IEvent>;
    updateEvent(eventId: string, updates: Partial<IEvent>): Promise<IEvent|null>;
    deleteEvent(eventId: string):Promise<IEvent|null>;
}