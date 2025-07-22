import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./NoteForm.module.css";

import { createNote, CreateNoteData } from "../../services/noteService";

interface NoteFormProps {
  onCancel: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Обов'язкове поле"),
  content: Yup.string().required("Обов'язкове поле"),
  tag: Yup.string().required("Обов'язкове поле"),
});

const initialValues: CreateNoteData = {
  title: "",
  content: "",
  tag: "general",
};

export const NoteForm: React.FC<NoteFormProps> = ({ onCancel }) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onCancel();
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        createMutation.mutate(values, {
          onSettled: () => {
            setSubmitting(false);
          },
        });
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <label htmlFor="title" className={css.label}>
            Заголовок:
          </label>
          <Field id="title" name="title" type="text" className={css.input} />
          <ErrorMessage name="title" component="div" className={css.error} />

          <label htmlFor="content" className={css.label}>
            Вміст:
          </label>
          <Field
            id="content"
            name="content"
            as="textarea"
            rows={5}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="div" className={css.error} />

          <label htmlFor="tag" className={css.label}>
            Тег:
          </label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="general">General</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
          </Field>
          <ErrorMessage name="tag" component="div" className={css.error} />

          <div className={css.buttons}>
            <button
              type="submit"
              disabled={isSubmitting}
              className={css.submitButton}
            >
              {isSubmitting ? "Створення..." : "Створити"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className={css.cancelButton}
            >
              Відміна
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
