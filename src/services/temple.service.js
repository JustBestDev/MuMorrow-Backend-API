import createError from "http-errors";
import { prisma } from "../lib/prisma.js";

export const templeSelect = {
  id: true,
  name: true,
  province: true,
  address: true,
  description: true,
  imageUrl: true,
  latitude: true,
  longitude: true,

  _count: {
    select: {
      favorites: true,
    },
  },

  categories: {
    select: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
};

export const formatTemple = (temple) => {
  const { _count, ...rest } = temple;

  return {
    ...rest,
    latitude: Number(temple.latitude),
    longitude: Number(temple.longitude),
    favoriteCount: _count?.favorites ?? 0,
    categories: temple.categories.map(({ category }) => category),
  };
};

export const findAllTemples = async ({ search, province, category } = {}) => {
  const where = {};

  if (search) {
    where.name = {
      contains: search,
    };
  }

  if (province) {
    where.province = province;
  }

  if (category) {
    where.categories = {
      some: {
        category: {
          name: category,
        },
      },
    };
  }

  const temples = await prisma.temple.findMany({
    where,
    select: templeSelect,
    orderBy: {
      id: "asc",
    },
  });

  return temples.map(formatTemple);
};

export const findPopularTemples = async () => {
  const temples = await prisma.temple.findMany({
    take: 6,
    select: {
      id: true,
      name: true,
      province: true,
      imageUrl: true,
      _count: {
        select: {
          favorites: true,
        },
      },
    },
    orderBy: [
      {
        favorites: {
          _count: "desc",
        },
      },
      {
        id: "asc",
      },
    ],
  });

  return temples.map(({ _count, ...temple }) => ({
    ...temple,
    favoriteCount: _count.favorites,
  }));
};

export const findTempleById = async (id) => {
  const temple = await prisma.temple.findUnique({
    where: { id },
    select: templeSelect,
  });

  return temple ? formatTemple(temple) : null;
};

export const drawTempleFortune = async (templeId, userId) => {
  const temple = await prisma.temple.findUnique({
    where: { id: templeId },
    select: { id: true, name: true, imageUrl: true },
  });

  if (!temple) {
    throw createError(404, "Temple not found");
  }

  const fortuneSticks = await prisma.fortuneStick.findMany({
    where: { templeId },
    select: {
      id: true,
      stickNumber: true,
      title: true,
      prediction: true,
    },
  });

  if (fortuneSticks.length === 0) {
    throw createError(404, "Fortune sticks not found for this temple");
  }

  const randomIndex = Math.floor(Math.random() * fortuneSticks.length);
  const fortuneStick = fortuneSticks[randomIndex];

  const history = await prisma.fortuneHistory.create({
    data: {
      userId,
      templeId,
      fortuneStickId: fortuneStick.id,
      predictionSnapshot: fortuneStick.prediction,
    },
    select: {
      id: true,
      createdAt: true,
    },
  });

  return {
    ...history,
    temple,
    fortuneStick: {
      id: fortuneStick.id,
      stickNumber: fortuneStick.stickNumber,
      title: fortuneStick.title,
    },
    prediction: fortuneStick.prediction,
  };
};
