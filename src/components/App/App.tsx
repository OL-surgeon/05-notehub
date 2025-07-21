import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import css from "./App.module.css";

import {
  fetchNotes,
  createNote,
  deleteNote,
  FetchNotesResponse,
  CreateNoteData,
} from "../../services/noteService";

import { NoteList } from "../NoteList/NoteList";
import { Modal } from "../Modal/Modal";
import { NoteForm } from "../NoteForm/NoteForm";
import { Pagination } from "../Pagination/Pagination";
import { SearchBox } from "../SearchBox/SearchBox";

export const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: (): Promise<FetchNotesResponse> =>
      fetchNotes({ page, perPage: 12, search: debouncedSearch }),
    placeholderData: (previousData) => previousData,
  });

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleCreate = (data: CreateNoteData) => {
    createMutation.mutate(data);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Ви впевнені, що хочете видалити нотатку?")) {
      deleteMutation.mutate(id);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            onPageChange={handlePageChange}
            currentPage={page}
          />
        )}
        <button
          className={css.button}
          type="button"
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </header>

      {isLoading && <p>Завантаження нотатків...</p>}
      {isError && <p>Помилка: {(error as Error).message}</p>}

      {data && data.notes.length > 0 && (
        <NoteList notes={data.notes} onDelete={handleDelete} />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onSubmit={handleCreate}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};
