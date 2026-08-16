import createError from "http-errors";
import { prisma } from "../lib/prisma.js";

const templeSelect = {
  id: true,
  name: true,
  province: true,
  description: true,
  imageUrl: true,
  latitude: true,
  longitude: true,
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

const formatTemple = (temple) => ({
  ...temple,
  latitude: Number(temple.latitude),
  longitude: Number(temple.longitude),
  categories: temple.categories.map(({ category }) => category),
});

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
    select: { id: true },
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

  await prisma.fortuneHistory.create({
    data: {
      userId,
      templeId,
      fortuneStickId: fortuneStick.id,
      predictionSnapshot: fortuneStick.prediction,
    },
  });

  return fortuneStick;
};
