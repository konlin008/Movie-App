import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./src/db/db.js";
import authRouter from "./src/routes/auht.router.js";
import movieRouter from "./src/routes/movie.router.js";
// import seedMovies from "./src/utils/seedMovies.js";

const app = express();
dotenv.config();
app.set("trust proxy", 1);
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

connectDB();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/movies", movieRouter);

// seedMovies();

app.listen(process.env.PORT, () => {
  console.log("Server Running");
});
