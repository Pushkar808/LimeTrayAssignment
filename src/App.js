import { useMemo, useState } from "react";
import TaskForm from "./components/TaskForm";
import useLocalStorage from "./hooks/useLocalStorage";
import { arrayMove, SortableItem } from '@dnd-kit/sortable';
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import SortableTask from "./components/SortableTask";
export default function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", []); // default empty array
  const [filter, setFilter] = useState("all");
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const filteredTasks = useMemo(() => {
    let filterTasks = tasks;
    if (filter === "active") {
      filterTasks = tasks.filter((task) => !task.completed);
    }
    if (filter === "completed") {
      filterTasks = tasks.filter((task) => task.completed);
    }
    filterTasks = filterTasks.sort((a, b) => a.order - b.order);
    return filterTasks;
  }, [tasks, filter]);
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex((t) => t.id === active.id);
    const newIndex = tasks.findIndex((t) => t.id === over.id);

    setTasks(arrayMove(tasks, oldIndex, newIndex));
  };
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold text-slate-800">Task Manager</h1>
          <p className="text-slate-500 mt-1">
            Add, edit, search, and filter tasks. Saves in your browser.
          </p>
        </header>

        <TaskForm tasks={tasks} setTasks={setTasks} />

        <section className="mb-4 flex flex-col md:flex-row gap-3 items-center">
          <div className="flex items-center gap-2 bg-white w-full p-2 rounded shadow">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded ${filter === "all" ? "bg-indigo-600 text-white" : "text-slate-700"
                }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-3 py-1 rounded ${filter === "active" ? "bg-indigo-600 text-white" : "text-slate-700"
                }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-3 py-1 rounded ${filter === "completed" ? "bg-indigo-600 text-white" : "text-slate-700"
                }`}
            >
              Completed
            </button>
          </div>
        </section>

        <main>
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <SortableContext items={tasks.map((t) => t.id)} >

              <ul className="space-y-3">
                {filteredTasks?.map((task) => (
                  <SortableTask key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
                ))}
              </ul>

            </SortableContext>
          </DndContext>
        </main>

        <footer className="mt-8 text-center text-slate-500 text-sm">
          Built with React + Tailwind • Local-only demo
        </footer>
      </div>
    </div>
  );
}