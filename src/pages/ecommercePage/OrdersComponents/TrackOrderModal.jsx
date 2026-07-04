import { Check, Package, Loader, Truck, Home } from "lucide-react";
import Modal from "../../../components/Modal";
import { trackingSteps } from "../../../data/ecomercemockData/ordersData";

const stepIcons = [Package, Loader, Truck, Truck, Home];
const stepDescriptions = [
  "An order has been placed.",
  "Seller has processed your order.",
  "Your order has been picked up by the courier.",
  "Your order is on the way to your address.",
  "Your order has been delivered. Enjoy!",
];

export default function TrackOrderModal({ isOpen, onClose, order }) {
  if (!order) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Tracking">
      <div className="flex flex-col">
        {trackingSteps.map((step, idx) => {
          const Icon = stepIcons[idx];
          const isDone = idx < order.currentStep;
          const isCurrent = idx === order.currentStep - 1;
          return (
            <div key={step} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isDone || isCurrent
                      ? "bg-green-50 text-green-500"
                      : "bg-gray-100 text-gray-300"
                  }`}
                >
                  {isDone && !isCurrent ? <Check size={18} /> : <Icon size={18} />}
                </div>
                {idx !== trackingSteps.length - 1 && (
                  <div
                    className={`w-0.5 flex-1 min-h-[36px] ${
                      isDone ? "bg-green-300" : "bg-gray-100"
                    }`}
                  />
                )}
              </div>
              <div className="pb-6">
                <p
                  className={`text-sm font-semibold ${
                    isDone || isCurrent ? "text-brand-500" : "text-gray-300"
                  }`}
                >
                  {step}
                </p>
                <p className="text-xs text-brand-100 mt-0.5">{stepDescriptions[idx]}</p>
                {(isDone || isCurrent) && (
                  <p className="text-xs text-brand-100 mt-1">{order.date}, 03:00</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}
