import {IUser} from "../controllers/user.controller"
import {User} from "../models/User.model";


class UserService{
    public async create(data:IUser):Promise<IUser>{
        return User.create({...data}) as unknown as IUser
    }
}

export const userService = new UserService()