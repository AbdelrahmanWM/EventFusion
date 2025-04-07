import { Request, Response } from "express";
import {IInstitutionService} from "institution-service/interfaces/IInstitutionService";
import { sendSuccessResponse, sendErrorResponse } from "../../shared/utilities/Response";

export class InstitutionController {
  private static instance: InstitutionController;
  institutionService: IInstitutionService;

  private constructor(institutionService: IInstitutionService) {
    this.institutionService = institutionService;
  }

  public static getInstance(institutionService: IInstitutionService): InstitutionController {
    if (!InstitutionController.instance) {
      InstitutionController.instance = new InstitutionController(institutionService);
    }
    return InstitutionController.instance;
  }

  public getInstitutions = async (req: Request, res: Response): Promise<void> => {
    try {
      const institutions = await this.institutionService.getInstitutions();
      sendSuccessResponse(res, "Successfully fetched institutions.", institutions, 200);
    } catch (error) {
      sendErrorResponse(res, "Failed to fetch institutions.", error, 500);
    }
  };

  public getInstitution = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const institution = await this.institutionService.getInstitution(id);
      sendSuccessResponse(res, "Successfully fetched institution details.", institution, 200);
    } catch (error) {
      sendErrorResponse(res, "Failed to fetch institution.", error, 404);
    }
  };

  public createInstitution = async (req: Request, res: Response): Promise<void> => {
    const { name, description, members, contactInfo } = req.body;
    try {
      const institution = await this.institutionService.createInstitution(
        name,
        description,
        members,
        contactInfo
      );
      sendSuccessResponse(res, "Successfully created institution.", institution, 201);
    } catch (error) {
      sendErrorResponse(res, "Failed to create institution.", error, 500);
    }
  };

  public updateInstitution = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updates = req.body;
    try {
      const updatedInstitution = await this.institutionService.updateInstitution(id, updates);
      sendSuccessResponse(res, "Successfully updated institution.", updatedInstitution, 200);
    } catch (error) {
      sendErrorResponse(res, "Failed to update institution.", error, 404);
    }
  };

  public deleteInstitution = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const deletedInstitution = await this.institutionService.deleteInstitution(id);
      sendSuccessResponse(res, "Successfully deleted institution.", deletedInstitution, 200);
    } catch (error) {
      sendErrorResponse(res, "Failed to delete institution.", error, 404);
    }
  };
}

export default InstitutionController;