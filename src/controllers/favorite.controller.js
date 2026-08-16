import {
  createFavorite,
  deleteFavorite,
  findFavoriteTemplesByUserId,
} from "../services/favorite.service.js";
import { parseTempleId } from "../utils/parseTempleId.js";

export const addFavorite = async (req, res, next) => {
  try {
    const templeId = parseTempleId(req.params.templeId);
    const userId = req.user.id;

    await createFavorite(userId, templeId);

    res.status(201).json({ message: "Temple added to favorites" });
  } catch (error) {
    next(error);
  }
};

export const removeFavorite = async (req, res, next) => {
  try {
    const templeId = parseTempleId(req.params.templeId);
    const userId = req.user.id;

    await deleteFavorite(userId, templeId);

    res.status(200).json({ message: "Temple removed from favorites" });
  } catch (error) {
    next(error);
  }
};

export const getFavoriteTemples = async (req, res, next) => {
  try {
    const favorites = await findFavoriteTemplesByUserId(req.user.id);

    res.status(200).json({ favorites });
  } catch (error) {
    next(error);
  }
};
