import { Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../shared/utilities/Response";
import { IChatService } from "../interfaces/IChatService";

// Dependency Injection Pattern
// Injecting an instance of IUserService into each route handler function
// Allows for easier mock testing/ swapping of user service if needed

// Service Layer pattern
// business logic abstracts away from controllers via IUserService interface
// and implemented by UserService

export class ChatController {
  private static instance: ChatController;

  chatService: IChatService;
  private constructor(chatService: IChatService) {
    this.chatService = chatService;
  }
  public static getInstance(chatService: IChatService): ChatController {
    if (!ChatController.instance) {
      ChatController.instance = new ChatController(chatService);
    }
    return ChatController.instance;
  }

  public chat_detail = async (req: Request, res: Response): Promise<void> => {
    const { chatID } = req.params;
    try {
      const chat = await this.chatService.getChat(chatID);
      sendSuccessResponse(res, "Successfully fetched chat details.", chat, 200);
    } catch (error) {
      sendErrorResponse(res, "Chat not found.", error, 404);
    }
  };
  public event_chat_detail = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { eventID } = req.params;
    try {
      const chat = await this.chatService.getEventChat(eventID);
      sendSuccessResponse(res, "Successfully fetched chat details.", chat, 200);
    } catch (error) {
      sendErrorResponse(res, "Chat not found.", error, 404);
    }
  };

  public chat_create = async (req: Request, res: Response): Promise<void> => {
    const eventID = req.params.eventID;
    try {
      const chat = await this.chatService.createChat(eventID);
      sendSuccessResponse(res, "Successfully created the chat.", chat, 201);
    } catch (error) {
      sendErrorResponse(res, "Failed to create chat.", error, 500);
    }
  };

  public chat_add_message = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { username, userID, comment, date } = req.body;
    const eventID = req.params.eventID;
    console.log(req.body); // Log incoming data to check what is being sent
    console.log(req.params.eventID); // Check eventID param

    try {
      const chat = await this.chatService.addMessage(
        eventID,
        username,
        userID,
        comment,
        date
      );
      sendSuccessResponse(
        res,
        "Successfully added comment to chat.",
        chat,
        200
      );
    } catch (error) {
      sendErrorResponse(res, "Failed to update chat.", error, 500);
    }
  };
  public chat_hide_message = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { userID, date } = req.body;
    const eventID = req.params.eventID;
    try {
      const chat = await this.chatService.hideUserComment(
        eventID,
        userID,
        date
      );
      sendSuccessResponse(res, "Successfully hidden chat comment.", chat, 200);
    } catch (error) {
      sendErrorResponse(res, "Failed to update chat.", error, 500);
    }
  };

  public chat_delete = async (req: Request, res: Response): Promise<void> => {
    const eventID = req.params.eventID;
    try {
      const chat = await this.chatService.deleteChat(eventID);
      sendSuccessResponse(res, "Successfully deleted chat.", chat, 200);
    } catch (error) {
      sendErrorResponse(res, "Failed to delete chat.", error, 500);
    }
  };
}

export default ChatController;
