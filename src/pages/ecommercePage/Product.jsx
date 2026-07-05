import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/layout/PageTitle";
import { Plus, ChevronDown, Search, Pencil, Trash2 } from "lucide-react";
import StatCard from "../../components/layout/StatCard";
import DeleteBtn from "../../components/layout/DeleteBtn";
import Pagination from "../../components/Pagination";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import { products as initialProducts } from "../../data/ecomercemockData/poroductData";
import iconBadge1 from "../../assets/ecommercepage-assets/Icon Badge1.png";
import iconBadge2 from "../../assets/ecommercepage-assets/Icon Badge2.png";
import iconBadge3 from "../../assets/ecommercepage-assets/Icon Badge3.png";
import iconBadge4 from "../../assets/ecommercepage-assets/Icon Badge4.png";

export const AddProductBtn = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/ecommerce/product/add")}
      className="flex items-center gap-2 bg-primary-light text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg"
    >
      <Plus />
      Add Product
    </button>
  );
};

const FilterBtn = ({ title }) => (
  <button className="text-brand-200">{title}</button>
);

export const FilterDropdownBtn = ({ title }) => (
  <button className=" text-sm text-brand-400 p-1.5 border-2 border-[#E0E2E7] flex gap-1 align-center rounded-lg font-[500] bg-white">
    {title}
    <ChevronDown color="#858D9D" size={20} />
  </button>
);

export const SearchBar = () => (
  <div className="flex-1 relative">
    <Search
      size={20}
      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 "
    />
    <input
      placeholder="Search..."
      className=" pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

// Function to get status badge classes
const getStatusClasses = (status) => {
  switch ((status || "").toLowerCase()) {
    case "in draft":
      return "bg-orange-50 text-orange-500";
    case "out of stock":
      return "bg-[#FEF0F0] text-brand-900";
    case "published":
      return "bg-green-50 text-green-500";
    default:
      return "bg-gray-50 text-gray-700";
  }
};

const ProductTable = ({ product, onDelete }) => (
  <tr className="border-b border-dark-30 hover:bg-dark-30 transition-colors">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className=" flex items-center gap-3">
        <img
          src={product.productImage}
          alt=""
          className="w-10 h-10 rounded object-cover"
        />
        <div>
          <h2 className="text-sm font-medium text-gray-900">
            {product.productName}
          </h2>
          <p className="text-xs text-gray-500">{product.SKU}</p>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-500 font-medium">
      <p>{product.category}</p>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-400 font-medium">
      <p>${product.price}</p>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-500 font-medium">
      <p>{product.stock}</p>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-500 font-medium">
      <p>{product.rating}</p>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
      <p
        className={`text-sm rounded-2xl px-3 py-1 w-[fit-content] font-medium text-gray-900 ${getStatusClasses(
          product.status
        )}`}
      >
        {product.status}
      </p>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-500 font-medium">
      <p>{product.dateCreated}</p>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <button className="p-1 bg-[#D5EBFF] rounded">
        <Pencil size={16} color="#2D99FE" />
      </button>
      <button onClick={onDelete} className="p-1 bg-[#FCE0E0] rounded ml-2">
        <Trash2 size={16} color="#F16363" />
      </button>
    </td>
  </tr>
);

const productStatData = [
  {
    title: "Total Products",
    titleIcon: iconBadge1,
    value: "6,650",
    isPositive: true,
    change: "+8%",
  },
  {
    title: "Published",
    titleIcon: iconBadge2,
    value: "1,100",
    isPositive: false,
    change: "+5%",
  },
  {
    title: "In Draft",
    titleIcon: iconBadge4,
    value: "$1,250",
    isPositive: true,
    change: "+8%",
  },
  {
    title: "Out of Stock",
    titleIcon: iconBadge3,
    value: "1,100",
    isPositive: true,
    change: "+5%",
  },
];

const TABLE_HEADERS = [
  "PRODUCT",
  "CATEGORY",
  "PRICE",
  "STOCK",
  "RATING",
  "STATUS",
  "CREATED",
  "ACTIONS",
];

const Product = () => {
  const [products, setProducts] = useState(initialProducts);
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);

  const filtered = products.filter(
    (p) => statusFilter === "All Status" || p.status === statusFilter
  );

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

  const confirmDelete = () => {
    setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <section className="w-full min-w-7xl font-Geist">
      <div className="flex justify-between items-end mb-6">
        <PageTitle title="Product" navigationRoute="Ecommerce / Product" />
        <AddProductBtn />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {productStatData.map((stat, index) => (
          <div key={index}>
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-6 font-semibold text-sm text-brand-500">
        {["All Status", "Published", "Out of Stock", "In Draft"].map((s) => (
          <button
            key={s}
            onClick={() => {
              setStatusFilter(s);
              setCurrentPage(1);
            }}
            className={statusFilter === s ? "text-primary-light" : "text-brand-500"}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6 gap-4">
        <SearchBar />
        <div className="flex gap-2">
          <FilterDropdownBtn title="All Category" />
          <FilterDropdownBtn title="All Prices" />
          <FilterDropdownBtn title="Newest" />
          <DeleteBtn />
        </div>
      </div>

      <div className="mt-6 overflow-x-auto bg-white rounded-lg shadow-sm">
        {/* table section */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="border-b border-dark-40">
              {TABLE_HEADERS.map((header, i) => (
                <th
                  key={i}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((product) => (
              <ProductTable
                key={product.id}
                product={product}
                onDelete={() => setDeleteTarget(product)}
              />
            ))}
            {currentData.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-8 text-brand-100 text-sm">
                  No products found.
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

      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        itemName={deleteTarget ? `"${deleteTarget.productName}"` : "this product"}
        title={deleteTarget ? `Delete Product` : ""}
      />
    </section>
  );
};

export default Product;
