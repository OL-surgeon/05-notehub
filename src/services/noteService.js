import axios from "axios";
const API_URL = "https://notehub-public.goit.study/api";
const token = import.meta.env.VITE_NOTEHUB_TOKEN;
if (!token) {
    throw new Error("VITE_NOTEHUB_TOKEN is not set");
}
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: `Bearer ${token}`,
    },
});
export const fetchNotes = async (params) => {
    const { page = 1, perPage = 12, search = "" } = params;
    const queryParams = { page, perPage };
    if (search.trim() !== "") {
        queryParams.search = search;
    }
    const { data } = await axiosInstance.get("/notes", {
        params: queryParams,
    });
    return data;
};
export const createNote = async (data) => {
    const { data: note } = await axiosInstance.post("/notes", data);
    return note;
};
export const deleteNote = async (id) => {
    const { data } = await axiosInstance.delete(`/notes/${id}`);
    return data;
};
