import { useState, useMemo } from "react";
import ViewAll from "./ViewAll";
import Pagination from "./Pagination";



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
    

    // Function to get status badge classes
    const getStatusClasses = (status) => {
        switch ((status || "").toLowerCase()) {
            case "processing":
            return "bg-orange-50 text-orange-500";
            case "shipping":
            case "shipped":
            return "bg-blue-50 text-blue-700";
            case "delivered":
            return "bg-green-50 text-green-500";
            case "cancelled":
            case "canceled":
            return "bg-red-50 text-red-400";
            default:
            return "bg-gray-50 text-gray-700";
        }
    };

    
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden col-span-5">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-xl text-brand-500 font-semibold">Recent Orders</h3>
                <ViewAll to="/ecommerce/orders" />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th 
                                className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('productName')}
                            >
                                PRODUCT
                            </th>
                            <th 
                                className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('customerName')}
                            >
                                CUSTOMER
                            </th>
                            <th 
                                className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('price')}
                            >
                                TOTAL
                            </th>
                            <th 
                                className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
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
                                <p className={`text-sm rounded-2xl px-3 py-1 w-[fit-content] font-medium text-gray-900 ${getStatusClasses(order.status)}`}>{order.status}</p>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Pagination
                    itemsPerPage={itemsPerPage}
                    sortedData={sortedData}
                    currentPage={currentPage}
                    getPageNumbers={getPageNumbers}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                />
            </div>
        </div>
    );
}


/* 
itemsPerPage={itemsPerPage}
                    sortedData={sortedData}
                    currentPage={currentPage}
                    getPageNumbers={getPageNumbers}
                    totalPages={totalPages}
*/