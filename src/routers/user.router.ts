import {Router} from "express";
import {userController} from "../controllers/user.controller";
import {authUser} from "../middlewares/auth.middleware";
import {RoleMiddleware} from "../middlewares/role.middleware";
import {RoleEnum} from "../enums/RoleEnum";

const router = Router()


router.post('/', userController.create)

router.put("/",authUser,RoleMiddleware(RoleEnum.SuperUser || RoleEnum.Manager) ,  userController.banUser)

export const userRouter = router