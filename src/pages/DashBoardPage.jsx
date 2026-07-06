import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Plus, Calendar } from "lucide-react";
import CustomerList from "../components/CustomerList";
import CustGrowth from "../components/CustGrowth";
import RevenueChart from "../components/layout/RevenueChart";
import StatCard from "../components/layout/StatCard";
import Orders from "../components/Orders";
import TopProducts from "../components/TopProducts";
import UserActivity from "../components/UserActivity";
import { revenueData, ordersData, topProductsData } from "../data/mockData";
import { useProfile } from "../context/ProfileContext";
import iconBadge1 from "../assets/dashboard-assets/icon-badge1.png";
import iconBadge2 from "../assets/dashboard-assets/icon-badge2.png";
import iconBadge3 from "../assets/dashboard-assets/icon-badge3.png";
import iconBadge4 from "../assets/dashboard-assets/icon-badge4.png";

const RANGE_OPTIONS = ["Today", "This Week", "This Month", "Yearly"];

function RangeDropdown({ range, setRange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 text-sm font-semibold text-brand-400 border-2 border-[#E0E2E7] px-4 py-2.5 rounded-xl bg-white hover:bg-gray-50 transition-colors"
      >
        <Calendar size={16} />
        Show {range}
        <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-30">
          {RANGE_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                setRange(opt);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                range === opt ? "text-primary-light font-semibold" : "text-brand-400"
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

export default function DashBoardPage() {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const [range, setRange] = useState("Yearly");
  const firstName = profile.name?.split(" ")[0] || "there";

  return (
    <div>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-3xl text-brand-500 font-semibold">
            Welcome Back {firstName}
          </h1>
          <p className="text-base text-brand-200">
            Here’s what happening with your store today
          </p>
        </div>
        <div className="flex items-center gap-3">
          <RangeDropdown range={range} setRange={setRange} />
          <button
            onClick={() => navigate("/ecommerce/product/add")}
            className="flex items-center gap-2 bg-primary-light text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          titleIcon={iconBadge1}
          value="$86,120"
          change="+10%"
          isPositive={true}
        />
        <StatCard
          title="Total Customers"
          titleIcon={iconBadge2}
          value="21,400"
          change="+5%"
          isPositive={true}
        />
        <StatCard
          title="Total Orders"
          titleIcon={iconBadge3}
          value="3,472"
          change="-2%"
          isPositive={false}
        />
        <StatCard
          title="Total Products"
          titleIcon={iconBadge4}
          value="143"
          change="+8%"
          isPositive={true}
        />
      </div>

      <div className="flex flex-col gap-6 mt-6">
        <div className="grid grid-cols-7 gap-4">
          <RevenueChart data={revenueData} />
          <CustGrowth />
        </div>

        <div className="grid grid-cols-7 gap-4">
          <Orders data={ordersData} />
          <UserActivity />
        </div>

        <div className="grid grid-cols-7 gap-4">
          <TopProducts data={topProductsData} />
          <CustomerList />
        </div>
      </div>
    </div>
  );
}
