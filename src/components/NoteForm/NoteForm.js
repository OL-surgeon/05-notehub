import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./NoteForm.module.css";
const validationSchema = Yup.object({
    title: Yup.string()
        .min(3, "Мінімум 3 символи")
        .max(50, "Максимум 50 символів")
        .required("Обов'язкове поле"),
    content: Yup.string().max(500, "Максимум 500 символів"),
    tag: Yup.mixed()
        .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Невірний тег")
        .required("Обов'язкове поле"),
});
const initialValues = {
    title: "",
    content: "",
    tag: "Todo",
};
export const NoteForm = ({ onSubmit, onCancel }) => {
    return (_jsx(Formik, { initialValues: initialValues, validationSchema: validationSchema, onSubmit: (values, { setSubmitting, resetForm }) => {
            onSubmit(values);
            setSubmitting(false);
            resetForm();
        }, children: ({ isSubmitting }) => (_jsxs(Form, { className: css.form, noValidate: true, children: [_jsxs("div", { className: css.formGroup, children: [_jsx("label", { htmlFor: "title", children: "Title" }), _jsx(Field, { id: "title", name: "title", type: "text", className: css.input }), _jsx(ErrorMessage, { name: "title", component: "span", className: css.error })] }), _jsxs("div", { className: css.formGroup, children: [_jsx("label", { htmlFor: "content", children: "Content" }), _jsx(Field, { as: "textarea", id: "content", name: "content", rows: 8, className: css.textarea }), _jsx(ErrorMessage, { name: "content", component: "span", className: css.error })] }), _jsxs("div", { className: css.formGroup, children: [_jsx("label", { htmlFor: "tag", children: "Tag" }), _jsxs(Field, { as: "select", id: "tag", name: "tag", className: css.select, children: [_jsx("option", { value: "Todo", children: "Todo" }), _jsx("option", { value: "Work", children: "Work" }), _jsx("option", { value: "Personal", children: "Personal" }), _jsx("option", { value: "Meeting", children: "Meeting" }), _jsx("option", { value: "Shopping", children: "Shopping" })] }), _jsx(ErrorMessage, { name: "tag", component: "span", className: css.error })] }), _jsxs("div", { className: css.actions, children: [_jsx("button", { type: "button", className: css.cancelButton, onClick: onCancel, children: "Cancel" }), _jsx("button", { type: "submit", className: css.submitButton, disabled: isSubmitting, children: "Create note" })] })] })) }));
};
