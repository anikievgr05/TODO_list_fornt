import React from 'react';

interface PaginationProps {
    currentPage: number;
    lastPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, lastPage, onPageChange }) => {
    // Определяем диапазон отображаемых страниц (например, максимум 5)
    const MAX_VISIBLE_PAGES = 5;

    // Если всего страниц меньше или равно максимальному — показываем все
    if (lastPage <= MAX_VISIBLE_PAGES) {
        const pages = Array.from({ length: lastPage }, (_, i) => i + 1);
        return (
            <div className="flex items-center space-x-2">
                {currentPage > 1 && (
                    <button onClick={() => onPageChange(currentPage - 1)} className="px-2 text-silver_mist hover:text-vivid_violet">
                        ←
                    </button>
                )}
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-2 h-8 hover:text-vivid_violet text-silver_mist ${currentPage === page ? 'border-b-2 border-vivid_violet' : ''}`}
                    >
                        {page}
                    </button>
                ))}
                {currentPage < lastPage && (
                    <button onClick={() => onPageChange(currentPage + 1)} className="px-2 text-silver_mist hover:text-vivid_violet">
                        →
                    </button>
                )}
            </div>
        );
    }

    // Вычисляем диапазон страниц для отображения
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(lastPage, startPage + MAX_VISIBLE_PAGES - 1);

    // Если после вычисления всё ещё слишком близко к концу — сдвигаем начало
    if (endPage - startPage + 1 < MAX_VISIBLE_PAGES) {
        startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
    }

    const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return (
        <div className="flex items-center space-x-2 ">
            {/* Стрелка назад */}
            {currentPage > 1 && (
                <button onClick={() => onPageChange(currentPage - 1)} className="px-2 text-silver_mist hover:text-vivid_violet">
                    ←
                </button>
            )}

            {/* Кнопки страниц */}
            {startPage > 1 && (
                <>
                    <button onClick={() => onPageChange(1)} className="px-2 hover:text-vivid_violet text-silver_mist text-silver_mist">
                        1
                    </button>
                    {startPage > 2 && <span className="px-2">...</span>}
                </>
            )}

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-2 h-8 hover:text-vivid_violet text-silver_mist ${currentPage === page ? 'border-b-2 border-vivid_violet' : ''}`}
                >
                    {page}
                </button>
            ))}

            {/* Троечтие в конце */}
            {endPage < lastPage && (
                <>
                    {endPage < lastPage - 1 && <span className="px-2">...</span>}
                    <button onClick={() => onPageChange(lastPage)} className="px-2  hover:text-vivid_violet text-silver_mist">
                        {lastPage}
                    </button>
                </>
            )}

            {/* Стрелка вперед */}
            {currentPage < lastPage && (
                <button onClick={() => onPageChange(currentPage + 1)} className="px-2  hover:text-vivid_violet text-silver_mist">
                    →
                </button>
            )}
        </div>
    );
};

export default Pagination;