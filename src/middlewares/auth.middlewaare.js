import createError from 'http-errors'
import { verifyToken } from '../utils/jwt.js'
import { findUserById } from '../services/auth.service.js'

const authCheck = async (req, res, next) => {
    const authorization = req.headers.authorization
    if (!authorization) {
        return next(createError(401, "Unauthoruzed"))
    }
    const token = authorization.split(" ")[1]
    const payload = await verifyToken(token)
    const user = await findUserById(payload.id)

    if (!user) {
        return next(createError(401, "Unauthoruzed"))
    }

    req.user = user
    next()
}

export default authCheck