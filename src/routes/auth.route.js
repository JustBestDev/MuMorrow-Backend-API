import express from 'express'
import { getMe, login, register } from '../controllers/auth.controller.js'
import authCheck from '../middlewares/auth.middlewaare.js'
const authRoute = express()

authRoute.post('/register', register)
authRoute.post('/login', login)
// authRoute.post('/logout',)
authRoute.get('/me', authCheck, getMe)

export default authRoute