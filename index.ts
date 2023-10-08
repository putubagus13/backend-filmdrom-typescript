import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import router from './src/routers/index'
import cors from 'cors'

dotenv.config({
    path: '.env'
})

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response ) => {
    return res.json({
        success: true,
        message: 'Backend runing ok'
    })
})

app.use("/", router)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Backend listening at PORT:${PORT}`);
})