import {Router} from 'express'
import AuthController from '../controllers/auth.controller'
import authMiddleware from '../middlewares/auth.middleware'

const authRouter = Router()
const authController = new AuthController()

authRouter.post('/sign-up', authController.register)
authRouter.post('/sign-in', authController.login)
authRouter.delete('/delete-account', authController.delete)

export default authRouter