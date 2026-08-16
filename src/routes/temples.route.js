import express from 'express'
import { drawFortuneStick, getTempleById, getTemples } from '../controllers/temple.controller.js'
import { addFavorite, removeFavorite } from '../controllers/favorite.controller.js'
import authCheck from '../middlewares/auth.middlewaare.js'

const templeRoute = express()

templeRoute.get('/', getTemples)
templeRoute.post('/:templeId/fortune', authCheck, drawFortuneStick)
templeRoute.post('/:templeId/favorite', authCheck, addFavorite)
templeRoute.delete('/:templeId/favorite', authCheck, removeFavorite)
templeRoute.get('/:templeId', getTempleById)

export default templeRoute
