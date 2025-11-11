import { Search } from "lucide-react"
import { useState } from "react"
import Pagination from "../../../components/Pagination";
import { ArrowDown, ArrowUp, Share2 } from "lucide-react";


export default function MyCardTable({ data }) {

    const [cashType, setCashType] = useState('All Types');
    const [timeFrame, setTimeFrame] = useState('Newest');

    // Sorting state
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    //pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);  

    //sorting table according to card type
    const [cardType, setCardType] = useState('All Cards');
    const cardTypebyColor = ['All Cards', 'Purple Card', 'Black Card', 'Blue Card', 'Green Card'];
    const filterByCardType = data.filter((item) => {
        if (cardType === 'All Cards') return true;
        const cardMap = {
            'Purple Card': 'purple',
            'Black Card': 'black',
            'Blue Card': 'blue',
            'Green Card': 'green',
        };
        const selectedType = cardMap[cardType];

        return item.cardType === selectedType;
        
    });
  
 
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

    const sortedData = [...filterByCardType].sort((a, b) => {
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

    const handleCardTypeClick = (type) => {
        setCardType(type);
        setCurrentPage(1);
    };
    

    return (
        <section className="mt-10">
            <div className=" border-b-2">
                <ul className="flex gap-2 text-brand-300 text-sm cursor-pointer font-semibold">
                    {cardTypebyColor.map((type) => (
                        <li 
                            key={type}
                            className={`p-3 transition-colors ${
                                cardType === type 
                                    ? 'border-b-2 border-primary-light text-primary-light' 
                                    : 'hover:text-primary-light hover:border-b-2'
                            }`}
                            onClick={() => handleCardTypeClick(type)}
                            
                        >
                            {type}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-6 flex flex-col gap-6">

                <div className="flex items-center gap-3">
                    <div className="flex-1 relative">
                        <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 " />
                        <input placeholder="Search transaction..." className=" pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div className="flex gap-2 text-sm text-brand-400 font-medium">

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

                <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
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
            </div>
        </section>
    )
}