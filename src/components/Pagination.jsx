import { ChevronLeft, ChevronRight } from "lucide-react";


export default function Pagination({ itemsPerPage, sortedData, currentPage, getPageNumbers, totalPages }) {

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
                            className=" p-1 rounded-lg hover:bg-brand-600 transition bg-brand-800 "
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
                            className=" p-1 rounded-lg hover:bg-brand-600 transition bg-brand-800 "
                        >
                            <ChevronRight className=" text-primary-light text-base hover:text-white transition" />
                        </button>
                    </div>
                </div>
    )
}