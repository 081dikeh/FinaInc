import { useState, useMemo } from "react";
import PageTitle from "../../components/layout/PageTitle";
import StatCard from "../../components/layout/StatCard";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import Modal from "../../components/Modal";
import Pagination from "../../components/Pagination";
import { Categories as categoriesData } from "../../data/ecomercemockData/categoriesData";
import CategoryDetailsModal from "./CategoriesComponents/CategoryDetailsModal";
import iconBadge1 from "../../assets/ecommercepage-assets/Icon Badge1.png";
import iconBadge2 from "../../assets/ecommercepage-assets/Icon Badge2.png";
import iconBadge3 from "../../assets/ecommercepage-assets/Icon Badge3.png";
import iconBadge4 from "../../assets/ecommercepage-assets/Icon Badge4.png";

import { Check, ChevronDown } from "lucide-react";

const inputClass =
  "w-full px-4 py-2.5 border-2 border-[#E0E2E7] rounded-xl text-sm text-brand-500 focus:outline-none focus:ring-2 focus:ring-primary-light";
const labelClass = "text-sm font-semibold text-brand-400 mb-1.5 block";

function AddCategoryModal({ isOpen, onClose, onAdd }) {
  const [form, setForm] = useState({ productName: "", productDescription: "" });
  const handleChange = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    if (!form.productName) return;
    onAdd({
      id: Date.now(),
      productName: form.productName,
      productDescription: form.productDescription,
      productImage:
        "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=300&fit=crop",
      productAmount: 0,
      stockAmount: 0,
    });
    setForm({ productName: "", productDescription: "" });
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Category">
      <form onSubmit={submit} className="flex flex-col gap-4">
        <div>
          <label className={labelClass}>Category Name</label>
          <input
            className={inputClass}
            placeholder="e.g. Wireless Headphones"
            value={form.productName}
            onChange={handleChange("productName")}
            required
          />
        </div>
        <div>
          <label className={labelClass}>Description</label>
          <textarea
            className={inputClass}
            rows={3}
            placeholder="Type description here..."
            value={form.productDescription}
            onChange={handleChange("productDescription")}
          />
        </div>
        <div className="flex gap-3 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl border-2 border-[#E0E2E7] text-brand-400 font-semibold hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2.5 rounded-xl bg-primary-light text-white font-semibold hover:opacity-90 shadow-lg"
          >
            Add Category
          </button>
        </div>
      </form>
    </Modal>
  );
}

