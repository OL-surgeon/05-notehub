import axios from "axios";
import { Note, NoteTag } from "../types/note";

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

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  currentPage: number;
  totalNotes: number;
}

export interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const { page = 1, perPage = 12, search = "" } = params;

  const queryParams: Record<string, unknown> = { page, perPage };
  if (search.trim() !== "") {
    queryParams.search = search;
  }

  const { data } = await axiosInstance.get<FetchNotesResponse>("/notes", {
    params: queryParams,
  });

  return data;
};

export const createNote = async (data: CreateNoteData): Promise<Note> => {
  const { data: note } = await axiosInstance.post<Note>("/notes", data);
  return note;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const { data } = await axiosInstance.delete<Note>(`/notes/${id}`);
  return data;
};
