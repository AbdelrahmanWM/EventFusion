import { IInstitution } from "./IInstitution";

export interface IInstitutionService{
  getInstitutions(): Promise<IInstitution[]>; 

  getInstitution(id: string): Promise<IInstitution>;

  createInstitution(
    name: string,
    description: string,
    members: string[],
    contactInfo: string
  ): Promise<IInstitution> 

  updateInstitution(
    id: string,
    updates: Partial<IInstitution>
  ): Promise<IInstitution>;

  deleteInstitution(id: string): Promise<IInstitution>; 
}