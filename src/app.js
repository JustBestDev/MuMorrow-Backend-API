import express from "express";
import authRoute from "./routes/auth.route.js";
import dailyHoroscopeRoute from "./routes/daily.horoscopes.route.js";
import templeRoute from "./routes/temples.route.js";
import { partNotFound } from "./middlewares/pathNotFound.middleware.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import categoryRoute from "./routes/categories.route.js";
import fortuneHistoryRoute from "./routes/fortuneHistory.route.js";
import favoriteRoute from "./routes/favorites.route.js";
import reviewRoute, { ownReviewRoute } from "./routes/reviews.route.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.FRONTEND_URL,
    ].filter(Boolean),
    credentials: true,
  })
);

app.use(express.json());

app.use("/auth", authRoute);
app.use("/daily-horoscopes", dailyHoroscopeRoute);
app.use("/temples", reviewRoute);
app.use("/reviews", ownReviewRoute);
app.use("/temples", templeRoute);
app.use("/categories", categoryRoute);
app.use("/fortune-histories", fortuneHistoryRoute);
app.use("/favorites", favoriteRoute);

app.use(partNotFound);

app.use(errorHandler);

export default app;
