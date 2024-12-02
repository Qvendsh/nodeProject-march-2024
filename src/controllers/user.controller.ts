import {NextFunction, Request, Response} from "express";
import {userService} from "../services/user.service";
import {User} from "../models/User.model";
import {emailService} from "../services/email.service";
import {StatusEnum} from "../enums/StatusEnum";


export interface IUser{
    id:number,
    name:string,
    email:string,
    password:string,
    status: StatusEnum
}

class UserController {
    public async create(req: Request, res: Response, next: NextFunction): Promise<Response<IUser>> {
        try {
            const createdUser = await userService.create(req.body)

            return res.status(201).json(createdUser)
        } catch (e) {
            next(e)
        }
    }

    public async banUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const {id} = req.params;
        try {

            const user = await User.findByPk(id);

            user.status = StatusEnum.Banned
            await user.save();

            await emailService.sendEmail(user.email, "your account has been banned")
            res.status(200).json({message: `User ${id} has been banned successfully`});
        } catch (error) {
            next(error);
        }
    }
}
export const userController = new UserController()