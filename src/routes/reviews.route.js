import express from "express";
import {
  createTempleReview,
  deleteOwnReview,
  getTempleReviews,
  updateOwnReview,
} from "../controllers/review.controller.js";
import authCheck from "../middlewares/auth.middlewaare.js";

const reviewRoute = express();
export const ownReviewRoute = express();

reviewRoute.get("/:templeId/reviews", getTempleReviews);
reviewRoute.post("/:templeId/reviews", authCheck, createTempleReview);

ownReviewRoute.patch("/:reviewId", authCheck, updateOwnReview);
ownReviewRoute.delete("/:reviewId", authCheck, deleteOwnReview);

export default reviewRoute;
