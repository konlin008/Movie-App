import express from "express";
import {
  createMovie,
  deleteMovie,
  getSortedMovies,
  movies,
  searchMovies,
  updateMovie,
} from "../controllers/movie.controller.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

router.get("/health", healthCheck);

router.use(isAuthenticated);

router.get("/", movies);
router.get("/sorted", getSortedMovies);
router.get("/search", searchMovies);

router.use(isAdmin);

router.post("/", createMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);
export default router;
