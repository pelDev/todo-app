import { LeftArrowIcon, RightArrowIcon } from "../../assets/svg";
import { DOTS } from "../../constants";
import { usePagination } from "../../hooks/usePagination";
import "./styles.scss";

interface Props {
    totalCount: number;
    currentPage: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    siblingCount?: number;
    className?: string;
}

export default function Pagination(props: Props) {
    const {
        currentPage,
        onPageChange
    } = props;

    const paginationRange = usePagination(props);

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <div className="custom-pagination d-flex flex-row justify-content-between align-items-center">
            <button onClick={onPrevious} disabled={currentPage === 1}>
                <LeftArrowIcon />

                <span>Previous</span>
            </button>

            <ul>
                {
                    paginationRange.map((pageNumber) => {
                        if (pageNumber === DOTS) {
                            return <li className="dots">&#8230;</li>
                        }

                        return (
                            <li
                                className={`page-number ${pageNumber === currentPage ? 'selected' : ''}`}
                                onClick={() => onPageChange(pageNumber as number)}
                            >
                                {pageNumber}
                            </li>
                        );
                    })
                }
            </ul>

            <button onClick={onNext} disabled={currentPage === lastPage}>
                <span>Next</span>

                <RightArrowIcon />
            </button>
        </div>
    );
}