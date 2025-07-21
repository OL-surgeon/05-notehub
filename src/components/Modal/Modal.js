import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import css from "./Modal.module.css";
const modalRoot = document.getElementById("modal-root");
export const Modal = ({ children, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);
    const handleBackdropClick = (e) => {
        if (e.currentTarget === e.target) {
            onClose();
        }
    };
    return ReactDOM.createPortal(_jsx("div", { className: css.backdrop, role: "dialog", "aria-modal": "true", onClick: handleBackdropClick, children: _jsx("div", { className: css.modal, children: children }) }), modalRoot);
};
