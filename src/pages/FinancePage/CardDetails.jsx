import { useState, useMemo } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ArrowUp, ArrowDown, Search, Eye, MoreVertical } from "lucide-react";
import PageTitle from "../../components/layout/PageTitle";
import Pagination from "../../components/Pagination";
import ViewCardDetailsModal from "./MyCardComponents/ViewCardDetailsModal";
import TopUpWithdrawModal from "./MyCardComponents/TopUpWithdrawModal";
import { initialCards } from "../../data/financemockData/cardsData";
import { transactions } from "../../data/financemockData/transactionsMockData";

const getStatusClasses = (status) => {
  switch ((status || "").toLowerCase()) {
    case "pending":
      return "bg-orange-50 text-orange-500";
    case "success":
      return "bg-green-50 text-green-600";
    default:
      return "bg-gray-50 text-gray-700";
  }
};

export default function CardDetails() {
  const { cardId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const card =
    location.state?.card ||
    initialCards.find((c) => String(c.id) === String(cardId));

  const [balance, setBalance] = useState(() =>
    card ? parseFloat(card.balance.replace(/,/g, "")) : 0
  );
  const [search, setSearch] = useState("");
  const [typeTab, setTypeTab] = useState("All Type");
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [topUpMode, setTopUpMode] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const cardTransactions = useMemo(
    () => transactions.filter((t) => t.cardType === card?.colorKey),
    [card]
  );

  const filtered = cardTransactions.filter((t) => {
    const matchesSearch = t.detail.toLowerCase().includes(search.toLowerCase());
    const matchesType =
      typeTab === "All Type" ||
      (typeTab === "Expense" && t.type === "Expense") ||
      (typeTab === "Income" && t.type === "Income");
    return matchesSearch && matchesType;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filtered.slice(startIndex, startIndex + itemsPerPage);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", currentPage, "...", totalPages);
    }
    return pages;
  };

  if (!card) {
    return (
      <section className="w-full min-w-7xl font-Geist">
        <PageTitle title="Card Details" navigationRoute="My Card / Card Details" />
        <p className="mt-6 text-brand-100">
          Card not found.{" "}
          <button
            onClick={() => navigate("/finance/my-card")}
            className="text-primary-light font-semibold underline"
          >
            Go back to My Card
          </button>
        </p>
      </section>
    );
  }

  const handleAdjustBalance = (delta) => {
    setBalance((prev) => Math.max(0, prev + delta));
  };

  return (
    <section className="w-full min-w-7xl font-Geist">
      <div className="mb-6">
        <PageTitle title="Card Details" navigationRoute="My Card / Card Details" />
      </div>

      <div className="flex gap-6 items-start">
        {/* Left column: Card visual + details */}
        <div className="w-96 flex-shrink-0 flex flex-col gap-4">
          <div className={`rounded-2xl p-5 text-white shadow-xl ${card.bgColor}`}>
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-xs opacity-80 mb-1">Total Balance</p>
                <h2 className="text-2xl font-semibold">
                  ${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </h2>
              </div>
              <div className="flex">
                <div className="w-7 h-7 rounded-full bg-red-500 opacity-90"></div>
                <div className="w-7 h-7 rounded-full bg-orange-400 opacity-90 -ml-3"></div>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs opacity-80 mb-1">Card Number</p>
                <p className="font-semibold tracking-wide">**** **** **** {card.cardNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-xs opacity-80 mb-1">Exp</p>
                <p className="font-semibold">{card.expDate}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setTopUpMode("topup")}
              className="flex-1 bg-primary-light text-white font-semibold py-3 rounded-xl shadow-lg hover:opacity-90 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowUp size={18} /> Top Up
            </button>
            <button
              onClick={() => setTopUpMode("withdraw")}
              className="flex-1 bg-brand-800 text-primary-light font-semibold py-3 rounded-xl hover:opacity-90 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowDown size={18} /> Withdraw
            </button>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-brand-500">Card Details</h3>
              <button
                onClick={() => setIsViewOpen(true)}
                className="text-xs font-semibold text-primary-light flex items-center gap-1 hover:underline"
              >
                <Eye size={14} /> View Details
              </button>
            </div>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-brand-100">Currency</span>
                <span className="text-brand-500 font-medium">{card.currencyCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-100">Card Holder</span>
                <span className="text-brand-500 font-medium">{card.holder}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-100">Total Transactions</span>
                <span className="text-brand-500 font-medium">{cardTransactions.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-100">Created</span>
                <span className="text-brand-500 font-medium">{card.created}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-100">Last Transaction</span>
                <span className="text-brand-500 font-medium">
                  {cardTransactions[0]?.date || "-"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: transactions */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                placeholder="Search transaction..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2.5 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-4 border-b border-gray-100 mb-2 text-sm font-semibold text-brand-300">
            {["All Type", "Expense", "Income"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setTypeTab(tab);
                  setCurrentPage(1);
                }}
                className={`pb-3 border-b-2 transition-colors ${
                  typeTab === tab
                    ? "text-primary-light border-primary-light"
                    : "border-transparent hover:text-brand-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex flex-col divide-y divide-gray-50">
            {currentData.map((t) => (
              <div key={t.id} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-800 flex items-center justify-center text-primary-light font-semibold text-sm">
                    {t.company?.[0] || "?"}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-brand-500">{t.detail}</p>
                    <p className="text-xs text-brand-100">{t.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <span className="text-xs text-brand-100 w-20">{t.date}</span>
                  <span className={`text-sm rounded-2xl px-3 py-1 font-medium ${getStatusClasses(t.status)}`}>
                    {t.status}
                  </span>
                  <span
                    className={`text-sm font-semibold w-20 text-right ${
                      t.type === "Expense" ? "text-brand-900" : "text-green-600"
                    }`}
                  >
                    {t.type === "Expense" ? "-" : "+"}${Number(t.amount).toFixed(2)}
                  </span>
                  <button className="text-brand-100 hover:text-brand-400">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            ))}
            {currentData.length === 0 && (
              <p className="text-center text-sm text-brand-100 py-8">
                No transactions found for this card.
              </p>
            )}
          </div>

          <Pagination
            itemsPerPage={itemsPerPage}
            sortedData={filtered}
            currentPage={currentPage}
            getPageNumbers={getPageNumbers}
            totalPages={totalPages}
            handlePageChange={setCurrentPage}
          />
        </div>
      </div>

      <ViewCardDetailsModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        card={card}
      />
      <TopUpWithdrawModal
        isOpen={!!topUpMode}
        onClose={() => setTopUpMode(null)}
        mode={topUpMode || "topup"}
        onConfirm={handleAdjustBalance}
      />
    </section>
  );
}
