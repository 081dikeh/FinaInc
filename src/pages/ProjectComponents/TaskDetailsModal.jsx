import { useState } from "react";
import { Paperclip, Send, Trash2, Plus, UserPlus } from "lucide-react";
import Modal from "../../components/Modal";
import AddContributorsModal from "./AddContributorsModal";

const priorityStyles = {
  High: "bg-[#FEF0F0] text-brand-900",
  Medium: "bg-orange-50 text-orange-500",
  Low: "bg-green-50 text-green-600",
};

export default function TaskDetailsModal({ isOpen, onClose, task, onUpdate }) {
  const [comment, setComment] = useState("");
  const [isAddContribOpen, setIsAddContribOpen] = useState(false);

  if (!task) return null;

  const toggleSubtask = (id) => {
    const updatedSubtasks = task.subtasks.map((s) =>
      s.id === id ? { ...s, done: !s.done } : s
    );
    onUpdate({ ...task, subtasks: updatedSubtasks });
  };

  const progress = task.subtasks.length
    ? Math.round(
        (task.subtasks.filter((s) => s.done).length / task.subtasks.length) * 100
      )
    : 0;

  const handleAddContributors = (newContribs) => {
    onUpdate({ ...task, contributors: [...task.contributors, ...newContribs] });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Task Details" maxWidth="max-w-xl">
        <div className="flex flex-col gap-5 -mt-2">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                priorityStyles[task.priority] || "bg-gray-100 text-gray-600"
              }`}
            >
              {task.priority}
            </span>
            {task.tags?.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-800 text-primary-light"
              >
                {tag}
              </span>
            ))}
          </div>

          <h2 className="text-xl font-semibold text-brand-500">{task.title}</h2>
          <p className="text-sm text-brand-300">{task.description}</p>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-brand-100 uppercase mb-2">
                Contributors
              </p>
              <div className="flex items-center -space-x-2">
                {task.contributors.map((c) => (
                  <img
                    key={c.id}
                    src={c.avatar}
                    alt={c.name}
                    title={c.name}
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                ))}
                <button
                  onClick={() => setIsAddContribOpen(true)}
                  className="w-8 h-8 rounded-full border-2 border-dashed border-primary-light text-primary-light flex items-center justify-center bg-brand-800 hover:bg-primary-light hover:text-white transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-brand-100 uppercase mb-1">Due Date</p>
              <p className="text-sm font-medium text-brand-500">{task.dueDate}</p>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-semibold text-brand-400">Progress</p>
              <p className="text-sm font-semibold text-primary-light">{progress}%</p>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-primary-light rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex flex-col gap-2">
              {task.subtasks.map((s) => (
                <label key={s.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={s.done}
                    onChange={() => toggleSubtask(s.id)}
                    className="w-4 h-4 accent-primary-light"
                  />
                  <span
                    className={`text-sm ${
                      s.done ? "line-through text-brand-100" : "text-brand-400"
                    }`}
                  >
                    {s.title}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-brand-400 mb-2">
              Comments ({task.comments})
            </p>
            <div className="flex items-center gap-2">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Type your comment here..."
                className="flex-1 px-4 py-2.5 border-2 border-[#E0E2E7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
              />
              <button className="p-2.5 rounded-xl bg-gray-100 text-brand-300 hover:bg-gray-200">
                <Paperclip size={18} />
              </button>
              <button
                onClick={() => setComment("")}
                className="p-2.5 rounded-xl bg-primary-light text-white hover:opacity-90"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <AddContributorsModal
        isOpen={isAddContribOpen}
        onClose={() => setIsAddContribOpen(false)}
        existingIds={task.contributors.map((c) => c.id)}
        onAdd={handleAddContributors}
      />
    </>
  );
}
