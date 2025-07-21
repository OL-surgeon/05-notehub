import React from "react";
import css from "./NoteList.module.css";
import { Note } from "../../types/note";

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
}

export const NoteList: React.FC<NoteListProps> = ({ notes, onDelete }) => {
  if (notes.length === 0) return null;

  return (
    <ul className={css.list}>
      {notes.map(({ _id, title, content, tag }) => (
        <li key={_id} className={css.listItem}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{tag}</span>
            <button className={css.button} onClick={() => onDelete(_id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
