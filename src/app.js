import express from 'express'
import authRoute from './routes/auth.route.js'
import dailyHoroscopeRoute from './routes/daily.horoscopes.route.js'
import templeRoute from './routes/temples.route.js'
import { partNotFound } from './middlewares/pathNotFound.middleware.js'
import { errorHandler } from './middlewares/errorHandler.js'
import categoryRoute from './routes/categories.route.js'
import fortuneHistoryRoute from './routes/fortuneHistory.route.js'

const app = express()

app.use(express.json())

app.get('/test', (req, res) => {
    res.send('Hello from server')
})

app.use('/auth', authRoute)
app.use('/daily-horoscopes', dailyHoroscopeRoute)
app.use('/temples', templeRoute)
app.use('/categories', categoryRoute)
app.use('/fortune-histories', fortuneHistoryRoute)
// app.use('/favorites')
// app.use('/reviews')

app.use(partNotFound)

app.use(errorHandler)

export default app