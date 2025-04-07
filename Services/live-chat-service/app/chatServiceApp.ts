import express, { Application, Request, Response, NextFunction } from "express";
import Config from "../config/config";
import cors from "cors";
import ConsoleLoggerService from "../../logger-service/services/consoleLoggerService";
import ChatRouter from "../routes/chatRoute";
import {createServer, Server as HTTPServer} from "http";
import {Server as SocketIOServer} from "socket.io";
import SocketService from "live-chat-service/services/socketService";
import { IChatService } from "live-chat-service/interfaces/IChatService";
import ChatService from "live-chat-service/services/chatService";

class ChatServiceApp {
  private static instance: ChatServiceApp;

  private app: Application;
  private httpServer: HTTPServer;
  private io: SocketIOServer;
  private port: number;
  private config: Config;
  private chatService: IChatService;
  private chatRouter: ChatRouter;

  private constructor(
    config: Config,
    chatRouter: ChatRouter,
    chatService: IChatService,
  ) {
    this.app = express();
    this.config = config;
    this.port = this.config.getPort();
    this.chatRouter = chatRouter;
    this.chatService = chatService;

    // Initializing middleware and routes
    this.initializeMiddleware();
    this.initializeRoutes();

    this.httpServer=createServer(this.app);
    this.io=new SocketIOServer(this.httpServer,{
      cors:{
        origin:"*",
      }
    });
    // Socket logic
    new SocketService(this.io,this.chatService);
  }

  public static getInstance(
    config: Config,
    chatRouter: ChatRouter,
    chatService: ChatService,
  ): ChatServiceApp {
    if (!ChatServiceApp.instance) 
      ChatServiceApp.instance = new ChatServiceApp(
        config,
        chatRouter,
        chatService,
      );
    return ChatServiceApp.instance;
  }
  private initializeMiddleware(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }
  private initializeRoutes(): void {
    this.app.use("/", this.chatRouter.getRouter());
  }
  public start(): void {
    this.httpServer.listen(this.port, () => {
      ConsoleLoggerService.log(`Server running on port ${this.port}`);
    });
  }
}

export default ChatServiceApp;
