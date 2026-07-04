import { useState } from "react";
import { Plus } from "lucide-react";
import PageTitle from "../components/layout/PageTitle";
import TaskCard from "./ProjectComponents/TaskCard";
import TaskDetailsModal from "./ProjectComponents/TaskDetailsModal";
import AddTaskModal from "./ProjectComponents/AddTaskModal";
import { columns, tasks as initialTasks } from "../data/projectMockData";

export default function Project() {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [addStatus, setAddStatus] = useState("todo");
  const [draggedId, setDraggedId] = useState(null);

  const openTask = (task) => {
    setSelectedTask(task);
    setIsDetailsOpen(true);
  };

  const handleUpdateTask = (updated) => {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    setSelectedTask(updated);
  };

  const handleAddTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const handleDrop = (status) => {
    if (draggedId == null) return;
    setTasks((prev) =>
      prev.map((t) => (t.id === draggedId ? { ...t, status } : t))
    );
    setDraggedId(null);
  };

  return (
    <section className="w-full min-w-7xl font-Geist">
      <div className="flex justify-between items-end mb-6">
        <PageTitle title="Project" navigationRoute="Project" />
        <button
          onClick={() => {
            setAddStatus("todo");
            setIsAddOpen(true);
          }}
          className="flex items-center gap-2 bg-primary-light text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg"
        >
          <Plus />
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.id);
          return (
            <div
              key={col.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(col.id)}
              className="bg-gray-50/60 rounded-2xl p-4 flex flex-col gap-4 min-h-[400px]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${col.color}`} />
                  <h3 className="font-semibold text-brand-500 text-sm">{col.title}</h3>
                  <span className="text-xs font-semibold text-brand-100 bg-white px-2 py-0.5 rounded-full">
                    {colTasks.length}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setAddStatus(col.id);
                    setIsAddOpen(true);
                  }}
                  className="p-1 rounded-md hover:bg-white text-brand-200 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {colTasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => setDraggedId(task.id)}
                  >
                    <TaskCard task={task} onClick={() => openTask(task)} />
                  </div>
                ))}
                {colTasks.length === 0 && (
                  <p className="text-xs text-brand-100 text-center py-6">
                    No tasks yet
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <TaskDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        task={selectedTask}
        onUpdate={handleUpdateTask}
      />

      <AddTaskModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAddTask}
        status={addStatus}
      />
    </section>
  );
}
