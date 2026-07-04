import { useState } from "react";
import Modal from "../../components/Modal";

const typeOptions = [
  { value: "meeting", label: "Meeting" },
  { value: "design", label: "Design" },
  { value: "personal", label: "Personal" },
  { value: "deadline", label: "Deadline" },
];

const inputClass =
  "w-full px-4 py-2.5 border-2 border-[#E0E2E7] rounded-xl text-sm text-brand-500 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent";
const labelClass = "text-sm font-semibold text-brand-400 mb-1.5 block";

export default function AddEventModal({ isOpen, onClose, onAdd, defaultDate }) {
  const [form, setForm] = useState({
    title: "",
    date: defaultDate || "",
    startTime: "09:00",
    endTime: "10:00",
    type: "meeting",
    location: "",
    description: "",
  });

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.date) return;
    onAdd &&
      onAdd({
        ...form,
        id: Date.now(),
        guests: [],
      });
    setForm({
      title: "",
      date: "",
      startTime: "09:00",
      endTime: "10:00",
      type: "meeting",
      location: "",
      description: "",
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Event">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className={labelClass}>Event Title</label>
          <input
            className={inputClass}
            placeholder="e.g. Product design review"
            value={form.title}
            onChange={handleChange("title")}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Date</label>
            <input
              type="date"
              className={inputClass}
              value={form.date}
              onChange={handleChange("date")}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Event Type</label>
            <select
              className={inputClass}
              value={form.type}
              onChange={handleChange("type")}
            >
              {typeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Start Time</label>
            <input
              type="time"
              className={inputClass}
              value={form.startTime}
              onChange={handleChange("startTime")}
            />
          </div>
          <div>
            <label className={labelClass}>End Time</label>
            <input
              type="time"
              className={inputClass}
              value={form.endTime}
              onChange={handleChange("endTime")}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Location</label>
          <input
            className={inputClass}
            placeholder="e.g. Zoom, Meeting Room 2"
            value={form.location}
            onChange={handleChange("location")}
          />
        </div>

        <div>
          <label className={labelClass}>Description</label>
          <textarea
            className={inputClass}
            rows={3}
            placeholder="Add a short note about this event..."
            value={form.description}
            onChange={handleChange("description")}
          />
        </div>

        <div className="flex gap-3 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl border-2 border-[#E0E2E7] text-brand-400 font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2.5 rounded-xl bg-primary-light text-white font-semibold hover:opacity-90 transition-colors shadow-lg"
          >
            Save Event
          </button>
        </div>
      </form>
    </Modal>
  );
}
