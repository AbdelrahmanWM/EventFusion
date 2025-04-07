import Config from "../config/config";
import { DotenvStorageService } from "../../storage-service/services/envStorageService";
import { IChatService } from "../interfaces/IChatService";
import  { ChatController } from "../controllers/chatController";
import MongoDB from "shared/database/MongoDB";
import ChatService from "../services/chatService";
import ChatRouter from "../routes/chatRoute";

export default class Setup {
  public static async setup() {
    const storageService: DotenvStorageService =
      DotenvStorageService.getInstance();
    const config: Config = Config.getInstance(storageService);
    const chatService: IChatService = ChatService.getInstance();
    const chatController = ChatController.getInstance(chatService);
    const chatRouter = ChatRouter.getInstance(chatController);

    await MongoDB.getInstance(storageService);
    return { config,chatRouter,chatService };
  }
}
