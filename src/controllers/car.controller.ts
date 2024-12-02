import {NextFunction, Request, Response} from "express";
import {Car} from "../models/Car.model";
import {ApiError} from "../errors/api.error";

interface ICar {
    brand: string,
    model:string,
    year: number,
    price:number
}


class CarController{
    public async getAll(req: Request, res: Response, next: NextFunction):Promise<Response<ICar[]>>{
        try {
            const cars = await Car.findAll();
            return  res.json(cars);
        } catch (e) {
            next(e);
        }
    }
    public async getAllByBrand(req: Request, res: Response, next: NextFunction):Promise<Response<ICar[]>>{
        try {
            const { brand } = req.query;
            if (!brand) {
                throw new ApiError("no brands found",404);
            }
            const cars = await Car.findAll({ where: { brand } });
            return res.json(cars);
        } catch (e) {
            next(e);
        }
    }
    public async getAllByModel(req: Request, res: Response, next: NextFunction):Promise<Response<ICar[]>>{
        try {
            const { model } = req.query;
            if (!model) {
                throw new ApiError("no models found", 404)
            }

            const cars = await Car.findAll({ where: { model } });
            return res.json(cars);
        } catch (e) {
            next(e);
        }
    }
    public async create(req: Request, res: Response, next: NextFunction):Promise<Response<ICar[]>>{
        try {
            const { brand, model, year, price } = req.body;
            const car = await Car.create({ brand, model, year, price });
            return res.status(201).json(car);
        } catch (e) {
            next(e);
        }
    }
    public async updateById(req: Request, res: Response, next: NextFunction): Promise<Response<ICar>> {
        try {
            const { id } = req.params;
            const { brand, model, year, price } = req.body;
            const car = await Car.findByPk(id);
            if (!car) {
                res.status(404).json({ message: "Car not found" });
                return;
            }
            const updatedCar = await car.update({ brand, model, year, price });
            return res.status(200).json(updatedCar);
        } catch (e) {
            next(e);
        }
    }
    public async deleteById(req: Request, res: Response, next: NextFunction):Promise<Response<ICar[]>>{
        try {
            const { id } = req.params;
            const car = await Car.findByPk(id);
            if (!car) {
                res.status(404).json({ message: "Car not found" });
                return;
            }
            await car.destroy();
            res.status(200).json({ message: `Car with ID ${id} deleted` });
        } catch (e) {
            next(e);
        }
    }

}


export const carController = new CarController()