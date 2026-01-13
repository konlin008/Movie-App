import axios from "axios";

export const allMoviesApi = async () => {
  const res = await axios.get("http://localhost:3000/api/v1/movies", {
    withCredentials: true,
  });
  return res.data;
};
export const sortMoviesApi = async (by, order) => {
  const res = await axios.get(
    "http://localhost:3000/api/v1/movies/sorted",

    {
      withCredentials: true,
      params: {
        by,
        order,
      },
    }
  );
  return res.data;
};
export const searchMoviesApi = async (query) => {
  const res = await axios.get(
    `http://localhost:3000/api/v1/movies/search?q=${query}`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};
export const deleteMovie = async (id) => {
  const res = await axios.delete(`http://localhost:3000/api/v1/movies/${id}`, {
    withCredentials: true,
  });
  return res.data;
};
export const updateMovieApi = async ({ id, data }) => {
  const res = await axios.put(
    `http://localhost:3000/api/v1/movies/${id}`,
    data,
    {
      withCredentials: true,
    }
  );
  return res.data;
};
export const createMovieApi = async (data) => {
  const res = await axios.post("http://localhost:3000/api/v1/movies/", data, {
    withCredentials: true,
  });
  return res.data;
};
