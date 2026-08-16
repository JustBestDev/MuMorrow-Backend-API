import createError from "http-errors";

const parsePositiveIntId = (value, fieldName) => {
  const id = Number(value);

  if (
    !Number.isSafeInteger(id) ||
    id <= 0 ||
    id > 2147483647
  ) {
    throw createError(400, `Invalid ${fieldName}`);
  }

  return id;
};

export const parseTempleId = (value) => parsePositiveIntId(value, "templeId");

export const parseReviewId = (value) => parsePositiveIntId(value, "reviewId");
