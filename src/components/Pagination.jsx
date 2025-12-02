import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";


export default function Pagination({ itemsPerPage, currentPage, sortedData, getPageNumbers, handlePageChange, totalPages }) {
    /* // Sorting state
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    //pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);  
    

    // Handle sorting
    const handleSort = (field) => {
        setCurrentPage(1); // Reset to first page on sort
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const sortedData = [...data].sort((a, b) => {
        if (!sortField) return 0;
        if (sortDirection === 'asc') {
            return a[sortField] > b[sortField] ? 1 : -1;
        } else {
            return a[sortField] < b[sortField] ? 1 : -1;
        }
    });

    // Pagination logic
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = sortedData.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 7) {
            // Show all pages if 7 or fewer
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Show smart pagination with ellipsis
            if (currentPage <= 3) {
                pages.push(1, 2, 3, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage, '...', totalPages);
            }
        }
        return pages;
    }; */

    const activeStyle = "px-3 py-1 bg-primary-light text-white rounded-lg font-semibold";
    const normalStyle = "px-3 py-1 bg-white text-brand-200 font-semibold rounded-lg hover:bg-primary-light hover:text-white transition";
    return (
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            {/* Left side: Show info */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Show</span>
                <select value={itemsPerPage} disabled>
                    <option value="5">5</option>
                </select>
                <span>from {sortedData.length}</span>
            </div>

            {/* Right side: Page buttons */}
            <div className="flex items-center gap-2">
                {/* Previous button */}
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className=" p-1 rounded-lg hover:bg-primary-light transition bg-brand-800 "
                >
                    <ChevronLeft className=" text-primary-light text-base hover:text-white transition" />
                </button>

                {/* Page number buttons */}
                {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                        <span key={`ellipsis-${index}`}>...</span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={currentPage === page ? activeStyle : normalStyle}
                        >
                            {page}
                        </button>
                    )
                ))}

                {/* Next button */}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className=" p-1 rounded-lg hover:bg-primary-light transition bg-brand-800 "
                >
                    <ChevronRight className=" text-primary-light text-base hover:text-white transition" />
                </button>
            </div>
        </div>
    )
}