import MongoDB from "common-utilities/MongoDB";
import Setup from "../bootstrap/setup";
import RoleServiceApp from "./app";

class Main {
  public static async main() {
    const { config, roleRouter} =
    await Setup.setup();
    const roleServiceApp: RoleServiceApp = RoleServiceApp.getInstance(
      config,
      roleRouter
    );
    roleServiceApp.start();
  }
}

Main.main();
