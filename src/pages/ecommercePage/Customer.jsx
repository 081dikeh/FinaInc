import { useState } from "react";
import { Plus, Eye, Trash2 } from "lucide-react";
import PageTitle from "../../components/layout/PageTitle";
import StatCard from "../../components/layout/StatCard";
import DeleteBtn from "../../components/layout/DeleteBtn";
import Pagination from "../../components/Pagination";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import { SearchBar, FilterDropdownBtn } from "./Product";
import AddCustomerModal from "./CustomerComponents/AddCustomerModal";
import CustomerDetailsModal from "./CustomerComponents/CustomerDetailsModal";
import { customers as initialCustomers, customerStats } from "../../data/ecomercemockData/customerData";
import iconBadge1 from "../../assets/ecommercepage-assets/Icon Badge1.png";
import iconBadge2 from "../../assets/ecommercepage-assets/Icon Badge2.png";
import iconBadge3 from "../../assets/ecommercepage-assets/Icon Badge3.png";
import iconBadge4 from "../../assets/ecommercepage-assets/Icon Badge4.png";

const badges = [iconBadge1, iconBadge2, iconBadge3, iconBadge4];

const getStatusClasses = (status) => {
  switch ((status || "").toLowerCase()) {
    case "active":
      return "bg-green-50 text-green-600";
    case "blocked":
      return "bg-[#FEF0F0] text-brand-900";
    case "inactive":
      return "bg-gray-100 text-gray-600";
    default:
      return "bg-gray-50 text-gray-700";
  }
};

export default function Customer() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const filtered = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All Status" || c.status === statusFilter;
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

  const handleAdd = (customer) => setCustomers((prev) => [customer, ...prev]);
  const handleDelete = () => {
    setCustomers((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    setDeleteTarget(null);
  };
  const openDetails = (customer) => {
    setSelectedCustomer(customer);
    setIsDetailsOpen(true);
  };

  return (
    <section className="w-full min-w-7xl font-Geist">
      <div className="flex justify-between items-end mb-6">
        <PageTitle title="Customer" navigationRoute="Ecommerce / Customer" />
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 bg-primary-light text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg"
        >
          <Plus />
          Add Customer
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {customerStats.map((stat, i) => (
          <StatCard key={i} {...stat} titleIcon={badges[i % badges.length]} />
        ))}
      </div>

      <div className="flex gap-4 mt-6 font-semibold text-sm text-brand-500">
        {["All Status", "Active", "Inactive", "Blocked"].map((s) => (
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
        <SearchBar />
        <div className="flex gap-2">
          <FilterDropdownBtn title="Newest" />
          <DeleteBtn />
        </div>
      </div>

      <div className="mt-6 overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="border-b border-dark-40">
              {["CUSTOMER", "PHONE", "LOCATION", "ORDERS", "SPENT", "STATUS", "JOINED", "ACTION"].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((c) => (
              <tr key={c.id} className="border-b border-dark-30 hover:bg-dark-30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-medium text-brand-500">{c.name}</p>
                      <p className="text-xs text-brand-100">{c.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-500">{c.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-500">{c.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-500">{c.orders}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-brand-500">
                  ${c.totalSpent.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm rounded-2xl px-3 py-1 font-medium ${getStatusClasses(c.status)}`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-500">{c.joinDate}</td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  <button
                    onClick={() => openDetails(c)}
                    className="p-1 bg-[#D5EBFF] rounded"
                    title="View details"
                  >
                    <Eye size={16} color="#2D99FE" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(c)}
                    className="p-1 bg-[#FCE0E0] rounded"
                    title="Delete customer"
                  >
                    <Trash2 size={16} color="#F16363" />
                  </button>
                </td>
              </tr>
            ))}
            {currentData.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-8 text-brand-100 text-sm">
                  No customers found.
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

      <AddCustomerModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onAdd={handleAdd} />
      <CustomerDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        customer={selectedCustomer}
      />
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        itemName={deleteTarget ? `"${deleteTarget.name}"` : "this customer"}
      />
    </section>
  );
}

