import { useState } from "react";
import { Plus, ChevronDown, Search, Trash2 } from "lucide-react";
import PageTitle from "../components/layout/PageTitle";
import StatCard from "../components/layout/StatCard";
import DeleteBtn from "../components/layout/DeleteBtn";
import Pagination from "../components/Pagination";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import Modal from "../components/Modal";
import { campaigns as initialCampaigns, campaignStats } from "../data/campaignMockData";
import iconBadge1 from "../assets/dashboard-assets/icon-badge1.png";
import iconBadge2 from "../assets/dashboard-assets/icon-badge2.png";
import iconBadge3 from "../assets/dashboard-assets/icon-badge3.png";
import iconBadge4 from "../assets/dashboard-assets/icon-badge4.png";

const badges = [iconBadge1, iconBadge2, iconBadge3, iconBadge4];

const getStatusClasses = (status) => {
  switch ((status || "").toLowerCase()) {
    case "active":
      return "bg-green-50 text-green-600";
    case "scheduled":
      return "bg-[#D5EBFF] text-[#2D99FE]";
    case "paused":
      return "bg-orange-50 text-orange-500";
    case "completed":
      return "bg-brand-800 text-primary-light";
    default:
      return "bg-gray-50 text-gray-700";
  }
};

const inputClass =
  "w-full px-4 py-2.5 border-2 border-[#E0E2E7] rounded-xl text-sm text-brand-500 focus:outline-none focus:ring-2 focus:ring-primary-light";
const labelClass = "text-sm font-semibold text-brand-400 mb-1.5 block";

function AddCampaignModal({ isOpen, onClose, onAdd }) {
  const [form, setForm] = useState({ name: "", channel: "Email", budget: "", startDate: "", endDate: "" });
  const handleChange = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    if (!form.name) return;
    onAdd({
      id: Date.now(),
      name: form.name,
      channel: form.channel,
      status: "Scheduled",
      budget: Number(form.budget) || 0,
      spent: 0,
      reach: 0,
      conversion: 0,
      startDate: form.startDate || "-",
      endDate: form.endDate || "-",
    });
    setForm({ name: "", channel: "Email", budget: "", startDate: "", endDate: "" });
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Campaign">
      <form onSubmit={submit} className="flex flex-col gap-4">
        <div>
          <label className={labelClass}>Campaign Name</label>
          <input className={inputClass} value={form.name} onChange={handleChange("name")} placeholder="e.g. Summer Sale Blast" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Channel</label>
            <select className={inputClass} value={form.channel} onChange={handleChange("channel")}>
              <option>Email</option>
              <option>Social</option>
              <option>Ads</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Budget ($)</label>
            <input type="number" className={inputClass} value={form.budget} onChange={handleChange("budget")} placeholder="0.00" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Start Date</label>
            <input type="date" className={inputClass} value={form.startDate} onChange={handleChange("startDate")} />
          </div>
          <div>
            <label className={labelClass}>End Date</label>
            <input type="date" className={inputClass} value={form.endDate} onChange={handleChange("endDate")} />
          </div>
        </div>
        <div className="flex gap-3 mt-2">
          <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 rounded-xl border-2 border-[#E0E2E7] text-brand-400 font-semibold hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit" className="flex-1 px-4 py-2.5 rounded-xl bg-primary-light text-white font-semibold hover:opacity-90 shadow-lg">
            Add Campaign
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default function Campaign() {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const filtered = campaigns.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
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

  const handleAdd = (c) => setCampaigns((prev) => [c, ...prev]);
  const handleDelete = () => {
    setCampaigns((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <section className="w-full min-w-7xl font-Geist">
      <div className="flex justify-between items-end mb-6">
        <PageTitle title="Campaign" navigationRoute="Campaign" />
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 bg-primary-light text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg"
        >
          <Plus />
          Add Campaign
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {campaignStats.map((stat, i) => (
          <StatCard key={i} {...stat} titleIcon={badges[i % badges.length]} />
        ))}
      </div>

      <div className="flex gap-4 mt-6 font-semibold text-sm text-brand-500">
        {["All Status", "Active", "Scheduled", "Paused", "Completed"].map((s) => (
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
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            placeholder="Search campaigns..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2.5 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <button className="text-sm text-brand-400 p-1.5 border-2 border-[#E0E2E7] flex gap-1 items-center rounded-lg font-[500] bg-white">
            Newest <ChevronDown color="#858D9D" size={20} />
          </button>
          <DeleteBtn />
        </div>
      </div>

      <div className="mt-6 overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="border-b border-dark-40">
              {["CAMPAIGN", "CHANNEL", "BUDGET", "SPENT", "REACH", "CONV.", "STATUS", "ACTION"].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((c) => (
              <tr key={c.id} className="border-b border-dark-30 hover:bg-dark-30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand-500">{c.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-400">{c.channel}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-500">${c.budget.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-500">${c.spent.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-500">{c.reach.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-500">{c.conversion}%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm rounded-2xl px-3 py-1 font-medium ${getStatusClasses(c.status)}`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => setDeleteTarget(c)}
                    className="p-1 bg-[#FCE0E0] rounded"
                  >
                    <Trash2 size={16} color="#F16363" />
                  </button>
                </td>
              </tr>
            ))}
            {currentData.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-8 text-brand-100 text-sm">
                  No campaigns found.
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

      <AddCampaignModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onAdd={handleAdd} />
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        itemName={deleteTarget ? `"${deleteTarget.name}"` : "this campaign"}
      />
    </section>
  );
}

