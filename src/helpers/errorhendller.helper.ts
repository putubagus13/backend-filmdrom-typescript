import { Response } from "express"
const errorHendller = (error: any, res: Response) => {
    if(error?.message?.includes('Confirm Password Not Match')){
        return res.status(400).json({
            sucess: false,
            massage: 'Confirm Password Not Match'
        })
    }
    if(error?.message?.includes('Email is wrong')){
        return res.status(400).json({
            sucess: false,
            massage: 'Email is wrong'
        })
    }
    if(error?.message?.includes('Wrong Email or Password')){
        return res.status(400).json({
            sucess: false,
            massage: 'Wrong Email or Password'
        })
    }
    if(error?.message?.includes('APP_SECRET not found')){
        return res.status(404).json({
            sucess: false,
            massage: 'APP_SECRET not found'
        })
    }
    return res.status(500).json({
        success: false,
        message: 'Internal server error'
    })
}

export default errorHendller