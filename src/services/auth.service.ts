import {IUser, User} from "../models/User.model";
import {ApiError} from "../errors/api.error";
import {passwordService} from "./password.service";
import {IJWT} from "../controllers/auth.controller";
import {tokenService} from "./token.service";


interface ICredentials{
    email:string,
    password: string
}

class AuthService{
    public async register(body:IUser):Promise<void>{
        try{
            const { password } = body
            const hashedPassword = await passwordService.hash(password)
            await User.create({...body, password: hashedPassword})
        }catch(e){
            throw new ApiError(e.status, e.message)
        }
    }

    public async login(body: ICredentials):Promise<IJWT>{
        try {
            const { password, email } = body
            const user = await User.findOne({ where: {email} })
            if(!user){
                throw new ApiError("Invalid email or password", 401)
            }

            const isMatched = await passwordService.compare(password, user.password)
            if(!isMatched){
                throw new ApiError("Invalid email or password", 401)
            }

            return tokenService.generatetokensPair({email: user.email})

        }catch(e){
            throw new ApiError(e.message, e.status)
        }
    }

}

export const  authService = new AuthService()