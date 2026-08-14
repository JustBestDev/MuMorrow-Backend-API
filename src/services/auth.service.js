import { prisma } from "../lib/prisma.js"

export const findUserByEmail = async (email) => {
    const user = await prisma.user.findUnique({
        where: { email: email }
    })
    return user
}

export const findUserById = async (id) => {
    const user = await prisma.user.findFirst({
        where: { id: id }
    })
    return user
}

export const createUser = async (email, hashPassword, name, birthDateObj) => {
    const newUser = await prisma.user.create({
        data: {
            email,
            password: hashPassword,
            name,
            birthDate: birthDateObj
        }
    })
    return newUser
}

