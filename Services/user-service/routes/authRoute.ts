import { Router} from "express";
import { AuthController } from "../controllers/authController";
import { AuthenticateJWT } from "user-service/middleware/authMiddleware";

// singleton
export default class AuthRouter{
    private static instance: AuthRouter;
    private authController: AuthController;
private authenticateJWT: AuthenticateJWT;
    private router:Router
    private constructor(authController: AuthController,authenticateJWT: AuthenticateJWT){
        this.router=Router();
        this.authController=authController;
        this.authenticateJWT=authenticateJWT;
        this.bindRoutes();
    }
    public static getInstance(authController: AuthController, authenticateJWT: AuthenticateJWT):AuthRouter{
        if(!AuthRouter.instance){
            AuthRouter.instance=new AuthRouter(authController, authenticateJWT);
        }
        return AuthRouter.instance;
    }

    private bindRoutes():void{
        this.router.post("/login",this.authController.login);
        this.router.get("/verifyToken",this.authenticateJWT.authenticate,this.authController.verifyToken);
    }
    public getRouter():Router{
        return this.router;
    } 
}
