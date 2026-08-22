import express from 'express'
import { getMe, login, logout, register, updateMe } from '../controllers/auth.controller.js'
import authCheck from '../middlewares/auth.middlewaare.js'
const authRoute = express()

authRoute.post('/register', register)
authRoute.post('/login', login)
authRoute.post('/logout', authCheck, logout)
authRoute.get('/me', authCheck, getMe)
authRoute.patch('/me', authCheck, updateMe)

export default authRoute
