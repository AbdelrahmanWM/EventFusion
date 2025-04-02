import { Response } from "express";


export const sendSuccessResponse = (
    res: Response,
    message: string,
    data: any=null,
    statusCode: number = 200,
    code: string = "SUCCESS"
):void=>{
    res.status(statusCode).json({
        status:"success",
        message,
        code,
        data
    });
};

export const sendErrorResponse = (
    res:Response,
    message: string,
    error:any=null,
    statusCode:number=500,
    code: string = "ERROR"
):void =>{
    const responsePayload: any = {
        status:"error",
        message,
        code
    }
    if(process.env.NODE_ENV!=="production" && error){
        responsePayload.stack=error.stack||error;
    }
    res.status(statusCode).json(responsePayload);
}

