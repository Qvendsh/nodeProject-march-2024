import { DataTypes, Model } from "sequelize";
import {sequelize} from "../config/DB";
import {RoleEnum} from "../enums/RoleEnum";
import {StatusEnum} from "../enums/StatusEnum";

export interface IUser extends Model {
    name: string,
    email: string,
    password: string,
    status: StatusEnum,
    role:RoleEnum
}

export const User = sequelize.define<IUser>(
    "User",
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey:true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role:{
            type: DataTypes.ENUM(...Object.values(RoleEnum)),
            allowNull:false,
            defaultValue: RoleEnum.Buyer
        },
        status:{
            type:DataTypes.ENUM(...Object.values(StatusEnum)),
            allowNull:false,
            defaultValue: StatusEnum.Active
        }
    },
    {
        tableName: "users",
        timestamps: false,
    }
);