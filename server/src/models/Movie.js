import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    imdbId: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
    },

    rating: {
      type: Number,
      min: 0,
      max: 10,
    },

    year: {
      type: Number,
    },

    duration: {
      type: Number,
    },

    poster: {
      type: String,
    },
  },
  { timestamps: true }
);

movieSchema.index({ title: "text", description: "text" });

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
