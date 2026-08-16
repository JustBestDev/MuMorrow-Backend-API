import createError from "http-errors";
import {
  createReview,
  deleteReviewByIdAndUserId,
  findReviewsByTempleId,
  updateReviewByIdAndUserId,
} from "../services/review.service.js";
import { parseReviewId, parseTempleId } from "../utils/parseTempleId.js";

const parseReviewInput = ({ rating, comment } = {}) => {
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw createError(400, "Rating must be an integer between 1 and 5");
  }

  if (typeof comment !== "string" || comment.trim().length === 0) {
    throw createError(400, "Comment is required");
  }

  return { rating, comment: comment.trim() };
};

const parseReviewUpdateInput = (input) => {
  const { rating, comment } = input ?? {};
  const data = {};

  if (rating !== undefined) {
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      throw createError(400, "Rating must be an integer between 1 and 5");
    }

    data.rating = rating;
  }

  if (comment !== undefined) {
    if (typeof comment !== "string" || comment.trim().length === 0) {
      throw createError(400, "Comment is required");
    }

    data.comment = comment.trim();
  }

  if (Object.keys(data).length === 0) {
    throw createError(400, "No review fields to update");
  }

  return data;
};

export const getTempleReviews = async (req, res, next) => {
  try {
    const templeId = parseTempleId(req.params.templeId);
    const reviews = await findReviewsByTempleId(templeId);

    res.status(200).json({ reviews });
  } catch (error) {
    next(error);
  }
};

export const createTempleReview = async (req, res, next) => {
  try {
    const templeId = parseTempleId(req.params.templeId);
    const userId = req.user.id;
    const { rating, comment } = parseReviewInput(req.body);
    const review = await createReview({ userId, templeId, rating, comment });

    res.status(201).json({ review });
  } catch (error) {
    next(error);
  }
};

export const updateOwnReview = async (req, res, next) => {
  try {
    const reviewId = parseReviewId(req.params.reviewId);
    const userId = req.user.id;
    const data = parseReviewUpdateInput(req.body);
    const review = await updateReviewByIdAndUserId({ reviewId, userId, data });

    res.status(200).json({ review });
  } catch (error) {
    next(error);
  }
};

export const deleteOwnReview = async (req, res, next) => {
  try {
    const reviewId = parseReviewId(req.params.reviewId);
    const userId = req.user.id;

    await deleteReviewByIdAndUserId({ reviewId, userId });

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    next(error);
  }
};
