import { Trash2, Pencil } from "lucide-react";
import Modal from "../../../components/Modal";

export default function CategoryDetailsModal({ isOpen, onClose, category, onDelete }) {
  if (!category) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Details" maxWidth="max-w-sm">
      <div className="flex flex-col items-center text-center -mt-2">
        <img
          src={category.productImage}
          alt={category.productName}
          className="w-32 h-32 object-contain mb-4"
        />
        <h3 className="text-lg font-semibold text-brand-500 mb-2">{category.productName}</h3>
        <p className="text-sm text-brand-100 mb-6">{category.productDescription}</p>

        <div className="w-full flex flex-col gap-3 text-sm border-t border-gray-100 pt-4 mb-6">
          <div className="flex justify-between">
            <span className="text-brand-100">Added</span>
            <span className="text-brand-500 font-medium">12 January 2023</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-100">Stock</span>
            <span className="text-brand-500 font-medium">{category.stockAmount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-100">Product</span>
            <span className="text-brand-500 font-medium">{category.productAmount}</span>
          </div>
        </div>

        <div className="w-full flex gap-3">
          <button
            onClick={() => {
              onDelete && onDelete(category);
              onClose();
            }}
            className="p-3 rounded-xl bg-[#FCE0E0] text-brand-900 hover:opacity-90 transition-colors"
          >
            <Trash2 size={18} />
          </button>
          <button className="p-3 rounded-xl bg-brand-800 text-primary-light hover:opacity-90 transition-colors">
            <Pencil size={18} />
          </button>
          <button className="flex-1 rounded-xl bg-primary-light text-white font-semibold hover:opacity-90 transition-colors shadow-lg">
            See All Product
          </button>
        </div>
      </div>
    </Modal>
  );
}
