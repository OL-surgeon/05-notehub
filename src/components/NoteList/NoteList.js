import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteList.module.css";
import { deleteNote } from "../../services/noteService";
export const NoteList = ({ notes }) => {
    const queryClient = useQueryClient();
    const deleteMutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
    });
    const handleDelete = (id) => {
        if (window.confirm("Ви впевнені, що хочете видалити нотатку?")) {
            deleteMutation.mutate(id);
        }
    };
    if (notes.length === 0)
        return null;
    return (_jsx("ul", { className: css.list, children: notes.map(({ id, title, content, tag }) => (_jsxs("li", { className: css.listItem, children: [_jsx("h2", { className: css.title, children: title }), _jsx("p", { className: css.content, children: content }), _jsxs("div", { className: css.footer, children: [_jsx("span", { className: css.tag, children: tag }), _jsx("button", { className: css.button, onClick: () => handleDelete(id), children: "Delete" })] })] }, id))) }));
};
