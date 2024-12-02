import {DataTypes, Model} from "sequelize";
import {sequelize} from "../config/DB";

export interface ICar extends Model {
    brand: string,
    model: string,
    year: string,
    price:number
}

export const Car = sequelize.define<ICar>(
    "Car",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        year: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        }
    },
    {
        tableName: "cars",
        timestamps: false,
    }
);