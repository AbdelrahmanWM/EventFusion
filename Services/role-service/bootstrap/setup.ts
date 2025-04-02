import Config from "../config/config";
import { DotenvStorageService } from "../../storage-service/services/envStorageService";
import MongoDB from "shared/database/MongoDB";
import { IRoleService } from "role-service/interfaces/IRoleService";
import RoleService from "role-service/services/roleService";
import RoleController from "role-service/controllers/roleController";
import RoleRouter from "role-service/routes/roleRoute";

export default class Setup {
  public static async setup() {
    const storageService: DotenvStorageService =
      DotenvStorageService.getInstance();
    const config: Config = Config.getInstance(storageService);
    const roleService: IRoleService = RoleService.getInstance();
    const roleController: RoleController =
      RoleController.getInstance(roleService);
    const roleRouter: RoleRouter = RoleRouter.getInstance(roleController);
    await MongoDB.getInstance(storageService);
    return { config, roleRouter };
  }
}
