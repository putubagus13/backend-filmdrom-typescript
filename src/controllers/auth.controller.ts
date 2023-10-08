import errorHendller from "../helpers/errorhendller.helper";
import argon from 'argon2'
import { Request, Response } from "express";
import UserModel from "../models/user.model";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({
    path: '.env'
})

const APP_SECRET: string | undefined = process.env.APP_SECRET
// interface AuthRequest extends Request{
//     user: any
// }

interface Body{
    username: string
    email: string
    password: string
}

class AuthController{
    async register(req: Request, res: Response){
        try {
            const {password, confirmPassword} = req.body  
            if(password !== confirmPassword){
                throw Error('Confirm Password Not Match')
            }
            const hash: string = await argon.hash(password)
            const body: Body = {
                username: req.body.username,
                email: req.body.email,
                password: hash
            }
            new UserModel().insert(body)
            return res.status(200).json({
                success: true,
                massage: 'Success Create Account',
            })
        } catch (error) {
            return errorHendller(error, res)
        }
    }

    async login(req: Request, res: Response){
        try {
            const {email, password} = req.body
            const verifyAccount = await new UserModel().findOne(email)
            if(!verifyAccount){
                throw Error('Wrong Email or Password')
            }
            const verifyPassword = await argon.verify(verifyAccount.password, password)
            if(!verifyPassword){
                throw Error('Wrong Email or Password')
            }
            if(!APP_SECRET){
                throw Error('APP_SECRET not found')
            }
            const token: string = jwt.sign({id: verifyAccount.id}, APP_SECRET)
            return res.status(200).json({
                success: true,
                message: 'Login Success',
                results: token
            })
        } catch (error) {
            return errorHendller(error, res)
        }
    }

    async delete(req: any, res: Response){
        try {
            console.log('test');
            
            const data = req.user
            console.log(data);
            
            // const verifyAccount = await new UserModel().findOne(id)
            // if(!verifyAccount){
            //     throw Error('Email is wrong')
            // }
            // const account = new UserModel().destroy(id)
            // return res.status(200).json({
            //     success: true,
            //     message: 'Delete Account Success'
            // })
        } catch (error) {
            return errorHendller(error, res)
        }
    }
}

export default AuthController