import { Search } from "lucide-react"
import { useState } from "react"
import Pagination from "../../../components/Pagination";

export default function MyCardTable({ data }) {
    const [cashType, setCashType] = useState('All Types');
    const [timeFrame, setTimeFrame] = useState('Newest');
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
    

    return (
        <section>
            <div>
                <ul className="flex gap-2 text-brand-300 text-sm cursor-pointer font-semibold">
                    <li>All Card</li>
                    <li>Purple Card</li>
                    <li>Black Card</li>
                    <li>Blue Card</li>
                    <li>Green Card</li>
                </ul>
            </div>

            <div className="mt-6 ">
                <div className="flex items-center gap-3">
                    <div className="flex-1 relative">
                        <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 " />
                        <input placeholder="Search transaction..." className=" pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div className="flex gap-2">

                        <select name="" id=""                        
                            value={cashType}
                            onChange={(e) => setCashType(e.target.value)}
                            className="border rounded-lg p-2"
                        
                        >
                            <option value={'All Types'}>All Types</option>
                            <option value={'Income'}>Income</option>
                            <option value={'Expense'}>Expense</option>
                            <option value={'Transfer'}>Transfer</option>
                        </select>

                        <select name="" id=""
                        
                            value={timeFrame}
                            onChange={(e) => setTimeFrame(e.target.value)}
                            className="border rounded-lg p-2"
                        
                        >
                            <option value={'Newest'}>Newest</option>
                            <option value={'Oldest'}>Oldest</option>
                        </select>

                    </div>   
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('id')}
                                >
                                    ID
                                </th>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('detail')}
                                >
                                    DETAILS
                                </th>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('amount')}
                                >
                                    AMOUNT
                                </th>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('type')}
                                >
                                    TYPE
                                </th>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('date')}
                                >
                                    DATE
                                </th>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('status')}
                                >
                                    STATUS
                                </th>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                                >
                                    ACTION
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                        {currentData.map((transaction) => (
                            <tr key={transaction.id} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <p>{transaction.id}</p>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{transaction.detail}</p>
                                        <p className="text-xs text-gray-500">{transaction.company}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <p className="text-sm font-medium text-gray-900">${(transaction.amount).toFixed(2)}</p>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <p className={`text-sm rounded-2xl px-3 py-1 font-medium text-gray-900 `}>{transaction.type}</p>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <p className={`text-sm rounded-2xl px-3 py-1 font-medium text-gray-900 `}>{transaction.date}</p>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <p className={`text-sm rounded-2xl px-3 py-1 font-medium text-gray-900 `}>{transaction.status}</p>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <p className={`text-sm rounded-2xl px-3 py-1 font-medium text-gray-900 `}>action</p>
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
                    />
                </div>                 
            </div>
        </section>
    )
}