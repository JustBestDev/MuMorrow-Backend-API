import express from 'express'
import { getCategories } from '../controllers/categories.controller.js'

const categoryRoute = express.Router()

categoryRoute.get('/',getCategories)

export default categoryRoute