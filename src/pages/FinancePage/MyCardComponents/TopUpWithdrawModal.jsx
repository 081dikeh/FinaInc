import { useState } from "react";
import Modal from "../../../components/Modal";

const inputClass =
  "w-full px-4 py-2.5 border-2 border-[#E0E2E7] rounded-xl text-sm text-brand-500 focus:outline-none focus:ring-2 focus:ring-primary-light";
const labelClass = "text-sm font-semibold text-brand-400 mb-1.5 block";

export default function TopUpWithdrawModal({ isOpen, onClose, mode = "topup", onConfirm }) {
  const [amount, setAmount] = useState("");
  const isTopUp = mode === "topup";

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = Number(amount);
    if (!value) return;
    onConfirm && onConfirm(isTopUp ? value : -value);
    setAmount("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isTopUp ? "Top Up Balance" : "Withdraw Balance"}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className={labelClass}>Amount ($)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            className={inputClass}
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            autoFocus
            required
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
            {isTopUp ? "Top Up" : "Withdraw"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
