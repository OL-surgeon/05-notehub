import { jsx as _jsx } from "react/jsx-runtime";
import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";
export const Pagination = ({ pageCount, onPageChange, currentPage, }) => {
    if (pageCount <= 1)
        return null;
    const handlePageChange = (event) => {
        onPageChange(event.selected + 1); // ReactPaginate 0-based index
    };
    return (_jsx(ReactPaginate, { previousLabel: "Prev", nextLabel: "Next", pageCount: pageCount, forcePage: currentPage - 1, onPageChange: handlePageChange, containerClassName: css.pagination, activeClassName: css.active, disabledClassName: css.disabled, pageClassName: css.pageItem, pageLinkClassName: css.pageLink, previousClassName: css.pageItem, nextClassName: css.pageItem, previousLinkClassName: css.pageLink, nextLinkClassName: css.pageLink }));
};
