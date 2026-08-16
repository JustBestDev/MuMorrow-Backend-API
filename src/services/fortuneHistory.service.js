import { prisma } from "../lib/prisma.js"

const fortuneHistorySelect = {
    id: true,
    predictionSnapshot: true,
    createdAt: true,
    temple: {
        select: {
            id: true,
            name: true,
            imageUrl: true,
        },
    },
    fortuneStick: {
        select: {
            id: true,
            stickNumber: true,
            title: true,
        },
    },
}

export const findFortuneHistoriesByUserId = async (id) => {
    const histories = await prisma.fortuneHistory.findMany({
        where: {
            userId: id
        },
        select: fortuneHistorySelect,
        orderBy:{
            createdAt:"desc"
        }
    })
    return histories
}

export const findFortuneHistoryByIdAndUserId = async (historyId, userId) => {
    const history = await prisma.fortuneHistory.findFirst({
        where: {
            id: historyId,
            userId,
        },
        select: fortuneHistorySelect,
    })

    if (!history) {
        return null
    }

    const { predictionSnapshot, ...historyDetail } = history

    return {
        ...historyDetail,
        prediction: predictionSnapshot,
    }
}
