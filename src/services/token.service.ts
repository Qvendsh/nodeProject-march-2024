import * as jwt from "jsonwebtoken"
import {IJWT} from "../controllers/auth.controller";

interface IToken{
    email: string
}

class TokenService{
    public generatetokensPair(payload: IToken):IJWT{
        const accessToken =  jwt.sign(payload, "Access", {
            expiresIn: "15m"
        })
        const refreshToken =  jwt.sign(payload, "Refresh", {
            expiresIn: "10d"
        })

        return {
            accessToken,
            refreshToken
        }
    }
}

export const tokenService = new TokenService()