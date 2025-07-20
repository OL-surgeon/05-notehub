"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./MovieGrid.module.css";
export function MovieGrid({ movies, onSelect }) {
    if (!movies.length)
        return null;
    return (_jsx("ul", { className: css.grid, children: movies.map((movie) => (_jsx("li", { onClick: () => onSelect(movie), children: _jsxs("div", { className: css.card, children: [_jsx("img", { className: css.image, src: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, alt: movie.title, loading: "lazy" }), _jsx("h2", { className: css.title, children: movie.title })] }) }, movie.id))) }));
}
