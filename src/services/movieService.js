import axios from "axios";
const BEARER_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
export const fetchMovies = async (query, page = 1) => {
    console.log("Bearer token:", BEARER_TOKEN);
    const response = await axios.get(`${BASE_URL}/search/movie`, {
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
    });
    return response.data;
};
