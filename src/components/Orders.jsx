import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";



export default function Orders({ data }) {
    // Sorting state
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
    };
    
    const activeStyle = "px-3 py-1 bg-brand-600 text-white rounded";
    const normalStyle = "px-3 py-1 bg-white text-brand-600 border border-brand-600 rounded hover:bg-brand-600 hover:text-white transition";

    
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden col-span-5">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Recent Orders</h3>
                <Link className="text-brand-600 hover:underline">View all &#8594;</Link>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('productName')}
                            >
                                PRODUCT
                            </th>
                            <th 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('customerName')}
                            >
                                CUSTOMER
                            </th>
                            <th 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('price')}
                            >
                                TOTAL
                            </th>
                            <th 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('status')}
                            >
                                STATUS
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {currentData.map((order) => (
                        <tr key={order.orderId} className="border-b hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className=" flex items-center gap-3">
                                    <img src={order.productImage} className="w-10 h-10 rounded object-cover" alt="" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{order.productName}</p>
                                        <p className="text-xs text-gray-500">{order.quantityOrdered} products</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
                                    <p className="text-xs text-gray-500">{order.customerEmail}</p>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <p className="text-sm font-medium text-gray-900">${(order.price * order.quantityOrdered).toFixed(2)}</p>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <p className="text-sm font-medium text-gray-900">{order.status}</p>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
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
                            className=" p-1 rounded hover:bg-brand-600 transition bg-brand-800 "
                        >
                            <ChevronLeft className=" text-brand-600 text-base hover:text-white transition" />
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
                            className=" p-1 rounded hover:bg-brand-600 transition bg-brand-800 "
                        >
                            <ChevronRight className=" text-brand-600 text-base hover:text-white transition" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}