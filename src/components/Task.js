import React from "react";

const Task = ({ task, tasks, setTasks }) => {
  const markCompleted = () => {
    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, completed: true } : t
    );
    setTasks(updatedTasks);
  };

  const deleteTask = () => {
    const updatedTasks = tasks.filter((t) => t.id !== task.id);
    setTasks(updatedTasks);
  };

  return (
    <div
      className={`${task.completed ? "bg-slate-100" : "bg-white"
        } p-4 rounded shadow flex flex-col md:flex-row md:items-center gap-3`}
    >
      <div className="flex items-start md:items-center gap-3 w-full">
        <div className="flex-1">
          <div className="flex items-center gap-3 justify-between">
            <div>
              <h3
                className={`${task.completed ? "line-through" : ""
                  } text-lg font-semibold text-slate-800`}
              >
                {task.title}
              </h3>
              <p
                className={`${task.completed ? "line-through" : ""
                  } text-sm text-slate-600`}
              >
                {task.description}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="px-2 py-1 rounded text-xs bg-slate-100">
                Due Date {task?.date}
              </div>
              <div className="px-2 py-1 rounded text-xs bg-slate-100">
                {task.priority}
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="mt-3 flex gap-2 ">
              {!task.completed && (
                <button className="px-3 py-1 border rounded text-sm">Edit</button>
              )}
              <button
                className="px-3 py-1 border rounded text-sm text-red-600"
                onClick={deleteTask}
              >
                Delete
              </button>
              {!task.completed && (
                <button
                  className="px-3 py-1 border rounded text-sm text-green-600"
                  onClick={markCompleted}
                >
                  Mark Completed
                </button>
              )}
            </div>
            <div className="text-xs text-slate-400">  
              Created {new Date(task.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Task;
