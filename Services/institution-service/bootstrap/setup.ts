import Config from "../config/config";
import { DotenvStorageService } from "../../storage-service/services/envStorageService";
import MongoDB from "shared/database/MongoDB";
import InstitutionService from "institution-service/services/institutionService";
import InstitutionController from "institution-service/controllers/institutionController";
import InstitutionRouter from "institution-service/routes/institutionRouter";

export default class Setup {
  public static async setup() {
    const storageService: DotenvStorageService =
      DotenvStorageService.getInstance();
    const institutionService = InstitutionService.getInstance();
    const institutionController = InstitutionController.getInstance(institutionService);
    const institutuionRouter = InstitutionRouter.getInstance(institutionController);
    const config: Config = Config.getInstance(storageService);
  
    await MongoDB.getInstance(storageService);
    return { config, institutuionRouter };
  }
}
