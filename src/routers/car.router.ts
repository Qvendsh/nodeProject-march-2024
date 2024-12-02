import {Router} from "express";
import {carController} from "../controllers/car.controller";
import {authUser} from "../middlewares/auth.middleware";
import {RoleMiddleware} from "../middlewares/role.middleware";
import {RoleEnum} from "../enums/RoleEnum";

const router = Router()


router.get('/',  carController.getAll)

router.get('/model',carController.getAllByModel)

router.get('/brand',carController.getAllByBrand)

router.post('/',authUser,RoleMiddleware(RoleEnum.Seller || RoleEnum.Manager || RoleEnum.SuperUser) ,carController.create)

router.put('/:id',authUser,RoleMiddleware(RoleEnum.Seller || RoleEnum.Manager || RoleEnum.SuperUser) , carController.updateById)

router.delete('/:id',authUser,RoleMiddleware(RoleEnum.Seller || RoleEnum.Manager || RoleEnum.SuperUser) , carController.deleteById)



export const carRouter = router