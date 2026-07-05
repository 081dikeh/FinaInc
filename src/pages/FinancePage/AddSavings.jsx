import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Image, X } from "lucide-react";
import PageTitle from "../../components/layout/PageTitle";
import { addSavingsGoal } from "../../data/financemockData/savingsData";

const inputClass =
  "w-full px-4 py-2.5 border-2 border-[#E0E2E7] rounded-xl text-sm text-brand-500 focus:outline-none focus:ring-2 focus:ring-primary-light";
const labelClass = "text-sm font-semibold text-brand-400 mb-1.5 block";

export default function AddSavings() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    goal: "",
    dueDate: "",
  });
  const [thumbnail, setThumbnail] = useState(null);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const completion = useMemo(() => {
    let filled = 0;
    const total = 4;
    if (form.title) filled++;
    if (form.description) filled++;
    if (form.goal) filled++;
    if (form.dueDate) filled++;
    return Math.round((filled / total) * 100);
  }, [form]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setThumbnail(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.goal) return;
    addSavingsGoal(form);
    navigate("/finance/savings");
  };

  return (
    <section className="w-full min-w-7xl font-Geist pb-24">
      <div className="flex justify-between items-end mb-6">
        <PageTitle title="Add Savings" navigationRoute="Savings / Add Savings" />
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/finance/savings")}
            className="flex items-center gap-2 border-2 border-[#E0E2E7] text-brand-400 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            <X size={18} />
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-primary-light text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg"
          >
            + Add Savings
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4 h-fit">
          <h3 className="font-semibold text-brand-500 mb-1">General Information</h3>
          <div>
            <label className={labelClass}>Title</label>
            <input
              className={inputClass}
              placeholder="Type title here..."
              value={form.title}
              onChange={handleChange("title")}
            />
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <textarea
              className={inputClass}
              rows={5}
              placeholder="Type description here..."
              value={form.description}
              onChange={handleChange("description")}
            />
          </div>

          <div className="border-t border-gray-100 pt-4 mt-2">
            <h3 className="font-semibold text-brand-500 mb-4">Goal</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Goal ($)</label>
                <input
                  type="number"
                  className={inputClass}
                  placeholder="Type goal here..."
                  value={form.goal}
                  onChange={handleChange("goal")}
                />
              </div>
              <div>
                <label className={labelClass}>Due Date</label>
                <input
                  type="date"
                  className={inputClass}
                  value={form.dueDate}
                  onChange={handleChange("dueDate")}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 h-fit">
          <h3 className="font-semibold text-brand-500 mb-4">Thumbnail</h3>
          <label className={labelClass}>Photo</label>
          <label
            htmlFor="savings-thumbnail"
            className="border-2 border-dashed border-[#E0E2E7] rounded-xl flex flex-col items-center justify-center gap-2 py-8 cursor-pointer hover:border-primary-light transition-colors"
          >
            {thumbnail ? (
              <img src={thumbnail} alt="Thumbnail" className="w-24 h-24 object-cover rounded-lg" />
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-brand-800 flex items-center justify-center text-primary-light">
                  <Image size={18} />
                </div>
                <p className="text-xs text-brand-100 text-center px-4">
                  Drag and drop image here, or click add image
                </p>
              </>
            )}
            <span className="text-xs font-semibold text-primary-light bg-brand-800 px-4 py-2 rounded-lg mt-1">
              + Add Image
            </span>
            <input
              id="savings-thumbnail"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
      </form>

      {/* Bottom completion bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-8 py-4 flex items-center justify-between shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3 w-1/3">
          <span className="text-sm font-semibold text-brand-400 whitespace-nowrap">
            Completion <span className="text-primary-light">{completion}%</span>
          </span>
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-light rounded-full transition-all"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/finance/savings")}
            className="flex items-center gap-2 border-2 border-[#E0E2E7] text-brand-400 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            <X size={18} />
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-primary-light text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg"
          >
            + Add Savings
          </button>
        </div>
      </div>
    </section>
  );
}
