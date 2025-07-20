"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./SearchBar.module.css";
import { toast } from "react-hot-toast";
export const SearchBar = ({ action }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get("query")?.toString().trim() || "";
        if (!query) {
            toast.error("Введіть пошуковий запит.");
            return;
        }
        action(query);
    };
    return (_jsxs("form", { className: css.form, onSubmit: handleSubmit, children: [_jsx("input", { type: "text", name: "query", placeholder: "Search movies...", className: css.input, autoComplete: "off", autoFocus: true }), _jsx("button", { type: "submit", className: css.button, children: "Search" })] }));
};
