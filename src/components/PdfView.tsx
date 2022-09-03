import { PDFDocumentProxy } from 'pdfjs-dist';
import { FC, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import PdfPagination from '../components/PdfPagination';
import Spinner from './Spinner';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
interface PdfViewProps {
    pdfUrl: any
}

const PdfView: FC<PdfViewProps> = ({ pdfUrl }) => {

    const [numPages, setNumPages] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = (pdf: PDFDocumentProxy) => {
        setNumPages(pdf.numPages);
        setPageNumber(1);
    }


    const changePage = (offset: number) => {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    const previousPage = () => {
        changePage(-1);
    }

    const nextPage = () => {
        changePage(1);
    }
    return (
        <div className="pdf-view">
            <Document  noData={'Нет файла'} error={'Ошибка при отображении PDF'} loading={<Spinner />} file={pdfUrl} onLoadError={console.error} onLoadSuccess={onDocumentLoadSuccess}>
                <Page scale={1.2} pageNumber={pageNumber} />
            </Document>
            <PdfPagination pageNumber={pageNumber} numPages={numPages} onNext={nextPage} onPrev={previousPage} />
        </div>
    );
}

export default PdfView;