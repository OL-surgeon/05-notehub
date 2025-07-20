"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import { SearchBar } from "../SearchBar/SearchBar";
import { MovieGrid } from "../MovieGrid/MovieGrid";
import { Loader } from "../Loader/Loader";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { MovieModal } from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";
import { useMemo } from "react";
import "./App.css";
import css from "./App.module.css";
const useMovies = (query, page) => {
    const options = {
        queryKey: ["movies", query, page],
        queryFn: () => fetchMovies(query, page),
        enabled: !!query,
        placeholderData: (prev) => prev,
    };
    return useQuery(options);
};
export default function App() {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const { data, isLoading, isError, isSuccess } = useMovies(query, page);
    const movies = useMemo(() => data?.results ?? [], [data?.results]);
    useEffect(() => {
        if (isSuccess && movies.length === 0) {
            toast.error("Фільми не знайдено 🕵️");
        }
    }, [isSuccess, movies]);
    const handleSearchAction = (query) => {
        setPage(1);
        setQuery(query);
    };
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setSelectedMovie(null);
    }, [page, query]);
    return (_jsxs(_Fragment, { children: [_jsx(Toaster, { position: "top-right" }), _jsx(SearchBar, { action: handleSearchAction }), isLoading && _jsx(Loader, {}), isError && _jsx(ErrorMessage, {}), !isLoading && !isError && movies.length === 0 && (_jsx("p", { className: css.noResults, children: "\u041D\u0456\u0447\u043E\u0433\u043E \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E \uD83D\uDD75\uFE0F" })), !isLoading && !isError && movies.length > 0 && (_jsxs(_Fragment, { children: [_jsx(MovieGrid, { movies: movies, onSelect: setSelectedMovie }), data?.total_pages && data.total_pages > 1 && (_jsx(ReactPaginate, { pageCount: data.total_pages, pageRangeDisplayed: 5, marginPagesDisplayed: 1, onPageChange: ({ selected }) => setPage(selected + 1), forcePage: page - 1, containerClassName: css.pagination, activeClassName: css.active, nextLabel: "\u2192", previousLabel: "\u2190" }))] })), selectedMovie && (_jsx(MovieModal, { movie: selectedMovie, onClose: () => setSelectedMovie(null) }))] }));
}
