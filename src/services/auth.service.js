import { prisma } from "../lib/prisma.js"

export const findUserByEmail = async (email) => {
    return prisma.user.findUnique({ where: { email } })
}

export const findUserById = async (id) => {
    return prisma.user.findFirst({ where: { id } })
}

export const createUser = async (email, hashPassword, name, birthDateObj) => {
    return prisma.user.create({
        data: { email, password: hashPassword, name, birthDate: birthDateObj }
    })
}

export const updateUserProfile = async (id, name, birthDate) => {
    return prisma.user.update({
        where: { id },
        data: { name, birthDate },
        select: {
            id: true,
            name: true,
            email: true,
            birthDate: true,
            role: true,
            profileImageUrl: true
        }
    })
}
