import Movie from "../models/Movie.js";

export const movies = async (req, res) => {
  try {
    const movies = await Movie.find({});
    return res.status(200).json({
      success: true,
      movies,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch movies",
    });
  }
};
export const getSortedMovies = async (req, res) => {
  try {
    const { by = "name", order = "asc" } = req.query;
    const sortFields = {
      name: "title",
      rating: "rating",
      year: "year",
      duration: "duration",
    };
    if (!sortFields[by]) {
      return res.status(400).json({
        success: false,
        message: "Invalid sort field",
      });
    }
    const sortOrder = order === "desc" ? -1 : 1;
    const movies = await Movie.find({}).sort({ [sortFields[by]]: sortOrder });
    res.status(200).json({
      success: true,
      count: movies.length,
      movies,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch sorted movies",
    });
  }
};
export const searchMovies = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }
    const movies = await Movie.find({
      $text: { $search: q },
    });

    res.status(200).json({
      success: true,
      count: movies.length,
      movies,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to search movies",
    });
  }
};
export const createMovie = async (req, res) => {
  try {
    console.log(req.body);
    const { title, imdbId, description, rating, year, duration, poster } =
      req.body;

    if (!title || !imdbId) {
      return res.status(400).json({
        success: false,
        message: "Title and imdbId are required",
      });
    }
    const movieExists = await Movie.findOne({ imdbId });
    if (movieExists) {
      return res.status(409).json({
        success: false,
        message: "Movie already exists",
      });
    }
    const movie = await Movie.create({
      title,
      imdbId,
      description,
      rating,
      year,
      duration,
      poster,
    });
    res.status(201).json({
      success: true,
      movie,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create movie",
    });
  }
};
export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    const { title, description, rating, year, duration, poster } = req.body;

    if (title !== undefined) movie.title = title;
    if (description !== undefined) movie.description = description;
    if (rating !== undefined) movie.rating = rating;
    if (year !== undefined) movie.year = year;
    if (duration !== undefined) movie.duration = duration;
    if (poster !== undefined) movie.poster = poster;

    const updatedMovie = await movie.save();

    res.status(200).json({
      success: true,
      movie: updatedMovie,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update movie",
    });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    await movie.deleteOne();

    res.status(200).json({
      success: true,
      message: "Movie deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete movie",
    });
  }
};
