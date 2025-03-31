import { Router} from "express";
import { AuthController } from "../controllers/authController";
import { AuthenticateJWT } from "../middleware/authMiddleware";

// singleton
export default class AuthRouter{
    private static instance: AuthRouter;
    authController: AuthController;
    authenticateJWT: AuthenticateJWT;
    router:Router
    private constructor(authController: AuthController,authenticateJWT: AuthenticateJWT){
        this.router=Router();
        this.authController=authController;
        this.authenticateJWT=authenticateJWT;
        this.bindRoutes();
    }
    public static getInstance(authController: AuthController,authenticateJWT: AuthenticateJWT):AuthRouter{
        if(!AuthRouter.instance){
            AuthRouter.instance=new AuthRouter(authController,authenticateJWT);
        }
        return AuthRouter.instance;
    }

    private bindRoutes():void{
        this.router.post("/login",this.authController.login);
    }
    public getRouter():Router{
        return this.router;
    } 
}
