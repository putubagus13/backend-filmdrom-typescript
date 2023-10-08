import {Router} from 'express'
import movieRouter from './movie.router'
import authRouter from './auth.router'
import authMiddleware from '../middlewares/auth.middleware'

const router = Router()
router.use('/auth', authRouter)
router.use('/movie', movieRouter)

export default router