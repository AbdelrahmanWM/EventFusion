import { IChat } from "./IChat";

export interface IChatService {
  getChat(chatID: string): Promise<IChat>;
  getEventChat(eventID: string):Promise<IChat>;
  createChat(eventID:string): Promise<IChat>;
  addMessage(eventID: string,username: string, userID: string, comment:string, date:string): Promise<IChat>;
  hideUserComment(eventID: string,userID: string, date:string):Promise<IChat>;
  deleteChat(eventID:String): Promise<IChat>;
}
