import nodemailer from "nodemailer"
import {ApiError} from "../errors/api.error";

class EmailService{
    private transporter;
    constructor() {
        this.transporter =nodemailer.createTransport({
            from: "No reply",
            service: "gmail",
            auth: {
                user: "barchyshynyura@gmail.com",
                pass: ""
            }
        })
    }
    public async sendEmail(email:string, text: string){
        try {
            return this.transporter.sendEmail({
                to: email,
                html: `<div>${text}</div>`
            })
        }catch (e){
            throw new ApiError(e.message, e.status)
        }
    }
}

export const emailService = new EmailService()