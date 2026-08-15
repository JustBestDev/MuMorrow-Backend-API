import express from 'express'
import { getTempleById, getTemples } from '../controllers/temple.controller.js'

const templeRoute = express()

templeRoute.get('/', getTemples)
templeRoute.get('/:templeId', getTempleById)

export default templeRoute