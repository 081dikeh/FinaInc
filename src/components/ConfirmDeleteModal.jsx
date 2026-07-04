import { AlertTriangle } from "lucide-react";
import Modal from "./Modal";

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  itemName = "this item",
  title,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" maxWidth="max-w-sm">
      <div className="flex flex-col items-center text-center -mt-4">
        <div className="w-14 h-14 rounded-full bg-[#FCE0E0] flex items-center justify-center mb-4">
          <AlertTriangle className="text-brand-900" size={26} />
        </div>
        <h3 className="text-lg font-semibold text-brand-500 mb-2">
          {title || `Delete ${itemName}?`}
        </h3>
        <p className="text-sm text-brand-100 mb-6">
          Are you sure you want to delete {itemName}? This action cannot be undone.
        </p>
        <div className="flex gap-3 w-full">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl border-2 border-[#E0E2E7] text-brand-400 font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm && onConfirm();
              onClose();
            }}
            className="flex-1 px-4 py-2.5 rounded-xl bg-brand-900 text-white font-semibold hover:opacity-90 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
