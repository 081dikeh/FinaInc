import { useState } from "react";
import Modal from "../../../components/Modal";

const inputClass =
  "w-full px-4 py-2.5 border-2 border-[#E0E2E7] rounded-xl text-sm text-brand-500 focus:outline-none focus:ring-2 focus:ring-primary-light";
const labelClass = "text-sm font-semibold text-brand-400 mb-1.5 block";

const colorOptions = [
  { key: "purple", label: "Purple", bgColor: "bg-[#7F63F1]" },
  { key: "black", label: "Black", bgColor: "bg-[#333843]" },
  { key: "blue", label: "Blue", bgColor: "bg-[#2D99FE]" },
  { key: "green", label: "Green", bgColor: "bg-[#14CB74]" },
];

export default function AddCardModal({ isOpen, onClose, onAdd }) {
  const [form, setForm] = useState({
    holder: "",
    balance: "",
    cardNumber: "",
    expDate: "",
    colorKey: "purple",
  });

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.holder || !form.cardNumber) return;
    const color = colorOptions.find((c) => c.key === form.colorKey);
    onAdd({
      id: Date.now(),
      bgColor: color.bgColor,
      colorKey: color.key,
      holder: form.holder,
      balance: Number(form.balance || 0).toFixed(2),
      cardNumber: form.cardNumber.slice(-4).padStart(4, "0"),
      expDate: form.expDate,
    });
    setForm({ holder: "", balance: "", cardNumber: "", expDate: "", colorKey: "purple" });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Card">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className={labelClass}>Card Holder Name</label>
          <input
            className={inputClass}
            placeholder="e.g. Bryan Adams"
            value={form.holder}
            onChange={handleChange("holder")}
            required
          />
        </div>
        <div>
          <label className={labelClass}>Card Number</label>
          <input
            className={inputClass}
            placeholder="e.g. 4532 1122 4587 9090"
            value={form.cardNumber}
            onChange={handleChange("cardNumber")}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Initial Balance ($)</label>
            <input
              type="number"
              className={inputClass}
              placeholder="0.00"
              value={form.balance}
              onChange={handleChange("balance")}
            />
          </div>
          <div>
            <label className={labelClass}>Expiry (MM/YY)</label>
            <input
              className={inputClass}
              placeholder="07/25"
              value={form.expDate}
              onChange={handleChange("expDate")}
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>Card Color</label>
          <div className="flex gap-3">
            {colorOptions.map((c) => (
              <button
                type="button"
                key={c.key}
                onClick={() => setForm((p) => ({ ...p, colorKey: c.key }))}
                className={`w-10 h-10 rounded-full ${c.bgColor} ${
                  form.colorKey === c.key ? "ring-2 ring-offset-2 ring-primary-light" : ""
                }`}
                title={c.label}
              />
            ))}
          </div>
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
            Add Card
          </button>
        </div>
      </form>
    </Modal>
  );
}

export { colorOptions };
