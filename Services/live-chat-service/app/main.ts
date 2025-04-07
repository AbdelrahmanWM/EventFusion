import MongoDB from "shared/database/MongoDB";
import Setup from "../bootstrap/setup";
import ChatServiceApp from "./chatServiceApp";

class Main {
  public static async main() {
    const { config, chatRouter,chatService } =
      await Setup.setup();
    const chatServiceApp: ChatServiceApp = ChatServiceApp.getInstance(
      config,
      chatRouter,
      chatService
    );
    chatServiceApp.start();
  }
}

Main.main();
