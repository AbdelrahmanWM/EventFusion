import MongoDB from "shared/database/MongoDB";
import Setup from "../bootstrap/setup";
import InstitutionServiceApp from "./institutionServiceApp";

class Main {
  public static async main() {
    const { config, institutuionRouter } =
      await Setup.setup();
    const institutionServiceApp: InstitutionServiceApp = InstitutionServiceApp.getInstance(
      config,
      institutuionRouter
    );
    institutionServiceApp.start();
  }
}

Main.main();
