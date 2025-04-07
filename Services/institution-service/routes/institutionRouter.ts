import { Router } from "express";
import InstitutionController from "institution-service/controllers/institutionController";
// Singleton, Dependency Injection, Separation of Concerns
export default class InstitutionRouter {
  private static instance: InstitutionRouter;
  private institutionController: InstitutionController;
  private router: Router;

  private constructor(institutionController: InstitutionController) {
    this.router = Router();
    this.institutionController = institutionController;
    this.bindRoutes();
  }

  public static getInstance(institutionController: InstitutionController): InstitutionRouter {
    if (!InstitutionRouter.instance) {
      InstitutionRouter.instance = new InstitutionRouter(institutionController);
    }
    return InstitutionRouter.instance;
  }

  private bindRoutes(): void {
    this.router.get("/", this.institutionController.getInstitutions);
    this.router.get("/:id", this.institutionController.getInstitution);
    this.router.post("/", this.institutionController.createInstitution);
    this.router.put("/:id", this.institutionController.updateInstitution);
    this.router.delete("/:id", this.institutionController.deleteInstitution);
  }

  public getRouter(): Router {
    return this.router;
  }
}