import { prisma } from "../lib/prisma.js";

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
    select: {
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
    },
    orderBy: {
      id: "asc",
    },
  });

  return temples.map((temple) => ({
    ...temple,
    latitude: Number(temple.latitude),
    longitude: Number(temple.longitude),
    categories: temple.categories.map(({ category }) => category),
  }));
};
