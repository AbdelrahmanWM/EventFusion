import { Router } from "express";
import { AuthenticateJWT } from "../middleware/authMiddleware";
import ChatController from "../controllers/chatController";

// singleton
// Dependency Injection
// Separation of concerns
export default class ChatRouter {
  private static instance: ChatRouter;
  private chatController: ChatController;
  private router: Router;
  private constructor(
    chatController: ChatController,
  ) {
    this.router = Router();
    this.chatController = chatController;
    this.bindRoutes();
  }
  public static getInstance(
    userController: ChatController,
  ): ChatRouter {
    if (!ChatRouter.instance) {
      ChatRouter.instance = new ChatRouter(userController);
    }
    return ChatRouter.instance;
  }

  private bindRoutes(): void {
    this.router.get(
      "/:chatID",
      this.chatController.chat_detail
    );
    this.router.get(
      "/event/:eventID",
      this.chatController.event_chat_detail
    )
    this.router.put(
      "/addMessage/:eventID",
      this.chatController.chat_add_message
    );

    this.router.put(
      "/hideMessage/:eventID",
      this.chatController.chat_hide_message
    );
    this.router.delete(
      "/:eventID",
      this.chatController.chat_delete
    );
    this.router.post("/:eventID", this.chatController.chat_create);
  }
  public getRouter(): Router {
    return this.router;
  }
}
