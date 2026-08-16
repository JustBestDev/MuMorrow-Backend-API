import express from 'express'
import authCheck from '../middlewares/auth.middlewaare.js'
import {
    getOwnFortuneHistories,
    getOwnFortuneHistoryDetail,
} from '../controllers/fortuneHistory.controller.js'

const fortuneHistoryRoute = express()

fortuneHistoryRoute.get('/',authCheck, getOwnFortuneHistories)
fortuneHistoryRoute.get('/:historyId', authCheck, getOwnFortuneHistoryDetail)

export default fortuneHistoryRoute
