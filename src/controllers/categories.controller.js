import createError from 'http-errors'
import { getCategory } from '../services/category.service.js'

export const getCategories = async (req, res) => {
    const categories = await getCategory()

    res.status(200).json({ categories })
}