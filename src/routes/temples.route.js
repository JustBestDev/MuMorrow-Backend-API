import express from 'express'
import { drawFortuneStick, getTempleById, getTemples } from '../controllers/temple.controller.js'
import authCheck from '../middlewares/auth.middlewaare.js'

const templeRoute = express()

templeRoute.get('/', getTemples)
templeRoute.post('/:templeId/fortune', authCheck, drawFortuneStick)
templeRoute.get('/:templeId', getTempleById)

export default templeRoute
