import bcrypt from 'bcrypt'
import createError from 'http-errors'
import { createUser, findUserByEmail } from '../services/auth.service.js'
import { createTokenUser } from '../utils/jwt.js'

export const register = async (req, res, next) => {
    const { email, password, name, birthDate } = req.body

    const user = await findUserByEmail(email)

    if (user) {
        return next(createError(400, "email already exits"))
    }

    const hashPassword = await bcrypt.hash(password, 8)

    const birthDateObj = new Date(birthDate)

    const newUser = await createUser(email, hashPassword, name, birthDateObj)

    res.status(201).json({
        message: "Register successfully",
        user: newUser
    })
}

export const login = async (req, res, next) => {
    const { email, password } = req.body
    const user = await findUserByEmail(email)
    const isMatch = await bcrypt.compare(password, user.password)

    if (!user || !isMatch) {
        return next(createError(401, "Invalid credentials"))
    }

    const token = await createTokenUser(user)
    // console.log('token', token)
    res.status(200).json({
        message: "Login successfully",
        token: token,
        user: {
            id: user.id,
            email: user.email,
            name: user.name
        }
    })
}

export const getMe = (req, res) => {
    const { id, name, email, role } = req.user
    res.status(200).json({
        id,
        name,
        email,
        role
    })
}