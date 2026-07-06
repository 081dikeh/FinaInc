import { Calendar, Radio, Wallet, TrendingUp } from "lucide-react";
import Modal from "../../components/Modal";

const getStatusClasses = (status) => {
  switch ((status || "").toLowerCase()) {
    case "active":
      return "bg-green-50 text-green-600";
    case "scheduled":
      return "bg-[#D5EBFF] text-[#2D99FE]";
    case "paused":
      return "bg-orange-50 text-orange-500";
    case "completed":
      return "bg-brand-800 text-primary-light";
    default:
      return "bg-gray-50 text-gray-700";
  }
};

export default function CampaignDetailsModal({ isOpen, onClose, campaign }) {
  if (!campaign) return null;

  const spentPercent = campaign.budget
    ? Math.min(100, Math.round((campaign.spent / campaign.budget) * 100))
    : 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Campaign Details" maxWidth="max-w-lg">
      <div className="flex flex-col gap-6 -mt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-brand-500">{campaign.name}</h3>
          <span className={`text-sm rounded-2xl px-3 py-1 font-medium ${getStatusClasses(campaign.status)}`}>
            {campaign.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Radio size={16} className="text-primary-light" />
            <div>
              <p className="text-xs text-brand-100">Channel</p>
              <p className="font-medium text-brand-500">{campaign.channel}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-primary-light" />
            <div>
              <p className="text-xs text-brand-100">Duration</p>
              <p className="font-medium text-brand-500">
                {campaign.startDate} &rarr; {campaign.endDate}
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-semibold text-brand-400 flex items-center gap-1.5">
              <Wallet size={16} /> Budget Spent
            </p>
            <p className="text-sm font-semibold text-brand-500">
              ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
            </p>
          </div>
          <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-light rounded-full transition-all"
              style={{ width: `${spentPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-brand-800/40 rounded-xl p-4">
            <p className="text-xs text-brand-100 mb-1">Total Reach</p>
            <p className="text-lg font-semibold text-brand-500">
              {campaign.reach.toLocaleString()}
            </p>
          </div>
          <div className="bg-brand-800/40 rounded-xl p-4">
            <p className="text-xs text-brand-100 mb-1 flex items-center gap-1">
              <TrendingUp size={14} /> Conversion Rate
            </p>
            <p className="text-lg font-semibold text-brand-500">{campaign.conversion}%</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
