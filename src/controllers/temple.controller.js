import createError from "http-errors";
import {
  drawTempleFortune,
  findAllTemples,
  findPopularTemples,
  findTempleById,
} from "../services/temple.service.js";
import { parseTempleId } from "../utils/parseTempleId.js";

export const getTemples = async (req, res, next) => {
  try {
    const { search, province, category } = req.query;
    const temples = await findAllTemples({ search, province, category });

    res.status(200).json({ temples });
  } catch (error) {
    next(error);
  }
};

export const getPopularTemples = async (req, res, next) => {
  try {
    const temples = await findPopularTemples();

    res.status(200).json({ temples });
  } catch (error) {
    next(error);
  }
};

export const getTempleById = async (req, res, next) => {
  try {
    const templeId = parseTempleId(req.params.templeId);

    const temple = await findTempleById(templeId);

    if (!temple) {
      return next(createError(404, "Temple not found"));
    }

    res.status(200).json({ temple });
  } catch (error) {
    next(error);
  }
};

export const drawFortuneStick = async (req, res, next) => {
  try {
    const templeId = parseTempleId(req.params.templeId);
    const history = await drawTempleFortune(templeId, req.user.id);

    res.status(200).json({ history });
  } catch (error) {
    next(error);
  }
};
