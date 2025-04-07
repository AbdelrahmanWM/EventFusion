import { Router } from "express";
import RoleController from "role-service/controllers/roleController";

// singleton
// Dependency Injection
// Separation of concerns
export default class RoleRouter {
  private static instance: RoleRouter;
  private roleController: RoleController;
  private router: Router;
  private constructor(roleController: RoleController) {
    this.router = Router();
    this.roleController = roleController;
    this.bindRoutes();
  }
  public static getInstance(roleController: RoleController): RoleRouter {
    if (!RoleRouter.instance) {
      RoleRouter.instance = new RoleRouter(roleController);
    }
    return RoleRouter.instance;
  }

  private bindRoutes(): void {
    this.router.get("/:eventID", this.roleController.getRolesByEvent);
    this.router.get("/users/:userID", this.roleController.getRolesByUser);
    this.router.get(
      "/:eventID/users/:userID",
      this.roleController.getUserRolesByEvent
    );
    this.router.post("/", this.roleController.createUserRoles);
    this.router.put("/assignRole", this.roleController.assignUserRole);
    this.router.put("/unassignRole", this.roleController.unassignUserRole);
    this.router.delete(
      "/:eventID/users/:userID",
      this.roleController.removeUserRoles
    );
  }
  public getRouter(): Router {
    return this.router;
  }
}
