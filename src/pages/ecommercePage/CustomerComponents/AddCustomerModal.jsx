import { useState } from "react";
import { Pencil } from "lucide-react";
import Modal from "../../../components/Modal";
import { customerGroups } from "../../../data/ecomercemockData/customerData";

const inputClass =
  "w-full px-4 py-2.5 border-2 border-[#E0E2E7] rounded-xl text-sm text-brand-500 focus:outline-none focus:ring-2 focus:ring-primary-light";
const labelClass = "text-sm font-semibold text-brand-400 mb-1.5 block";

export default function AddCustomerModal({ isOpen, onClose, onAdd }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    group: customerGroups[0],
  });

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    onAdd({
      id: Date.now(),
      name: form.name,
      email: form.email,
      phone: form.phone,
      location: form.location,
      avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(form.email)}`,
      orders: 0,
      totalSpent: 0,
      status: "Active",
      joinDate: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    });
    setForm({ name: "", email: "", phone: "", location: "", group: customerGroups[0] });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Customer">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-2 mb-2">
          <div className="w-20 h-20 rounded-full bg-brand-800 flex items-center justify-center relative overflow-hidden">
            <img
              src="https://i.pravatar.cc/150?img=33"
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-0 right-0 bg-primary-light p-1.5 rounded-full">
              <Pencil size={12} color="white" />
            </span>
          </div>
        </div>

        <div>
          <label className={labelClass}>Full Name</label>
          <input
            className={inputClass}
            placeholder="e.g. Bryan Adams"
            value={form.name}
            onChange={handleChange("name")}
            required
          />
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            className={inputClass}
            placeholder="e.g. bryanadams@mail.com"
            value={form.email}
            onChange={handleChange("email")}
            required
          />
        </div>
        <div>
          <label className={labelClass}>Phone Number</label>
          <input
            className={inputClass}
            placeholder="+1 469 227 9044"
            value={form.phone}
            onChange={handleChange("phone")}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Location</label>
            <input
              className={inputClass}
              placeholder="City, Country"
              value={form.location}
              onChange={handleChange("location")}
            />
          </div>
          <div>
            <label className={labelClass}>Customer Group</label>
            <select className={inputClass} value={form.group} onChange={handleChange("group")}>
              {customerGroups.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 flex items-center justify-center gap-2 bg-primary-light text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg"
        >
          + Add Customer
        </button>
      </form>
    </Modal>
  );
}
