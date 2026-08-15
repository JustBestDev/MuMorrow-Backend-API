import { findAllTemples } from "../services/temple.service.js";

export const getTemples = async (req, res, next) => {
  try {
    const { search, province, category } = req.query;
    const temples = await findAllTemples({ search, province, category });

    res.status(200).json({ temples });
  } catch (error) {
    next(error);
  }
};
