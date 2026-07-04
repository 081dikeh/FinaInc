import { MessageSquare, Paperclip } from "lucide-react";

const priorityStyles = {
  High: "bg-[#FEF0F0] text-brand-900",
  Medium: "bg-orange-50 text-orange-500",
  Low: "bg-green-50 text-green-600",
};

export default function TaskCard({ task, onClick }) {
  const progress = task.subtasks.length
    ? Math.round(
        (task.subtasks.filter((s) => s.done).length / task.subtasks.length) * 100
      )
    : 0;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col gap-3 border border-gray-50"
    >
      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
            priorityStyles[task.priority] || "bg-gray-100 text-gray-600"
          }`}
        >
          {task.priority}
        </span>
        <span className="text-xs text-brand-100 font-medium">{task.dueDate}</span>
      </div>

      <h4 className="font-semibold text-brand-500 text-sm leading-snug">{task.title}</h4>

      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-[11px] text-brand-100 font-medium">Progress</span>
          <span className="text-[11px] text-brand-300 font-semibold">{progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-light rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center -space-x-2">
          {task.contributors.slice(0, 3).map((c) => (
            <img
              key={c.id}
              src={c.avatar}
              alt={c.name}
              className="w-6 h-6 rounded-full border-2 border-white object-cover"
            />
          ))}
        </div>
        <div className="flex items-center gap-3 text-brand-100">
          <span className="flex items-center gap-1 text-xs font-medium">
            <MessageSquare size={14} /> {task.comments}
          </span>
          <span className="flex items-center gap-1 text-xs font-medium">
            <Paperclip size={14} /> {task.attachments}
          </span>
        </div>
      </div>
    </div>
  );
}
