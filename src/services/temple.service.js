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
