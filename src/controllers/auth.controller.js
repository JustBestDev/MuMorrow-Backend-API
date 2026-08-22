import bcrypt from 'bcrypt'
import createError from 'http-errors'
import { createUser, findUserByEmail, updateUserProfile } from '../services/auth.service.js'
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
        user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            birthDate: newUser.birthDate,
            role: newUser.role,
            profileImageUrl: newUser.profileImageUrl
        }
    })
}

export const login = async (req, res, next) => {
    const { email, password } = req.body
    const user = await findUserByEmail(email)

    if (!user) {
        return next(createError(401, "Invalid credentials"))
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
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
            name: user.name,
            profileImageUrl: user.profileImageUrl
        }
    })
}

export const getMe = (req, res) => {
    const { id, name, email, birthDate, role, profileImageUrl } = req.user
    res.status(200).json({
        id,
        name,
        email,
        birthDate,
        role,
        profileImageUrl
    })
}

export const logout = async (req, res) => {
    res.status(200).json({
        message: "Logout successfully"
    })
}

export const updateMe = async (req, res, next) => {
    const name = typeof req.body.name === 'string' ? req.body.name.trim() : ''
    const birthDate = typeof req.body.birthDate === 'string' ? req.body.birthDate : ''
    const dateMatch = birthDate.match(/^(\d{4})-(\d{2})-(\d{2})$/)

    if (!name) return next(createError(400, 'Name is required'))
    if (!dateMatch) return next(createError(400, 'Invalid birth date'))

    const [, year, month, day] = dateMatch
    const birthDateObj = new Date(`${birthDate}T00:00:00.000Z`)
    const isValidDate = !Number.isNaN(birthDateObj.getTime()) &&
        birthDateObj.getUTCFullYear() === Number(year) &&
        birthDateObj.getUTCMonth() + 1 === Number(month) &&
        birthDateObj.getUTCDate() === Number(day)
    const today = new Date()
    const todayDate = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())

    if (!isValidDate || birthDateObj.getTime() > todayDate) {
        return next(createError(400, 'Birth date must be valid and not in the future'))
    }

    const user = await updateUserProfile(req.user.id, name, birthDateObj)
    res.status(200).json({ message: 'Profile updated successfully', user })
}
