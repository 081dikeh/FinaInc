import { useState } from "react";
import { Search } from "lucide-react";
import Modal from "../../components/Modal";
import { contributorsPool } from "../../data/projectMockData";

export default function AddContributorsModal({ isOpen, onClose, existingIds = [], onAdd }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);

  const filtered = contributorsPool.filter(
    (c) =>
      !existingIds.includes(c.id) &&
      c.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    const chosen = contributorsPool.filter((c) => selected.includes(c.id));
    onAdd && onAdd(chosen);
    setSelected([]);
    setSearch("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Contributors">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border-2 border-[#E0E2E7] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
        </div>

        <div className="max-h-72 overflow-y-auto flex flex-col gap-1 border-l-2 border-transparent">
          {filtered.map((c) => (
            <label
              key={c.id}
              className="flex items-center justify-between px-2 py-2.5 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold text-brand-500">{c.name}</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={selected.includes(c.id)}
                onChange={() => toggle(c.id)}
                className="w-4 h-4 accent-primary-light"
              />
            </label>
          ))}
          {filtered.length === 0 && (
            <p className="text-sm text-brand-100 text-center py-4">No contributors found.</p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={selected.length === 0}
          className="flex items-center justify-center gap-2 bg-primary-light disabled:opacity-50 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg"
        >
          + Add Contributors
        </button>
      </div>
    </Modal>
  );
}
