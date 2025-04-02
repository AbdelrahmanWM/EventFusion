import ConsoleLoggerService from "logger-service/services/consoleLoggerService";

///// Facade Design pattern
export class RoleServiceClient {
    private static instance: RoleServiceClient;
    private baseURL: string;
  
    private constructor(baseURL: string) {
      this.baseURL = baseURL;
    }
  
    public static getInstance(baseURL: string): RoleServiceClient {
      if (!RoleServiceClient.instance) {
        RoleServiceClient.instance = new RoleServiceClient(baseURL);
      }
      return RoleServiceClient.instance;
    }
  
    async getRolesByEvent(eventID: string) {
      try {
        const response = await fetch(`${this.baseURL}/roles/${eventID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch roles.');
        }
        return await response.json();
      } catch (error) {
        ConsoleLoggerService.logError('Error fetching roles by event:', error);
        throw error;
      }
    }
  
    async getUserRolesByEvent(eventID: string, userID: string) {
      try {
        const response = await fetch(
          `${this.baseURL}/roles/${eventID}/users/${userID}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch user roles.');
        }
        return await response.json();
      } catch (error) {
        ConsoleLoggerService.logError('Error fetching user roles by event:', error);
        throw error;
      }
    }
  
    async createUserRoles(roleData: any) {
      try {
        const response = await fetch(`${this.baseURL}/roles`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(roleData),
        });
        if (!response.ok) {
          throw new Error('Failed to create user roles.');
        }
        return await response.json();
      } catch (error) {
        console.error('Error creating user roles:', error);
        throw error;
      }
    }
  
    async assignUserRole(userID: string, eventID: string, role: string) {
      try {
        const response = await fetch(`${this.baseURL}/roles/assignRole`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userID, eventID, role }),
        });
        if (!response.ok) {
          throw new Error('Failed to assign user role.');
        }
        return await response.json();
      } catch (error) {
        console.error('Error assigning user role:', error);
        throw error;
      }
    }
  
    async unassignUserRole(userID: string, eventID: string, role: string) {
      try {
        const response = await fetch(`${this.baseURL}/roles/unassignRole`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userID, eventID, role }),
        });
        if (!response.ok) {
          throw new Error('Failed to unassign user role.');
        }
        return await response.json();
      } catch (error) {
        console.error('Error unassigning user role:', error);
        throw error;
      }
    }
  
    async removeUserRoles(userID: string, eventID: string) {
      try {
        const response = await fetch(
          `${this.baseURL}/roles/${eventID}/users/${userID}`,
          {
            method: 'DELETE',
          }
        );
        if (!response.ok) {
          throw new Error('Failed to delete user roles.');
        }
        return await response.json();
      } catch (error) {
        console.error('Error removing user roles:', error);
        throw error;
      }
    }
  }
  