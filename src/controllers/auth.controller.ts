import {NextFunction, Request, Response} from "express";
import {authService} from "../services/auth.service";

interface IMessage{
    message:string
}

export interface IJWT{
    accessToken: string,
    refreshToken: string
}


class AuthController{
    public async register(req:Request, res:Response, next:NextFunction):Promise<Response<IMessage>>{
        try{
            await authService.register(req.body)
            return res.status(201).json({
                message:"User created"
            })
        }catch (e){
            next(e)
        }
    }


    public async login(req: Request, res: Response, next: NextFunction):Promise<Response<IJWT>>{
        const tokensPair = await authService.login(req.body)
        return res.status(200).json({...tokensPair})
    }
}

export const authController = new AuthController()