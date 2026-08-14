import jwt from 'jsonwebtoken'

export const createTokenUser = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        name: user.name
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET_USER, {
        algorithm: 'HS256',
        expiresIn: '1d'
    })
    return token
}

export const verifyToken = async (token) => {
    const payload = jwt.verify(token, process.env.JWT_SECRET_USER, {
        algorithms: ['HS256']
    })
    return payload
}