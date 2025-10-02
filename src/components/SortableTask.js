import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Task from "./Task";
import { GripVertical } from "lucide-react"; // optional icon (you can replace with any)

export default function SortableTask({ task, tasks, setTasks }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li ref={setNodeRef} style={style} className="flex items-start gap-2">
      <span
        {...attributes}
        {...listeners}
        className="cursor-grab p-2 text-slate-400 hover:text-slate-600"
      >
        <GripVertical size={18} />
      </span>

      {/* Task Content */}
      <div className="flex-1">
        <Task task={task} tasks={tasks} setTasks={setTasks} />
      </div>
    </li>
  );
}
