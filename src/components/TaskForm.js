import React, { useState } from "react";

const TaskForm = ({ tasks, setTasks }) => {
  const [task, setTask] = useState({
    id: "task_" + Date.now().toString(),
    title: "",
    description: "",
    priority: "low",
    completed: false,
    createdAt: Date.now(),
    date: "",
  });

  const addTask = (e) => {
    e.preventDefault();
    setTasks([...tasks, task]);
    setTask({
      id: "task_" + Date.now().toString(),
      title: "",
      description: "",
      priority: "low",
      completed: false,
      createdAt: Date.now(),
      date: "",
    });
  };

  return (
    <form className="bg-white shadow p-4 rounded-lg mb-6" onSubmit={addTask}>
      <div className="flex flex-col md:flex-row gap-3">
        <input
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Task title (required)"
          required
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />

        <select
          className="w-40 border rounded px-3 py-2 focus:outline-none"
          value={task.priority}
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="date"
          className="w-44 border rounded px-3 py-2 focus:outline-none"
          value={task.date}
          onChange={(e) => setTask({ ...task, date: e.target.value })}
          required
        />
      </div>

      <textarea
        className="mt-3 w-full border rounded px-3 py-2 focus:outline-none"
        placeholder="Description"
        required
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />

      <div className="mt-3 flex items-center gap-3">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-500"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
