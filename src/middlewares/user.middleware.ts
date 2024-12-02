import {NextFunction, Request, Response} from "express";
import {UserValidator} from "../user.validator";
import {ApiError} from "../errors/api.error";

class UserMiddleware{
    public async isValidRegister(req:Request, res:Response, next:NextFunction):Promise<void>{
        try{
            const { error } = UserValidator.createUser.validate(req.body)
            if(error){
                throw new ApiError(error.message,400)
            }
            next()
        }catch(e){
            next(e)
        }
    }
}

export const userMiddleware = new UserMiddleware()