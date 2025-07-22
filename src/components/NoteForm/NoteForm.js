import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./NoteForm.module.css";
import { createNote } from "../../services/noteService";
const validationSchema = Yup.object({
    title: Yup.string().required("Обов'язкове поле"),
    content: Yup.string().required("Обов'язкове поле"),
    tag: Yup.string().required("Обов'язкове поле"),
});
const initialValues = {
    title: "",
    content: "",
    tag: "general",
};
export const NoteForm = ({ onCancel }) => {
    const queryClient = useQueryClient();
    const createMutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            onCancel();
        },
    });
    return (_jsx(Formik, { initialValues: initialValues, validationSchema: validationSchema, onSubmit: (values, { setSubmitting }) => {
            createMutation.mutate(values, {
                onSettled: () => {
                    setSubmitting(false);
                },
            });
        }, children: ({ isSubmitting }) => (_jsxs(Form, { className: css.form, children: [_jsx("label", { htmlFor: "title", className: css.label, children: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A:" }), _jsx(Field, { id: "title", name: "title", type: "text", className: css.input }), _jsx(ErrorMessage, { name: "title", component: "div", className: css.error }), _jsx("label", { htmlFor: "content", className: css.label, children: "\u0412\u043C\u0456\u0441\u0442:" }), _jsx(Field, { id: "content", name: "content", as: "textarea", rows: 5, className: css.textarea }), _jsx(ErrorMessage, { name: "content", component: "div", className: css.error }), _jsx("label", { htmlFor: "tag", className: css.label, children: "\u0422\u0435\u0433:" }), _jsxs(Field, { as: "select", id: "tag", name: "tag", className: css.select, children: [_jsx("option", { value: "general", children: "General" }), _jsx("option", { value: "work", children: "Work" }), _jsx("option", { value: "personal", children: "Personal" })] }), _jsx(ErrorMessage, { name: "tag", component: "div", className: css.error }), _jsxs("div", { className: css.buttons, children: [_jsx("button", { type: "submit", disabled: isSubmitting, className: css.submitButton, children: isSubmitting ? "Створення..." : "Створити" }), _jsx("button", { type: "button", onClick: onCancel, disabled: isSubmitting, className: css.cancelButton, children: "\u0412\u0456\u0434\u043C\u0456\u043D\u0430" })] })] })) }));
};
