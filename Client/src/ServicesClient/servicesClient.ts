/* eslint-disable @typescript-eslint/no-explicit-any */

// Singleton
class ServiceClient {
  private static instance: ServiceClient;

  private baseURL: string;

  private constructor(baseURL: string) {
    this.baseURL = baseURL;
  }
  public static getInstance(baseURL: string) {
    if (!ServiceClient.instance) {
      ServiceClient.instance = new ServiceClient(baseURL);
    }
    return ServiceClient.instance;
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

  // Auth Service Endpoints
  public async login(username: string, password: string) {
    try {
      return await this.post("/users/authenticate/login", { username, password });
    } catch {
      return null;
    }
  }
  public async verifyToken(jsonWebToken: string): Promise<boolean> {
    try {
      const response = await this.get(
        "/users/authenticate/verifyToken",
        ServiceClient.getAuthHeaders(jsonWebToken)
      );
      if ( response.error) {
        return false;
      }
      return true;
    } catch (error: any) {
      console.log(error);
      return false;
    }
  }

  // User Service Endpoints
  public async getUserByUsername(username: string, jsonWebToken: string) {
    try {
      return await this.get(
        `/users/${username}`,
        ServiceClient.getAuthHeaders(jsonWebToken)
      );
    } catch {
      return null;
    }
  }
  
  public async createUser(userData: any) {
    try {
      return await this.post("/users", userData);
    } catch {
      return null;
    }
  }
  
  public async updateUser(
    username: string,
    userData: any,
    jsonWebToken: string
  ) {
    try {
      return await this.put(
        `/users/${username}`,
        userData,
        ServiceClient.getAuthHeaders(jsonWebToken)
      );
    } catch {
      return null;
    }
  }
  public async deleteUser(username: string, jsonWebToken: string) {
    try {
      return await this.delete(
        `/users/${username}`,
        ServiceClient.getAuthHeaders(jsonWebToken)
      );
    } catch {
      return null;
    }
  }
  
  public async getUserList(jsonWebToken: string) {
    try {
      return await this.get("/users", ServiceClient.getAuthHeaders(jsonWebToken));
    } catch {
      return null;
    }
  }

  // ========================== //
  // Role Service Endpoints    //
  // ========================== //

 // Role Service Methods
public async getRolesByEvent(
  eventID: string,
  headers?: Record<string, string>
) {
  try {
    return await this.get(`/roles/${eventID}`, headers);
  } catch {
    return null;
  }
}

public async getUserRolesByEvent(
  eventID: string,
  userID: string,
  headers?: Record<string, string>
) {
  try {
    return await this.get(`/roles/${eventID}/users/${userID}`, headers);
  } catch {
    return null;
  }
}

public async createUserRoles(roleData: any, headers?: Record<string, string>) {
  try {
    return await this.post("/roles", roleData, headers);
  } catch {
    return null;
  }
}

public async assignUserRole(
  userID: string,
  eventID: string,
  role: string,
  headers?: Record<string, string>
) {
  try {
    return await this.put(
      "/roles/assignRole",
      { userID, eventID, role },
      headers
    );
  } catch {
    return null;
  }
}

public async unassignUserRole(
  userID: string,
  eventID: string,
  role: string,
  headers?: Record<string, string>
) {
  try {
    return await this.put(
      "/roles/unassignRole",
      { userID, eventID, role },
      headers
    );
  } catch {
    return null;
  }
}

public async removeUserRoles(
  userID: string,
  eventID: string,
  headers?: Record<string, string>
) {
  try {
    return await this.delete(`/roles/${eventID}/users/${userID}`, headers);
  } catch {
    return null;
  }
}


  private static getAuthHeaders(jsonWebToken: string): Record<string, string> {
    return {
      Authorization: `Bearer ${jsonWebToken}`,
    };
  }

/// Event Service Methods
public async getEvents() {
  try {
    return await this.get(
      `/events` 
    );
  } catch {
    return null;
  }
}

public async getEventById(eventID: string) {
  try {
    return await this.get(
      `/events/${eventID}`
    );
  } catch {
    return null;
  }
}

public async createEvent(eventData: any) {
  try {
    return await this.post(`/events`, eventData);
  } catch {
    return null;
  }
}

public async updateEvent(eventID: string, updates: any, jsonWebToken: string) {
  try {
    return await this.put(
      `/events/${eventID}`,
      updates,
      ServiceClient.getAuthHeaders(jsonWebToken)
    );
  } catch {
    return null;
  }
}

public async deleteEvent(eventID: string, jsonWebToken: string) {
  try {
    return await this.delete(
      `/events/${eventID}`,
      ServiceClient.getAuthHeaders(jsonWebToken)
    );
  } catch {
    return null;
  }
}

public async addUserToEvent(
  eventID: string,
  userID: string,
  role: string,
  jsonWebToken: string
) {
  try {
    return await this.post(
      `/events/${eventID}/users`,
      { userID, role },
      ServiceClient.getAuthHeaders(jsonWebToken)
    );
  } catch {
    return null;
  }
}

public async removeUserFromEvent(
  eventID: string,
  userID: string,
  role: string,
  jsonWebToken: string
) {
  try {
    return await this.delete(
      `/events/${eventID}/users`,
      {
        ...ServiceClient.getAuthHeaders(jsonWebToken),
        "Content-Type": "application/json",
      }
    );
  } catch {
    return null;
  }
}

public async addSession(
  eventID: string,
  sessionData: any,
  jsonWebToken: string
) {
  try {
    return await this.post(
      `/events/${eventID}/agenda`,
      sessionData,
      ServiceClient.getAuthHeaders(jsonWebToken)
    );
  } catch {
    return null;
  }
}

public async removeSessionByTitle(
  eventID: string,
  title: string,
  jsonWebToken: string
) {
  try {
    return await this.delete(
      `/events/${eventID}/agenda`,
      {
        ...ServiceClient.getAuthHeaders(jsonWebToken),
        "Content-Type": "application/json",
      }
    );
  } catch {
    return null;
  }
}

public async getEventListForUserByRole(
  userID: string,
  role: string,
  jsonWebToken: string
) {
  try {
    return await this.get(
      `/events/user/${userID}?role=${role}`,
      ServiceClient.getAuthHeaders(jsonWebToken)
    );
  } catch {
    return null;
  }
}
}

export default ServiceClient;
