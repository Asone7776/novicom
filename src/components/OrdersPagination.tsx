import { FC } from "react";
import ReactPaginate from 'react-paginate';

interface OrdersPaginationProps {
    last_page: number
    onFilterChange: (prop: string, value: any) => void
    initialPage: number
}

const OrdersPagination: FC<OrdersPaginationProps> = ({ last_page, onFilterChange, initialPage }) => {

    const handlePageClick = (object: { selected: number }) => {
        onFilterChange('page', object.selected + 1)
    };

    return (
        <ReactPaginate
            breakLabel="..."
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            forcePage={initialPage - 1}
            pageCount={last_page ? last_page : 0}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            previousClassName='d-none'
            nextClassName='d-none'
            renderOnZeroPageCount={() => null}
        />
    );
}

export default OrdersPagination;