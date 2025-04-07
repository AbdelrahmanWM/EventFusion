import { IEvent } from "event-service/interfaces/IEvent";
import { IEventService } from "event-service/interfaces/IEventService";
import Event from "event-service/models/event";
/**
 * Singleton design pattern:
 * Only one instance of user service is needed
 *
 */
class EventService implements IEventService {
  static instance: EventService | null = null;
  private constructor() {}
  public static getInstance(): EventService {
    if (!EventService.instance) {
      EventService.instance = new EventService();
    }
    return EventService.instance;
  }

  async getEventList(): Promise<IEvent[]> {
    try{
        const events: IEvent[] = await Event.find();
        if(events.length==0){
            throw new Error("No events found.");
        }
        return events;
    }catch(error: any){
        throw new Error(`Failed to fetch events: ${error.message}`);
    }
  }
  async getEventListForUser(userID: string): Promise<IEvent[]> {
    const userRolesEvents=await
    
  }
  getEventListForUserByRole(): Promise<IEvent[]> {
    throw new Error("Method not implemented.");
  }
  getEvent(): Promise<IEvent | null> {
    throw new Error("Method not implemented.");
  }
  createEvent(eventDate: IEvent): Promise<IEvent> {
    throw new Error("Method not implemented.");
  }
  updateEvent(
    eventId: string,
    updates: Partial<IEvent>
  ): Promise<IEvent | null> {
    throw new Error("Method not implemented.");
  }
  deleteEvent(eventId: string): Promise<IEvent | null> {
    throw new Error("Method not implemented.");
  }

  async getUserByUsername(username: string): Promise<IUser | null> {
    try {
      const matching = await User.find({ username: username });
      if (!matching) {
        throw new Error("User not found.");
      }
      const user: IUser | null = matching[0];
      if (!user) {
        throw new Error("User not found.");
      }
      return user;
    } catch (error: any) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  }
  async createUser(userDate: IUser): Promise<IUser> {
    try {
      const user = new User(userDate);
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      await user.save();
      return user;
    } catch (error: any) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }
  async updateUser(
    username: string,
    updates: Partial<IUser>
  ): Promise<IUser | null> {
    try {
      const user: IUser | null = await User.findOneAndUpdate(
        { username: username },
        updates,
        { new: true }
      );
      if (!user) {
        throw new Error("User not found.");
      }
      return user;
    } catch (error: any) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  async deleteUser(username: String): Promise<IUser | null> {
    try {
      const user: IUser | null = await User.findOneAndDelete({
        username: username,
      });
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error: any) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  }
  async comparePasswords(
    inputPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    try {
      const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
      return isMatch;
    } catch (error: any) {
      throw new Error(`Error comparing passwords: ${error.message}`);
    }
  }
}

export default UserService;
