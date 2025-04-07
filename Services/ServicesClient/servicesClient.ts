class ServicesClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private getFetch(): typeof fetch {
    return fetch;
  }

  private async get(endpoint: string, headers?: Record<string, string>) {
    try {
      const response = await this.getFetch()(this.baseURL + endpoint, {
        method: "GET",
        headers: {
          ...headers,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch from ${endpoint}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error in GET request:", error);
      throw error;
    }
  }

  private async post(
    endpoint: string,
    body: any,
    headers?: Record<string, string>
  ) {
    try {
      const response = await this.getFetch()(this.baseURL + endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Failed to post to ${endpoint}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error in POST request:", error);
      throw error;
    }
  }

  private async put(
    endpoint: string,
    body: any,
    headers?: Record<string, string>
  ) {
    try {
      const response = await this.getFetch()(this.baseURL + endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Failed to put to ${endpoint}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error in PUT request:", error);
      throw error;
    }
  }

  private async delete(endpoint: string, headers?: Record<string, string>) {
    try {
      const response = await this.getFetch()(this.baseURL + endpoint, {
        method: "DELETE",
        headers: {
          ...headers,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete at ${endpoint}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error in DELETE request:", error);
      throw error;
    }
  }

  // ========================== //
  // Backend Service Endpoints  //
  // ========================== //
 // ========================== //
  // Role Service Endpoints    //
  // ========================== //

  // Fetch roles by event ID
  public async getRolesByEvent(
    eventID: string,
    headers?: Record<string, string>
  ) {
    return await this.get(`/roles/${eventID}`, headers);
  }
  public async getRolesByUser(
    userID: string,
    headers?: Record<string, string>
  ) {
    return await this.get(`/roles/users/${userID}`, headers);
  }
  // Fetch user roles by event and user ID
  public async getUserRolesByEvent(
    eventID: string,
    userID: string,
    headers?: Record<string, string>
  ) {
    return await this.get(`/roles/${eventID}/users/${userID}`, headers);
  }
  

  // Create new roles
  public async createUserRoles(
    roleData: any,
    headers?: Record<string, string>
  ) {
    return await this.post("/roles", roleData, headers);
  }

  // Assign a role to a user for a specific event
  public async assignUserRole(
    userID: string,
    eventID: string,
    role: string,
    headers?: Record<string, string>
  ) {
    return await this.put(
      "/roles/assignRole",
      { userID, eventID, role },
      headers
    );
  }

  // Unassign a role from a user for a specific event
  public async unassignUserRole(
    userID: string,
    eventID: string,
    role: string,
    headers?: Record<string, string>
  ) {
    return await this.put(
      "/roles/unassignRole",
      { userID, eventID, role },
      headers
    );
  }

  // Remove all roles for a user for a specific event
  public async removeUserRoles(
    userID: string,
    eventID: string,
    headers?: Record<string, string>
  ) {
    return await this.delete(`/roles/${eventID}/users/${userID}`, headers);
  }

  private static getAuthHeaders(jsonWebToken: string): Record<string, string> {
    return {
      Authorization: `Bearer ${jsonWebToken}`,
    };
  }
}

export default ServicesClient;