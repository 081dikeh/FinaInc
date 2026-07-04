import { useState } from "react";
import { ChevronDown, Eye, Trash2 } from "lucide-react";
import PageTitle from "../../components/layout/PageTitle";
import StatCard from "../../components/layout/StatCard";
import DeleteBtn from "../../components/layout/DeleteBtn";
import Pagination from "../../components/Pagination";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import { SearchBar, FilterDropdownBtn } from "./Product";
import OrderDetailsModal from "./OrdersComponents/OrderDetailsModal";
import { orders as initialOrders, orderStats } from "../../data/ecomercemockData/ordersData";
import iconBadge1 from "../../assets/ecommercepage-assets/Icon Badge1.png";
import iconBadge2 from "../../assets/ecommercepage-assets/Icon Badge2.png";
import iconBadge3 from "../../assets/ecommercepage-assets/Icon Badge3.png";
import iconBadge4 from "../../assets/ecommercepage-assets/Icon Badge4.png";

const badges = [iconBadge1, iconBadge2, iconBadge3, iconBadge4];

const getStatusClasses = (status) => {
  switch ((status || "").toLowerCase()) {
    case "delivered":
      return "bg-green-50 text-green-600";
    case "shipped":
      return "bg-[#D5EBFF] text-[#2D99FE]";
    case "processing":
      return "bg-orange-50 text-orange-500";
    case "cancelled":
      return "bg-[#FEF0F0] text-brand-900";
    case "pending":
      return "bg-gray-100 text-gray-600";
    default:
      return "bg-gray-50 text-gray-700";
  }
};

const Orders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All Status" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filtered.slice(startIndex, startIndex + itemsPerPage);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", currentPage, "...", totalPages);
    }
    return pages;
  };

  const openDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const handleDelete = () => {
    setOrders((prev) => prev.filter((o) => o.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <section className="w-full min-w-7xl font-Geist">
      <div className="flex justify-between items-end mb-6">
        <PageTitle title="Orders" navigationRoute="Ecommerce / Orders" />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {orderStats.map((stat, i) => (
          <StatCard key={i} {...stat} titleIcon={badges[i % badges.length]} />
        ))}
      </div>

      <div className="flex gap-4 mt-6 font-semibold text-sm text-brand-500">
        {["All Status", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={statusFilter === s ? "text-primary-light" : "text-brand-500"}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6 gap-4">
        <div className="flex-1 relative">
          <input
            placeholder="Search order ID or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-4 pr-4 py-2.5 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <FilterDropdownBtn title="Newest" />
          <DeleteBtn />
        </div>
      </div>

      <div className="mt-6 overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="border-b border-dark-40">
              {["ORDER ID", "CUSTOMER", "DATE", "ITEMS", "TOTAL", "PAYMENT", "STATUS", "ACTION"].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((order) => (
              <tr key={order.id} className="border-b border-dark-30 hover:bg-dark-30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-primary-light">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <img
                      src={order.customer.avatar}
                      alt={order.customer.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <p className="text-sm font-medium text-brand-500">{order.customer.name}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-500">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-500">
                  {order.items.length} item{order.items.length > 1 ? "s" : ""}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-brand-500">
                  ${order.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-500">{order.payment}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm rounded-2xl px-3 py-1 font-medium ${getStatusClasses(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  <button
                    onClick={() => openDetails(order)}
                    className="p-1 bg-[#D5EBFF] rounded"
                    title="View details"
                  >
                    <Eye size={16} color="#2D99FE" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(order)}
                    className="p-1 bg-[#FCE0E0] rounded"
                    title="Delete order"
                  >
                    <Trash2 size={16} color="#F16363" />
                  </button>
                </td>
              </tr>
            ))}
            {currentData.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-8 text-brand-100 text-sm">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination
          itemsPerPage={itemsPerPage}
          sortedData={filtered}
          currentPage={currentPage}
          getPageNumbers={getPageNumbers}
          totalPages={totalPages}
          handlePageChange={setCurrentPage}
        />
      </div>

      <OrderDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        order={selectedOrder}
      />

      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        itemName={deleteTarget ? `order "${deleteTarget.id}"` : "this order"}
      />
    </section>
  );
};

export default Orders;
