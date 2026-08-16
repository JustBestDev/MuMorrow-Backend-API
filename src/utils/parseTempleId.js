import createError from "http-errors";

export const parseTempleId = (value) => {
  const templeId = Number(value);

  if (
    !Number.isSafeInteger(templeId) ||
    templeId <= 0 ||
    templeId > 2147483647
  ) {
    throw createError(400, "Invalid templeId");
  }

  return templeId;
};
