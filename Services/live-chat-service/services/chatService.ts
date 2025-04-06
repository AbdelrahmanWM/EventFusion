import { IChat } from "../interfaces/IChat";
import { IChatService } from "../interfaces/IChatService";
import Chat from "../models/chat";
/**
 * Singleton design pattern:
 * Only one instance of user service is needed
 *
 */
class ChatService implements IChatService {
  static instance: IChatService | null = null;

  public static getInstance(): IChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  private constructor() {}
  public async getChat(chatID: string): Promise<IChat> {
    try {
      const chat: IChat | null = await Chat.findById(chatID);
      if (!chat) {
        throw new Error("Chat not found.");
      }
      return chat;
    } catch (error: any) {
      throw new Error("Failed to fetch chat: " + error.message);
    }
  }
  public async getEventChat(eventID: string): Promise<IChat> {
    try {
      const chat: IChat | null = await Chat.findOne({ eventID: eventID });
      if (!chat) {
        throw new Error("Chat not found.");
      }
      return chat;
    } catch (error: any) {
      throw new Error("Failed to fetch chat: " + error.message);
    }
  }
  public async createChat(eventID: string): Promise<IChat> {
    try {
      if (!eventID) {
        throw new Error("EventID is required");
      }
      const newChat = new Chat({
        eventID,
        comments: [
          {
            username: "System",
            userID: null,
            comment:
              "Welcome to the chat! Feel free to start the conversation and engage with others.",
            date: new Date(),
            isHidden: false,
          },
        ],
      });
      await newChat.save();
      return newChat;
    } catch (error: any) {
      throw new Error(`Failed to create chat: ${error.message}`);
    }
  }
  public async addMessage(
    eventID: string,
    username: string,
    userID: string,
    comment: string,
    date: string
  ): Promise<IChat> {
    try {
      const chat: IChat | null = await Chat.findOne({eventID:eventID});
      if (!chat) {
        throw new Error("Chat not found");
      }
      chat.comments.push({
        username,
        userID,
        comment,
        date: new Date(date),
        isHidden: false,
      });

      await chat.save();
      return chat;
    } catch (error: any) {
      throw new error(`Failed to add new message: ${error.message}`);
    }
  }

  public async hideUserComment(
    eventID: string,
    userID: string,
    date: string
  ): Promise<IChat> {
      try {

    const chat = await Chat.findOne({eventID:eventID});
    if (!chat) {
      throw new Error("Chat not found" );
    }

    const messageToHide = chat.comments.find(
      (comment) =>
        comment.userID.toString() === userID &&
        new Date(comment.date).toISOString() === new Date(date).toISOString()
    );

    if (!messageToHide) {
      throw new Error("Message to hid not found" );
    }
    messageToHide.isHidden = true;

    await chat.save();
    return chat
  } catch (error:any) {
    throw new Error(`Failed to hide chat message: ${error.message}`)
  }

  }
  public async deleteChat(eventID: String): Promise<IChat> {
    try {
      const chat: IChat | null = await Chat.findOneAndDelete({
        eventID: eventID
      });
      if (!chat) {
        throw new Error("Chat not found");
      }
      return chat;
    } catch (error: any) {
      throw new Error(`Failed to delete chat: ${error.message}`);
    }
  }

}

export default ChatService;
