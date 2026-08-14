import express from 'express'
const templeRoute = express()

templeRoute.get('/',)
templeRoute.get('/', async (req, res) => {
    const { search, province, category, } = req.query

    console.log(search)

    res.json({
        message: 'ยิงสำเร็จ',
        search,
        province,
        category
    })
})


export default templeRoute