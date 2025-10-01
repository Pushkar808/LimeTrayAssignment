import React, { useState } from "react";
import Task from "./components/Task";
import TaskForm from "./components/TaskForm";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", []); // default empty array
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("created");
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
              className={`px-3 py-1 rounded ${
                filter === "all" ? "bg-indigo-600 text-white" : "text-slate-700"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-3 py-1 rounded ${
                filter === "active" ? "bg-indigo-600 text-white" : "text-slate-700"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-3 py-1 rounded ${
                filter === "completed" ? "bg-indigo-600 text-white" : "text-slate-700"
              }`}
            >
              Completed
            </button>
          </div>
        </section>

        <main>
          <ul className="space-y-3">
            {tasks?.map((task) => (
              <Task
                key={task.id}
                task={task}
                tasks={tasks}
                setTasks={setTasks}
              />
            ))}
          </ul>
        </main>

        <footer className="mt-8 text-center text-slate-500 text-sm">
          Built with React + Tailwind • Local-only demo
        </footer>
      </div>
    </div>
  );
}