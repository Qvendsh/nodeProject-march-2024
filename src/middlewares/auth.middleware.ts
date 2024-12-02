import {NextFunction, Response, Request} from "express";
import * as jwt from "jsonwebtoken"

export const authUser = (req:Request, res:Response, next:NextFunction):void =>{
    const authHeader = req.headers.authorization
    if(!authHeader){
        res.status(401).json({message:"something went wrong"})
        return
    }
    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        (req as any).user = decoded;
        next();
    }catch (e){
        next(e)
    }
}