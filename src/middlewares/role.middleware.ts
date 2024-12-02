import {RoleEnum} from "../enums/RoleEnum";
import {NextFunction, Request, Response} from "express";

export const RoleMiddleware = (requiredRole: RoleEnum)=>{
    return(req: Request, res: Response, next:NextFunction): void =>{
        if((req as any).user?.role !== requiredRole) {
             res.status(403).json({message:"you are not accessed to this method"})
            return;
        }
        next();
    }
}