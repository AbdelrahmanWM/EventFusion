import MongoDB from "common-utilities/MongoDB";
import Setup from "../bootstrap/setup";
import UserServiceApp from "./userServiceApp";

class Main {
  public static async main() {
    const { config, passportJWTStrategy, userRouter, authRouter} =
    await Setup.setup();
    const userServiceApp: UserServiceApp = UserServiceApp.getInstance(
      config,
      passportJWTStrategy,
      userRouter,
      authRouter
    );
    userServiceApp.start();
  }
}

Main.main();
