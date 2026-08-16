import createError from "http-errors";
import {
    findFortuneHistoriesByUserId,
    findFortuneHistoryByIdAndUserId,
} from "../services/fortuneHistory.service.js";

const parseHistoryId = (value) => {
    const historyId = Number(value)

    if (
        !Number.isSafeInteger(historyId) ||
        historyId <= 0 ||
        historyId > 2147483647
    ) {
        throw createError(400, "Invalid historyId")
    }

    return historyId
}

export const getOwnFortuneHistories = async (req, res, next) => {
    try {
        const userId = req.user.id

        const histories = await findFortuneHistoriesByUserId(userId)

        res.status(200).json({ histories });
    } catch (error) {
        next(error);
    }
}

export const getOwnFortuneHistoryDetail = async (req, res, next) => {
    try {
        const historyId = parseHistoryId(req.params.historyId)
        const userId = req.user.id

        const history = await findFortuneHistoryByIdAndUserId(historyId, userId)

        if (!history) {
            return next(createError(404, "Fortune history not found"))
        }

        res.status(200).json({ history })
    } catch (error) {
        next(error)
    }
}
