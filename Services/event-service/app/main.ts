import Setup from "../bootstrap/setup";
import EventServiceApp from "./eventServiceApp";

class Main {
  public static async main() {
    const { config, eventRouter, pollRouter, feedbackRouter } =
      await Setup.setup();
    const eventServiceApp: EventServiceApp = EventServiceApp.getInstance(
      config,
      eventRouter,
      pollRouter,
      feedbackRouter
    );
    eventServiceApp.start();
  }
}

Main.main();