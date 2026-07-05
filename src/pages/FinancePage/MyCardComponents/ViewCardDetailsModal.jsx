import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Modal from "../../../components/Modal";

export default function ViewCardDetailsModal({ isOpen, onClose, card }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [revealed, setRevealed] = useState(false);

  if (!card) return null;

  const handleClose = () => {
    setPassword("");
    setRevealed(false);
    setShowPassword(false);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password) return;
    setRevealed(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="View Card Details" maxWidth="max-w-md">
      <div className="flex flex-col gap-5 -mt-2">
        <div className={`rounded-2xl p-5 text-white ${card.bgColor}`}>
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-xs opacity-80 mb-1">Card Holder</p>
              <p className="font-semibold">{card.holder || "Bryan Adams"}</p>
            </div>
            <div className="flex">
              <div className="w-7 h-7 rounded-full bg-red-500 opacity-90"></div>
              <div className="w-7 h-7 rounded-full bg-orange-400 opacity-90 -ml-3"></div>
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs opacity-80 mb-1">Card Number</p>
              <p className="font-semibold tracking-wide">
                {revealed ? `4532 1122 4587 ${card.cardNumber}` : `**** **** **** ${card.cardNumber}`}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs opacity-80 mb-1">Exp</p>
              <p className="font-semibold">{card.expDate}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <span className="px-4 py-1.5 rounded-lg bg-gray-100 text-sm font-medium text-brand-500">
            CVV: {revealed ? "482" : "***"}
          </span>
        </div>

        {!revealed ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label className="text-sm font-semibold text-brand-400">
              Type password to see your card details
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2.5 border-2 border-[#E0E2E7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-light pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <button
              type="submit"
              className="mt-1 bg-primary-light text-white font-semibold py-3 rounded-xl shadow-lg hover:opacity-90 transition-colors"
            >
              Submit
            </button>
          </form>
        ) : (
          <p className="text-center text-sm text-green-600 font-medium">
            Card details revealed successfully.
          </p>
        )}
      </div>
    </Modal>
  );
}
