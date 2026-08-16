import express from "express";
import { getFavoriteTemples } from "../controllers/favorite.controller.js";
import authCheck from "../middlewares/auth.middlewaare.js";

const favoriteRoute = express();

favoriteRoute.get("/", authCheck, getFavoriteTemples);

export default favoriteRoute;
