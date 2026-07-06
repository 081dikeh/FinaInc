import { useState, useMemo } from "react";
import { Plus, Search, PiggyBank, Target, TrendingUp, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/layout/PageTitle";
import StatCard from "../../components/layout/StatCard";
import DeleteBtn from "../../components/layout/DeleteBtn";
import SavedItemsContainer from "./SavingsComponents/SavedItemsContainer";
import Pagination from "../../components/Pagination";
import { savingsGoals } from "../../data/financemockData/savingsData";
import iconBadge1 from "../../assets/dashboard-assets/icon-badge1.png";
import iconBadge2 from "../../assets/dashboard-assets/icon-badge2.png";
import iconBadge3 from "../../assets/dashboard-assets/icon-badge3.png";
import iconBadge4 from "../../assets/dashboard-assets/icon-badge4.png";

export default function Savings() {
    const navigate = useNavigate();
    const [goals, setGoals] = useState(savingsGoals);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [sortBy, setSortBy] = useState("Newest");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);

    const stats = useMemo(() => {
        const totalSaved = goals.reduce((sum, g) => sum + g.currentAmount, 0);
        const totalGoal = goals.reduce((sum, g) => sum + g.goalAmount, 0);
        const completed = goals.filter((g) => g.percentage >= 100).length;
        const avgProgress = goals.length
            ? Math.round(goals.reduce((sum, g) => sum + g.percentage, 0) / goals.length)
            : 0;
        return { totalSaved, totalGoal, completed, avgProgress };
    }, [goals]);

    const statCards = [
        {
            title: "Total Saved",
            value: `$${stats.totalSaved.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
            isPositive: true,
            change: "+8%",
            titleIcon: iconBadge1,
        },
        {
            title: "Total Goal Amount",
            value: `$${stats.totalGoal.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
            isPositive: true,
            change: "+3%",
            titleIcon: iconBadge2,
        },
        {
            title: "Completed Goals",
            value: stats.completed,
            isPositive: true,
            change: "+2",
            titleIcon: iconBadge3,
        },
        {
            title: "Avg. Progress",
            value: `${stats.avgProgress}%`,
            isPositive: stats.avgProgress >= 50,
            change: stats.avgProgress >= 50 ? "+5%" : "-2%",
            titleIcon: iconBadge4,
        },
    ];

    const handleTopUp = (id, amount) => {
        setGoals((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          currentAmount: item.currentAmount + amount,
                          percentage: Math.min(
                              100,
                              Math.round(((item.currentAmount + amount) / item.goalAmount) * 100)
                          ),
                      }
                    : item
            )
        );
    };

    const filtered = useMemo(() => {
        let result = goals.filter((g) => {
            const matchesSearch = g.title.toLowerCase().includes(search.toLowerCase());
            const matchesStatus =
                statusFilter === "All Status" ||
                (statusFilter === "Completed" && g.percentage >= 100) ||
                (statusFilter === "In Progress" && g.percentage < 100);
            return matchesSearch && matchesStatus;
        });

        if (sortBy === "Newest") {
            result = [...result].sort((a, b) => b.id - a.id);
        } else if (sortBy === "Oldest") {
            result = [...result].sort((a, b) => a.id - b.id);
        } else if (sortBy === "Progress") {
            result = [...result].sort((a, b) => b.percentage - a.percentage);
        }
        return result;
    }, [goals, search, statusFilter, sortBy]);

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

    return (
        <section className="w-full min-w-7xl font-Geist">
            <div className="flex justify-between items-end mb-6">
                <PageTitle title="Savings" navigationRoute="Savings" />

                <button
                    onClick={() => navigate("/finance/savings/add")}
                    className="flex items-center gap-2 bg-primary-light text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg"
                >
                    <Plus /> Add new
                </button>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                {statCards.map((stat, i) => (
                    <StatCard key={i} {...stat} />
                ))}
            </div>

            {/* Status filter tabs */}
            <div className="flex gap-4 mb-4 font-semibold text-sm text-brand-500">
                {["All Status", "In Progress", "Completed"].map((s) => (
                    <button
                        key={s}
                        onClick={() => {
                            setStatusFilter(s);
                            setCurrentPage(1);
                        }}
                        className={statusFilter === s ? "text-primary-light" : "text-brand-500"}
                    >
                        {s}
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                    <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 " />
                    <input
                        placeholder="Search savings goal..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        className=" w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex gap-2 text-sm text-brand-400 font-medium">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border rounded-lg p-2"
                    >
                        <option value={"Newest"}>Newest</option>
                        <option value={"Oldest"}>Oldest</option>
                        <option value={"Progress"}>Highest Progress</option>
                    </select>

                    <DeleteBtn />
                </div>
            </div>

            {currentData.length > 0 ? (
                <>
                    <SavedItemsContainer items={currentData} onTopUp={handleTopUp} />
                    <div className="bg-white rounded-lg shadow-sm mt-8">
                        <Pagination
                            itemsPerPage={itemsPerPage}
                            sortedData={filtered}
                            currentPage={currentPage}
                            getPageNumbers={getPageNumbers}
                            totalPages={totalPages}
                            handlePageChange={setCurrentPage}
                        />
                    </div>
                </>
            ) : (
                <p className="text-center text-brand-100 text-sm py-16">
                    No savings goals match your search.
                </p>
            )}
        </section>
    );
}
