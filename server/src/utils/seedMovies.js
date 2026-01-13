import fs from "fs";
import Movie from "../models/Movie.js";

const seedMovies = async () => {
  const file = fs.readFileSync("./src/data/movies-250.json", "utf-8");
  const movies = JSON.parse(file).movies;

  for (const m of movies) {
    await Movie.updateOne(
      { imdbId: m.imdbID },
      {
        $set: {
          title: m.Title,
          description: m.Plot || "",
          rating: Number(m.imdbRating) || 0,
          year: Number(m.Year) || null,
          poster: m.Poster,
          imdbId: m.imdbID,
          duration: m.Runtime ? parseInt(m.Runtime) : null,
        },
      },
      { upsert: true }
    );
  }

  console.log("Seeded movies successfully");
};

export default seedMovies;
