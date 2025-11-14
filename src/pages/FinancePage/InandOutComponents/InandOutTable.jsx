import { useState } from "react"
import Pagination from "../../../components/Pagination";
import { ArrowDown, ArrowUp, Share2 } from "lucide-react";

export default function InandOutTable({ data }) {
    
        // Sorting state
        const [sortField, setSortField] = useState(null);
        const [sortDirection, setSortDirection] = useState('asc');
    
        //pagination state
        const [currentPage, setCurrentPage] = useState(1);
        const [itemsPerPage] = useState(10);         
     
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
            const getStatusClasses = (transaction) => {
            switch ((transaction || "").toLowerCase()) {
                case "pending":
                return "bg-orange-50 text-orange-500";
                case "success":
                return "bg-green-50 text-green-600";
                default:
                return "bg-gray-50 text-gray-700";
            }
        };
    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm mt-8">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th 
                            className="px-6 py-3 text-left text-sm font-semibold text-gray-500 uppercase cursor-pointer hover:bg-gray-100 tracking-wider"
                            onClick={() => handleSort('id')}
                        >
                            ID
                        </th>
                        <th 
                            className="px-6 py-3 text-left text-sm font-semibold text-gray-500 uppercase cursor-pointer hover:bg-gray-100 tracking-wider"
                            onClick={() => handleSort('detail')}
                        >
                            DETAILS
                        </th>
                        <th 
                            className="px-6 py-3 text-left text-sm font-semibold text-gray-500 uppercase cursor-pointer hover:bg-gray-100 tracking-wider"
                            onClick={() => handleSort('amount')}
                        >
                            AMOUNT
                        </th>
                        <th 
                            className="px-6 py-3 text-left text-sm font-semibold text-gray-500 uppercase cursor-pointer hover:bg-gray-100 tracking-wider"
                            onClick={() => handleSort('type')}
                        >
                            TYPE
                        </th>
                        <th 
                            className="px-6 py-3 text-left text-sm font-semibold text-gray-500 uppercase cursor-pointer hover:bg-gray-100 tracking-wider"
                            onClick={() => handleSort('date')}
                        >
                            DATE
                        </th>
                        <th 
                            className="px-6 py-3 text-left text-sm font-semibold text-gray-500 uppercase cursor-pointer hover:bg-gray-100 tracking-wider"
                            onClick={() => handleSort('status')}
                        >
                            STATUS
                        </th>
                        <th 
                            className="px-6 py-3 text-left text-sm font-semibold text-gray-500 uppercase cursor-pointer hover:bg-gray-100 tracking-wider"
                        >
                            ACTION
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                {currentData.map((transaction) => (
                    <tr key={transaction.id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-brand-500 text-sm font-medium">
                            <p>{transaction.id}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                                <p className="text-brand-500 text-sm font-medium">{transaction.detail}</p>
                                <p className="text-xs text-brand-100 font-medium">{transaction.company}</p>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <p className={`text-sm font-medium ${((transaction.type||'').toLowerCase() === 'expense') ? 'text-red-600' : 'text-green-600'}`}>{((transaction.type||'').toLowerCase() === 'expense') ? '-' : '+'}
                                ${Number(transaction.amount).toFixed(2)}
                            </p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <p className={`text-sm flex gap-2 text-brand-500 font-medium `}>{transaction.type === 'Expense' ? <ArrowUp size={19} color="red" /> : <ArrowDown size={19} color="green" />} {transaction.type}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <p className={`text-brand-500 text-sm font-medium `}>{transaction.date}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <p className={`text-sm rounded-2xl px-3 py-1 w-[fit-content] font-medium ${getStatusClasses(transaction.status)} `}>{transaction.status}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <p className={`text-sm rounded-2xl font-medium   `}>
                                <button className="bg-blue-200 p-1 rounded">
                                    <Share2 size={17} color="#2D99FE" />
                                </button>
                            </p>
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
    )
}