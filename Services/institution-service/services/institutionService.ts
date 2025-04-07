import { IInstitutionService } from "institution-service/interfaces/IInstitutionService";
import { IInstitution } from "../interfaces/IInstitution";
import InstitutionModel from "institution-service/models/institution";

class InstitutionService implements IInstitutionService {
  static instance: InstitutionService | null = null;

  public static getInstance(): InstitutionService {
    if (!InstitutionService.instance) {
      InstitutionService.instance = new InstitutionService();
    }
    return InstitutionService.instance;
  }

  private constructor() {}

  // Get all institutions
  public async getInstitutions(): Promise<IInstitution[]> {
    try {
      return await InstitutionModel.find().populate("members");
    } catch (error: any) {
      throw new Error("Failed to fetch institutions: " + error.message);
    }
  }

  // Get a single institution by ID
  public async getInstitution(id: string): Promise<IInstitution> {
    try {
      const institution = await InstitutionModel.findById(id).populate("members");
      if (!institution) {
        throw new Error("Institution not found.");
      }
      return institution;
    } catch (error: any) {
      throw new Error("Failed to fetch institution: " + error.message);
    }
  }

  // Create a new institution
  public async createInstitution(
    name: string,
    description: string,
    members: string[],
    contactInfo: string
  ): Promise<IInstitution> {
    try {
      const newInstitution = new InstitutionModel({ name, description, members, contactInfo });
      await newInstitution.save();
      return newInstitution;
    } catch (error: any) {
      throw new Error("Failed to create institution: " + error.message);
    }
  }

  // Update an institution by ID
  public async updateInstitution(
    id: string,
    updates: Partial<IInstitution>
  ): Promise<IInstitution> {
    try {
      const updatedInstitution = await InstitutionModel.findByIdAndUpdate(id, updates, {
        new: true,
      }).populate("members");
      if (!updatedInstitution) {
        throw new Error("Institution not found.");
      }
      return updatedInstitution;
    } catch (error: any) {
      throw new Error("Failed to update institution: " + error.message);
    }
  }

  // Delete an institution by ID
  public async deleteInstitution(id: string): Promise<IInstitution> {
    try {
      const deletedInstitution = await InstitutionModel.findByIdAndDelete(id);
      if (!deletedInstitution) {
        throw new Error("Institution not found.");
      }
      return deletedInstitution;
    } catch (error: any) {
      throw new Error("Failed to delete institution: " + error.message);
    }
  }
}

export default InstitutionService;