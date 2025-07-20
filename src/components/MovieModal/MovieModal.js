import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import css from "./MovieModal.module.css";
const modalRoot = document.getElementById("modal-root");
export const MovieModal = ({ movie, onClose }) => {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape")
                onClose();
        };
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleEsc);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleEsc);
        };
    }, [onClose]);
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget)
            onClose();
    };
    return createPortal(_jsx("div", { className: css.backdrop, role: "dialog", "aria-modal": "true", "aria-labelledby": "movie-title", "aria-describedby": "movie-description", onClick: handleBackdropClick, children: _jsxs("div", { className: css.modal, children: [_jsx("button", { className: css.closeButton, onClick: onClose, "aria-label": "Close modal", children: "\u00D7" }), movie.backdrop_path && (_jsx("img", { src: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`, alt: movie.title, className: css.image })), _jsxs("div", { className: css.content, children: [_jsx("h2", { id: "movie-title", children: movie.title }), _jsx("p", { id: "movie-description", children: movie.overview }), _jsxs("p", { children: [_jsx("strong", { children: "Release Date:" }), " ", movie.release_date] }), _jsxs("p", { children: [_jsx("strong", { children: "Rating:" }), " ", movie.vote_average.toFixed(1), "/10"] })] })] }) }), modalRoot);
};
