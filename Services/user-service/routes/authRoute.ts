import { Router} from "express";
import { AuthController } from "../controllers/authController";

// singleton
export default class AuthRouter{
    private static instance: AuthRouter;
    private authController: AuthController;
    private router:Router
    private constructor(authController: AuthController){
        this.router=Router();
        this.authController=authController;
        this.bindRoutes();
    }
    public static getInstance(authController: AuthController):AuthRouter{
        if(!AuthRouter.instance){
            AuthRouter.instance=new AuthRouter(authController);
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
