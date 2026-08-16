import { prisma } from "../lib/prisma.js";

export const getCategory = async () => {
    const categories = await prisma.category.findMany({
        select: {
            id: true,
            name: true
        }
    })
    return categories
}