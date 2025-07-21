import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import css from "./App.module.css";
import { fetchNotes, createNote, deleteNote, } from "../../services/noteService";
import { NoteList } from "../NoteList/NoteList";
import { Modal } from "../Modal/Modal";
import { NoteForm } from "../NoteForm/NoteForm";
import { Pagination } from "../Pagination/Pagination";
import { SearchBox } from "../SearchBox/SearchBox";
export const App = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [debouncedSearch] = useDebounce(search, 500);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["notes", page, debouncedSearch],
        queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch }),
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
    const handleCreate = (data) => {
        createMutation.mutate(data);
    };
    const handleDelete = (id) => {
        if (window.confirm("Ви впевнені, що хочете видалити нотатку?")) {
            deleteMutation.mutate(id);
        }
    };
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };
    const handleSearchChange = (value) => {
        setSearch(value);
        setPage(1);
    };
    return (_jsxs("div", { className: css.app, children: [_jsxs("header", { className: css.toolbar, children: [_jsx(SearchBox, { value: search, onChange: handleSearchChange }), data && data.totalPages > 1 && (_jsx(Pagination, { pageCount: data.totalPages, onPageChange: handlePageChange, currentPage: page })), _jsx("button", { className: css.button, type: "button", onClick: () => setIsModalOpen(true), children: "Create note +" })] }), isLoading && _jsx("p", { children: "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u043D\u043E\u0442\u0430\u0442\u043A\u0456\u0432..." }), isError && _jsxs("p", { children: ["\u041F\u043E\u043C\u0438\u043B\u043A\u0430: ", error.message] }), data && data.notes.length > 0 && (_jsx(NoteList, { notes: data.notes, onDelete: handleDelete })), isModalOpen && (_jsx(Modal, { onClose: () => setIsModalOpen(false), children: _jsx(NoteForm, { onSubmit: handleCreate, onCancel: () => setIsModalOpen(false) }) }))] }));
};
