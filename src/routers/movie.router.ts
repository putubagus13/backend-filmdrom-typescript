import MovieController from '../controllers/movie.controller'
import { Router } from 'express'

const movieRouter = Router()
const movieController = new MovieController()

movieRouter.get('/', movieController.getAll)

export default movieRouter
