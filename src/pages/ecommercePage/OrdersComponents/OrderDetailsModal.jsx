import { useState } from "react";
import Modal from "../../../components/Modal";
import TrackOrderModal from "./TrackOrderModal";

const statusClasses = (status) => {
  switch ((status || "").toLowerCase()) {
    case "delivered":
      return "bg-green-50 text-green-600";
    case "shipped":
      return "bg-[#D5EBFF] text-[#2D99FE]";
    case "processing":
      return "bg-orange-50 text-orange-500";
    case "cancelled":
      return "bg-[#FEF0F0] text-brand-900";
    default:
      return "bg-gray-50 text-gray-700";
  }
};

export default function OrderDetailsModal({ isOpen, onClose, order }) {
  const [isTrackOpen, setIsTrackOpen] = useState(false);
  if (!order) return null;

  const subtotal = order.items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title={`Order ${order.id}`} maxWidth="max-w-2xl">
        <div className="flex flex-col gap-6 -mt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={order.customer.avatar}
                alt={order.customer.name}
                className="w-11 h-11 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-brand-500">{order.customer.name}</p>
                <p className="text-xs text-brand-100">{order.customer.email}</p>
              </div>
            </div>
            <span className={`text-sm rounded-2xl px-3 py-1 font-medium ${statusClasses(order.status)}`}>
              {order.status}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-xs text-brand-100 uppercase font-semibold mb-1">Date</p>
              <p className="text-brand-500 font-medium">{order.date}</p>
            </div>
            <div>
              <p className="text-xs text-brand-100 uppercase font-semibold mb-1">Payment</p>
              <p className="text-brand-500 font-medium">{order.payment}</p>
            </div>
            <div>
              <p className="text-xs text-brand-100 uppercase font-semibold mb-1">Address</p>
              <p className="text-brand-500 font-medium">{order.address}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-brand-400 mb-3">Items</p>
            <div className="flex flex-col gap-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover" />
                    <div>
                      <p className="text-sm font-medium text-brand-500">{item.name}</p>
                      <p className="text-xs text-brand-100">Qty {item.qty}</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-brand-500">
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4 flex flex-col gap-2 text-sm">
            <div className="flex justify-between text-brand-300">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-brand-300">
              <span>Shipping</span>
              <span>$10.00</span>
            </div>
            <div className="flex justify-between font-semibold text-brand-500 text-base">
              <span>Total</span>
              <span>${(subtotal + 10).toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => setIsTrackOpen(true)}
            className="flex items-center justify-center gap-2 bg-primary-light text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg"
          >
            Track Order
          </button>
        </div>
      </Modal>

      <TrackOrderModal
        isOpen={isTrackOpen}
        onClose={() => setIsTrackOpen(false)}
        order={order}
      />
    </>
  );
}
