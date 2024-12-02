import express, { NextFunction, Request, Response } from "express"
import {userRouter} from "./routers/user.router";
import {ApiError} from "./errors/api.error";
import {authRouter} from "./routers/auth.router";
import {carRouter} from "./routers/car.router";

const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/users', userRouter)
app.use('/auth', authRouter)
app.use('/cars', carRouter)


app.use((err: ApiError, req: Request, res: Response, next: NextFunction)=>{
    const status = err?.status || 500
    return res.status(status).send({
        message:err.message,
        status
    })
})

app.listen(process.env.PORT, ()=>{
    console.log(`server is running ${process.env.PORT}`)
})