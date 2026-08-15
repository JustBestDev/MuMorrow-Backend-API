import express from 'express'
import { getTemples } from '../controllers/temple.controller.js'

const templeRoute = express()

templeRoute.get('/', getTemples)

export default templeRoute
