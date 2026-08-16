import createError from "http-errors";
import { prisma } from "../lib/prisma.js";

const reviewSelect = {
  id: true,
  rating: true,
  comment: true,
  createdAt: true,
  updatedAt: true,
  user: {
    select: {
      id: true,
      name: true,
    },
  },
};

const ensureTempleExists = async (templeId) => {
  const temple = await prisma.temple.findUnique({
    where: { id: templeId },
    select: { id: true },
  });

  if (!temple) {
    throw createError(404, "Temple not found");
  }
};

export const findReviewsByTempleId = async (templeId) => {
  await ensureTempleExists(templeId);

  return prisma.review.findMany({
    where: { templeId },
    select: reviewSelect,
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const createReview = async ({ userId, templeId, rating, comment }) => {
  await ensureTempleExists(templeId);

  const existingReview = await prisma.review.findUnique({
    where: {
      userId_templeId: {
        userId,
        templeId,
      },
    },
    select: { id: true },
  });

  if (existingReview) {
    throw createError(409, "You have already reviewed this temple");
  }

  try {
    return await prisma.review.create({
      data: {
        userId,
        templeId,
        rating,
        comment,
      },
      select: reviewSelect,
    });
  } catch (error) {
    if (error.code === "P2002") {
      throw createError(409, "You have already reviewed this temple");
    }

    throw error;
  }
};

const findOwnedReview = async (reviewId, userId) => {
  const review = await prisma.review.findFirst({
    where: {
      id: reviewId,
      userId,
    },
    select: { id: true },
  });

  if (!review) {
    throw createError(404, "Review not found");
  }

  return review;
};

export const updateReviewByIdAndUserId = async ({
  reviewId,
  userId,
  data,
}) => {
  await findOwnedReview(reviewId, userId);

  return prisma.review.update({
    where: { id: reviewId },
    data,
    select: reviewSelect,
  });
};

export const deleteReviewByIdAndUserId = async ({ reviewId, userId }) => {
  await findOwnedReview(reviewId, userId);

  await prisma.review.delete({
    where: { id: reviewId },
  });
};
