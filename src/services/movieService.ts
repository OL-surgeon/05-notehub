import axios from "axios";
import type { Movie } from "../types/movie";

const BEARER_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export interface FetchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
export const fetchMovies = async (
  query: string,
  page = 1
): Promise<FetchMoviesResponse> => {
  console.log("Bearer token:", BEARER_TOKEN);
  const response = await axios.get<FetchMoviesResponse>(
    `${BASE_URL}/search/movie`,
    {
      params: {
        query,
        page,
        include_adult: false,
        language: "en-US",
        api_key: API_KEY,
      },
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        Accept: "application/json",
      },
    }
  );

  return response.data;
};
