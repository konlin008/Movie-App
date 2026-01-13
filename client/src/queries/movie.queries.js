import {
  allMoviesApi,
  createMovieApi,
  deleteMovie,
  searchMoviesApi,
  sortMoviesApi,
  updateMovieApi,
} from "@/api/movie.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAllMovies = () => {
  return useQuery({
    queryKey: ["movies"],
    queryFn: allMoviesApi,
  });
};
export const useSort = (by, order) => {
  return useQuery({
    queryKey: ["movies", "sorted", by, order],
    queryFn: () => sortMoviesApi(by, order),
    enabled: !!by,
  });
};
export const useSearch = (query) => {
  return useQuery({
    queryKey: ["search-movies", query],
    queryFn: () => searchMoviesApi(query),
    enabled: !!query,
  });
};
export const useDeleteMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["movies"],
      });
    },
  });
};
export const useUpdateMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMovieApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["movies"],
      });
    },
  });
};
export const useAddMovie = () => {
  return useMutation({
    mutationFn: createMovieApi,
  });
};
