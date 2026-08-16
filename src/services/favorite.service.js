import createError from "http-errors";
import { prisma } from "../lib/prisma.js";
import { formatTemple, templeSelect } from "./temple.service.js";

const favoriteKey = (userId, templeId) => ({
  userId_templeId: {
    userId,
    templeId,
  },
});

export const createFavorite = async (userId, templeId) => {
  const temple = await prisma.temple.findUnique({
    where: { id: templeId },
    select: { id: true },
  });

  if (!temple) {
    throw createError(404, "Temple not found");
  }

  const existingFavorite = await prisma.favorite.findUnique({
    where: favoriteKey(userId, templeId),
    select: { userId: true },
  });

  if (existingFavorite) {
    throw createError(409, "Temple already favorited");
  }

  try {
    return await prisma.favorite.create({
      data: {
        userId,
        templeId,
      },
    });
  } catch (error) {
    // The database constraint also protects against concurrent duplicate requests.
    if (error.code === "P2002") {
      throw createError(409, "Temple already favorited");
    }

    throw error;
  }
};

export const deleteFavorite = async (userId, templeId) => {
  const favorite = await prisma.favorite.findUnique({
    where: favoriteKey(userId, templeId),
    select: { userId: true },
  });

  if (!favorite) {
    throw createError(404, "Favorite not found");
  }

  await prisma.favorite.delete({
    where: favoriteKey(userId, templeId),
  });
};

export const findFavoriteTemplesByUserId = async (userId) => {
  const favorites = await prisma.favorite.findMany({
    where: { userId },
    select: {
      temple: {
        select: templeSelect,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return favorites.map(({ temple }) => formatTemple(temple));
};
