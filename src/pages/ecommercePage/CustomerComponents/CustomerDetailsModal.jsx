import Modal from "../../../components/Modal";

const statusClasses = (status) => {
  switch ((status || "").toLowerCase()) {
    case "active":
      return "bg-green-50 text-green-600";
    case "blocked":
      return "bg-[#FEF0F0] text-brand-900";
    case "inactive":
      return "bg-gray-100 text-gray-600";
    default:
      return "bg-gray-50 text-gray-700";
  }
};

export default function CustomerDetailsModal({ isOpen, onClose, customer }) {
  if (!customer) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Customer Details" maxWidth="max-w-md">
      <div className="flex flex-col items-center text-center -mt-2 mb-6">
        <img
          src={customer.avatar}
          alt={customer.name}
          className="w-20 h-20 rounded-full object-cover mb-3"
        />
        <h3 className="text-lg font-semibold text-brand-500">{customer.name}</h3>
        <p className="text-sm text-brand-100">{customer.email}</p>
        <span className={`mt-2 text-sm rounded-2xl px-3 py-1 font-medium ${statusClasses(customer.status)}`}>
          {customer.status}
        </span>
      </div>

      <div className="flex flex-col gap-3 text-sm border-t border-gray-100 pt-4">
        <div className="flex justify-between">
          <span className="text-brand-100">Phone Number</span>
          <span className="text-brand-500 font-medium">{customer.phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-brand-100">Location</span>
          <span className="text-brand-500 font-medium">{customer.location}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-brand-100">Total Orders</span>
          <span className="text-brand-500 font-medium">{customer.orders}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-brand-100">Total Spent</span>
          <span className="text-brand-500 font-medium">${customer.totalSpent.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-brand-100">Joined</span>
          <span className="text-brand-500 font-medium">{customer.joinDate}</span>
        </div>
      </div>
    </Modal>
  );
}
