import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <div className="join">
            <button
                className="join-item btn"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                «
            </button>
            {startPage > 1 && (
                <>
                    <button
                        className={`join-item btn ${1 === currentPage ? 'btn-active' : ''}`}
                        onClick={() => onPageChange(1)}
                    >
                        1
                    </button>
                    {startPage > 2 && (
                        <button className="join-item btn btn-disabled">
                            ...
                        </button>
                    )}
                </>
            )}
            {pages.map(page => (
                <button
                    key={page}
                    className={`join-item btn ${page === currentPage ? 'btn-active' : ''}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && (
                        <button className="join-item btn btn-disabled">
                            ...
                        </button>
                    )}
                    <button
                        className={`join-item btn ${totalPages === currentPage ? 'btn-active' : ''}`}
                        onClick={() => onPageChange(totalPages)}
                    >
                        {totalPages}
                    </button>
                </>
            )}
            <button
                className="join-item btn"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                »
            </button>
        </div>
    );
};

export default Pagination;