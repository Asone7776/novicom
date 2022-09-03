import { FC } from 'react';
import Arrow from '../img/arrow-right.svg';
interface PdfPaginationProps {
    onNext: () => void
    onPrev: () => void
    pageNumber: number
    numPages: number
}

const PdfPagination: FC<PdfPaginationProps> = ({ onNext, onPrev, pageNumber, numPages }) => {
    return (
        <div className="pdf-pagination">
            <button className='pdf-arrow left' type="button" disabled={pageNumber <= 1} onClick={onPrev}>
                <img src={Arrow} alt="arrow" />
            </button>
            <p>
                {pageNumber || (numPages ? 1 : "--")}/{numPages || "--"}
            </p>
            <button
                className='pdf-arrow right'
                type="button"
                disabled={pageNumber >= numPages}
                onClick={onNext}
            >
                <img src={Arrow} alt="arrow" />
            </button>
        </div>
    );
}

export default PdfPagination;