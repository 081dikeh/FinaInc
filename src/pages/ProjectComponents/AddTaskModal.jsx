import { useState } from "react";
import Modal from "../../components/Modal";

const inputClass =
  "w-full px-4 py-2.5 border-2 border-[#E0E2E7] rounded-xl text-sm text-brand-500 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent";
const labelClass = "text-sm font-semibold text-brand-400 mb-1.5 block";

export default function AddTaskModal({ isOpen, onClose, onAdd, status }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
  });

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title) return;
    onAdd({
      id: Date.now(),
      status,
      title: form.title,
      description: form.description,
      priority: form.priority,
      dueDate: form.dueDate || "No due date",
      tags: [],
      contributors: [],
      comments: 0,
      attachments: 0,
      subtasks: [],
    });
    setForm({ title: "", description: "", priority: "Medium", dueDate: "" });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Task">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className={labelClass}>Task Title</label>
          <input
            className={inputClass}
            placeholder="e.g. Design onboarding flow"
            value={form.title}
            onChange={handleChange("title")}
            required
          />
        </div>
        <div>
          <label className={labelClass}>Description</label>
          <textarea
            className={inputClass}
            rows={3}
            placeholder="Add a short description..."
            value={form.description}
            onChange={handleChange("description")}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Priority</label>
            <select
              className={inputClass}
              value={form.priority}
              onChange={handleChange("priority")}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
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
            Add Task
          </button>
        </div>
      </form>
    </Modal>
  );
}
