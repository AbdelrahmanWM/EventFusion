import { Request,Response, NextFunction } from "express";
import passport from "passport";
import { sendErrorResponse } from "../../common-utilities/Response";
import { IUser } from "../interfaces/IUser";

export class AuthenticateJWT {
    private static instance: AuthenticateJWT
    private constructor(){}
    public static getInstance():AuthenticateJWT{
        if(!AuthenticateJWT.instance){
            AuthenticateJWT.instance=new AuthenticateJWT();
        }
        return AuthenticateJWT.instance;
    }
    public authenticate=(req: Request,res:Response,next: NextFunction)=>{
        passport.authenticate("jwt",{session:false},(err: Error,user: IUser)=>{
            if(err || !user){
                const errorMessage = err ? "Authentication failed" : "User not authorized";
                return sendErrorResponse(res,errorMessage,err,401)
            }
            req.user=user;
            next();
        })(req,res,next);
    };
}

// declare global {
//   namespace Express {
//     interface Request {
//       user?: any; // Replace `any` with the actual user type/interface
//     }
//   }
// }
