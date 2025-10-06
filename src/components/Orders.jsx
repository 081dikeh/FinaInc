import { useState } from "react";
import { Link } from "react-router-dom";

export default function Orders({ data }) {
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    const handleSort = (field) => {
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


    
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Recent Orders</h3>
                <Link>View all</Link>
            </div>

            <div className="overflow-x-auto">
                <table>
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
                    {sortedData.map((order) => (
                        <tr key={order.orderId} className="border-b hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className=" flex items-center gap-3">
                                    <img src={order.productImage} className="w-10 h-10 rounded-full object-cover" alt="" />
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
            </div>
        </div>
    );
}