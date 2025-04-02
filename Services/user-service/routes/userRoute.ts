import { Router } from "express";
import { AuthenticateJWT } from "../middleware/authMiddleware";
import UserController from "../controllers/userController";

// singleton
// Dependency Injection
// Separation of concerns
export default class UserRouter{
    private static instance: UserRouter;
    private authenticateJWT: AuthenticateJWT;
    private userController: UserController;
    private router:Router;
    private constructor(userController: UserController,authenticateJWT: AuthenticateJWT){
        this.router=Router();
        this.userController=userController;
        this.authenticateJWT=authenticateJWT;
        this.bindRoutes();
    }
    public static getInstance(userController: UserController,authenticateJWT: AuthenticateJWT):UserRouter{
        if(!UserRouter.instance){
            UserRouter.instance=new UserRouter(userController,authenticateJWT);
        }
        return UserRouter.instance;
    }

    private bindRoutes():void{
        this.router.get("/:username",this.userController.user_detail);
        this.router.put("/:username",this.authenticateJWT.authenticate,this.userController.user_update );
        this.router.delete("/:username", this.authenticateJWT.authenticate,this.userController.user_delete);
        this.router.get("/",this.authenticateJWT.authenticate,this.userController.user_list);
        this.router.post("/",this.userController.user_create);
    }
    public getRouter():Router{
        return this.router;
    } 
}