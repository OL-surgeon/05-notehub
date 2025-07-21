import { jsx as _jsx } from "react/jsx-runtime";
import css from "./SearchBox.module.css";
export const SearchBox = ({ value, onChange }) => {
    return (_jsx("input", { className: css.input, type: "text", placeholder: "Search notes", value: value, onChange: (e) => onChange(e.target.value), autoComplete: "off" }));
};
