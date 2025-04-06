import Config from "config";
import express, { Application, Request, Response, NextFunction } from "express";
import proxy, { ProxyOptions } from "express-http-proxy";
import { sendErrorResponse } from "shared/utilities/Response"; 
import http, { IncomingMessage, Server as HTTPServer } from "http";
import httpProxy from "http-proxy";
import cors from "cors";
import { Socket } from "net";

/**
 * APIGateway Class Design Patterns:
 * 1. Singleton Pattern: Ensures that only one instance of the gateway is created.
 * 2. Facade Pattern: Unified interface for routing to backend services.
 * 3. Proxy Pattern: Acts as intermediary with `express-http-proxy` and `http-proxy`.
 * 4. Factory Method Pattern: `formURL` constructs dynamic service URLs.
 * 5. Middleware Design: Adds CORS, JSON parsing, and error handling.
 */

class APIGateway {
  private static instance: APIGateway;
  private app: Application;
  private config: Config;
  private proxyServer;
  private server: HTTPServer;

  private constructor(config: Config) {
    this.app = express();
    this.config = config;

    this.proxyServer = httpProxy.createProxyServer({ ws: true });
    this.server = http.createServer(this.app);

    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
    this.setupWebSocketProxy();
  }

  public static getInstance(config: Config): APIGateway {
    if (!this.instance) {
      this.instance = new APIGateway(config);
    }
    return APIGateway.instance;
  }

  private setupMiddleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private setupRoutes() {
    try {
      const baseURL = this.config.getBaseURL();
      const userServiceURL = APIGateway.formURL(baseURL, this.config.getUserServicePort());
      const eventServiceURL = APIGateway.formURL(baseURL, this.config.getEventServicePort());
      const roleServiceURL = APIGateway.formURL(baseURL, this.config.getRoleServicePort());
      const paymentServiceURL = APIGateway.formURL(baseURL, this.config.getPaymentServicePort());
      const liveChatServiceURL = APIGateway.formURL(baseURL, this.config.getLiveChatServicePort());

      this.app.use("/users", proxy(userServiceURL, this.proxyOptions));
      this.app.use("/events", proxy(eventServiceURL, this.proxyOptions));
      this.app.use("/roles", proxy(roleServiceURL, this.proxyOptions));
      this.app.use("/payment",proxy(paymentServiceURL,this.proxyOptions));
      this.app.use("/livechat",proxy(liveChatServiceURL,this.proxyOptions));

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

  private setupWebSocketProxy() {
    const liveChatServiceURL = APIGateway.formURL(
      this.config.getBaseURL(),
      this.config.getLiveChatServicePort()
    );

    this.proxyServer.on("error", (err:any) => {
      console.error("WebSocket Proxy Error:", err);
    });

    this.server.on(
      "upgrade",
      (req: IncomingMessage, socket: Socket, head: Buffer) => {
        if (req.url?.startsWith("/livechat/socket.io")) {
        console.log(`Proxying WebSocket connection to ${liveChatServiceURL}`);
        this.proxyServer.ws(req, socket, head, {
          target: liveChatServiceURL,
        });
      }
      }
    );
  }

  public start() {
    try {
      const port = this.config.getPort();
      this.server.listen(port, () => {
        console.log(`API Gateway running on port ${port}`);
      });
    } catch (err: any) {
      throw err;
    }
  }
}

export default APIGateway;
