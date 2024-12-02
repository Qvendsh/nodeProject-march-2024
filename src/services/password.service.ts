import bcrypt from "bcrypt"

class PasswordService{
    public async hash(passsword:string):Promise<string>{
        return bcrypt.hash(passsword, 7)
    }

    public async compare(password: string, hashedPassword: string):Promise<boolean>{
        return bcrypt.compare(password, hashedPassword)
    }
}

export const passwordService = new PasswordService()