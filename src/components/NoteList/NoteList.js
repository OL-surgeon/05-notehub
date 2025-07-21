import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./NoteList.module.css";
export const NoteList = ({ notes, onDelete }) => {
    if (notes.length === 0)
        return null;
    return (_jsx("ul", { className: css.list, children: notes.map(({ _id, title, content, tag }) => (_jsxs("li", { className: css.listItem, children: [_jsx("h2", { className: css.title, children: title }), _jsx("p", { className: css.content, children: content }), _jsxs("div", { className: css.footer, children: [_jsx("span", { className: css.tag, children: tag }), _jsx("button", { className: css.button, onClick: () => onDelete(_id), children: "Delete" })] })] }, _id))) }));
};