function ProductCard({ category, isSelected, onToggle, onView }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4 flex justify-between items-start">
        <button
          onClick={onToggle}
          className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
            isSelected
              ? "bg-purple-600 border-purple-600"
              : "border-gray-300 hover:border-purple-400"
          }`}
        >
          {isSelected && <Check size={16} className="text-white" strokeWidth={3} />}
        </button>
      </div>

      <div onClick={onView} className="cursor-pointer">
        <div className="mb-4 flex justify-center">
          <img
            src={category.productImage}
            alt={category.productName}
            className="w-48 h-48 object-contain"
          />
        </div>

        <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
          {category.productName}
        </h3>

        <p className="text-sm text-gray-500 text-center mb-6">
          {category.productDescription}
        </p>

        <div className="flex justify-center gap-12">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Product</p>
            <p className="text-base font-semibold text-gray-900">{category.productAmount}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Stock</p>
            <p className="text-base font-semibold text-gray-900">{category.stockAmount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StockFilterDropdown({ value, setValue }) {
  const [open, setOpen] = useState(false);
  const options = ["All Stock", "In Stock", "Out of Stock"];
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="text-sm text-brand-400 p-1.5 px-3 border-2 border-[#E0E2E7] flex gap-1 items-center rounded-lg font-[500] bg-white"
      >
        {value} <ChevronDown color="#858D9D" size={20} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-30">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                setValue(opt);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                value === opt ? "text-primary-light font-semibold" : "text-brand-400"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SortDropdown({ value, setValue }) {
  const [open, setOpen] = useState(false);
  const options = ["Newest", "Oldest", "Most Products", "Most Stock"];
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="text-sm text-brand-400 p-1.5 px-3 border-2 border-[#E0E2E7] flex gap-1 items-center rounded-lg font-[500] bg-white"
      >
        {value} <ChevronDown color="#858D9D" size={20} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-30">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                setValue(opt);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                value === opt ? "text-primary-light font-semibold" : "text-brand-400"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const Categories = () => {
  const [categories, setCategories] = useState(categoriesData);
  const [selectedIds, setSelectedIds] = useState([]);
  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState("All Stock");
  const [sortBy, setSortBy] = useState("Newest");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [detailsCategory, setDetailsCategory] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const stats = useMemo(() => {
    const totalCategories = categories.length;
    const totalProducts = categories.reduce((sum, c) => sum + c.productAmount, 0);
    const totalStock = categories.reduce((sum, c) => sum + c.stockAmount, 0);
    const outOfStock = categories.filter((c) => c.stockAmount === 0).length;
    return { totalCategories, totalProducts, totalStock, outOfStock };
  }, [categories]);

  const statCards = [
    { title: "Total Categories", value: stats.totalCategories, isPositive: true, change: "+4%", titleIcon: iconBadge1 },
    { title: "Total Products", value: stats.totalProducts.toLocaleString(), isPositive: true, change: "+6%", titleIcon: iconBadge2 },
    { title: "Total Stock", value: stats.totalStock.toLocaleString(), isPositive: true, change: "+2%", titleIcon: iconBadge3 },
    { title: "Out of Stock", value: stats.outOfStock, isPositive: false, change: "-1%", titleIcon: iconBadge4 },
  ];

  const filtered = useMemo(() => {
    let result = categories.filter((c) => {
      const matchesSearch = c.productName.toLowerCase().includes(search.toLowerCase());
      const matchesStock =
        stockFilter === "All Stock" ||
        (stockFilter === "In Stock" && c.stockAmount > 0) ||
        (stockFilter === "Out of Stock" && c.stockAmount === 0);
      return matchesSearch && matchesStock;
    });

    if (sortBy === "Newest") {
      result = [...result].sort((a, b) => b.id - a.id);
    } else if (sortBy === "Oldest") {
      result = [...result].sort((a, b) => a.id - b.id);
    } else if (sortBy === "Most Products") {
      result = [...result].sort((a, b) => b.productAmount - a.productAmount);
    } else if (sortBy === "Most Stock") {
      result = [...result].sort((a, b) => b.stockAmount - a.stockAmount);
    }
    return result;
  }, [categories, search, stockFilter, sortBy]);

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

  const toggleSelect = (id) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const handleAdd = (cat) => setCategories((prev) => [cat, ...prev]);

  const handleDeleteOne = (cat) => setDeleteTarget(cat);
  const confirmDelete = () => {
    setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    setSelectedIds((prev) => prev.filter((id) => id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const handleBulkDelete = () => {
    setCategories((prev) => prev.filter((c) => !selectedIds.includes(c.id)));
    setSelectedIds([]);
  };

  return (
    <section className="w-full min-w-7xl font-Geist">
      <div className="flex justify-between items-end mb-6">
        <PageTitle title="Categories" navigationRoute="Ecommerce / Categories" />
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 bg-primary-light text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg"
        >
          + Add Category
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {statCards.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <div className="flex justify-between items-center mt-6 gap-4">
        <div className="flex-1 relative">
          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-4 pr-4 py-2.5 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-4">
          <StockFilterDropdown
            value={stockFilter}
            setValue={(v) => {
              setStockFilter(v);
              setCurrentPage(1);
            }}
          />
          <SortDropdown value={sortBy} setValue={setSortBy} />
          <button
            onClick={handleBulkDelete}
            disabled={selectedIds.length === 0}
            className="flex items-center gap-2 px-3 py-1 rounded bg-[#FCE0E0] text-[#F16363] rounded-lg disabled:opacity-40"
          >
            Delete{selectedIds.length > 0 ? ` (${selectedIds.length})` : ""}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {currentData.map((category) => (
          <ProductCard
            key={category.id}
            category={category}
            isSelected={selectedIds.includes(category.id)}
            onToggle={() => toggleSelect(category.id)}
            onView={() => {
              setDetailsCategory(category);
              setIsDetailsOpen(true);
            }}
          />
        ))}
        {currentData.length === 0 && (
          <p className="col-span-full text-center text-brand-100 text-sm py-8">
            No categories found.
          </p>
        )}
      </div>

      {filtered.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm mt-8">
          <Pagination
            itemsPerPage={itemsPerPage}
            sortedData={filtered}
            currentPage={currentPage}
            getPageNumbers={getPageNumbers}
            totalPages={totalPages}
            handlePageChange={setCurrentPage}
          />
        </div>
      )}

      <AddCategoryModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onAdd={handleAdd} />
      <CategoryDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        category={detailsCategory}
        onDelete={handleDeleteOne}
      />
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        itemName={deleteTarget ? `"${deleteTarget.productName}"` : "this category"}
      />
    </section>
  );
};

export default Categories;
