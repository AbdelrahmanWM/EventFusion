import Config from "config";
import express, { Application, Request, Response, NextFunction } from "express";
import proxy, { ProxyOptions } from "express-http-proxy";
import { sendErrorResponse } from "shared/utilities/Response";
import * as http from "http"; // Importing http to get RequestOptions

/**
 * APIGateway Class Design Patterns:
 * 1. Singleton Pattern: Ensures that only one instance of the gateway is created (static `getInstance` method).
 * 2. Facade Pattern: Provides a unified interface for routing requests to multiple backend services (`setupRoutes`).
 * 3. Proxy Pattern: Acts as an intermediary to forward requests to backend services (`proxyOptions`).
 * 4. Factory Method Pattern: The `formURL` method constructs service URLs dynamically based on baseURL and port.
 * 5. Middleware Design: Implements error handling and request modification using middleware (`setupErrorHandling` and `proxyReqOptDecorator`).
 */

class APIGateway {
  private static instance: APIGateway;
  private app: Application;
  private config: Config;

  private constructor(config: Config) {
    this.app = express();
    this.config = config;
    this.setupRoutes();
    this.setupErrorHandling();
  }

  public static getInstance(config: Config): APIGateway {
    if (!this.instance) {
      this.instance = new APIGateway(config);
    }
    return APIGateway.instance;
  }

  private setupRoutes() {
    try {
      const baseURL = this.config.getBaseURL();
      const userServicePort = this.config.getUserServicePort();
      const eventServicePort = this.config.getEventServicePort();
      const roleServicePort = this.config.getRoleServicePort();

      const userServiceURL = APIGateway.formURL(baseURL, userServicePort);
      const eventServiceURL = APIGateway.formURL(baseURL, eventServicePort);
      const roleServiceURL = APIGateway.formURL(baseURL, roleServicePort);

      this.app.use("/users", proxy(userServiceURL, this.proxyOptions));
      this.app.use("/events", proxy(eventServiceURL, this.proxyOptions));
      this.app.use("/roles", proxy(roleServiceURL, this.proxyOptions)); // Fix the path here
    } catch (err: any) {
      console.error("Error setting up routes:", err);
      throw err;
    }
  }

  private proxyOptions: ProxyOptions = {
    proxyReqOptDecorator: (
      proxyReqOpts: http.RequestOptions,
      srcReq: Request
    ) => {
      proxyReqOpts.headers = {
        ...proxyReqOpts.headers,
        "X-Custom-Header": "value",
      };
      return proxyReqOpts;
    },
  };

  private setupErrorHandling() {
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error("Internal server error:", err);
        sendErrorResponse(res, "Internal server Error", err, 500);
      }
    );
  }

  private static formURL(baseURL: string, port: number): string {
    return `${baseURL}:${port}`;
  }

  public start() {
    try {
      const port = this.config.getPort();
      this.app.listen(port, () => {
        console.log(`API Gateway running on port ${port}`);
      });
    } catch (err: any) {
      throw err;
    }
  }
}

export default APIGateway;
