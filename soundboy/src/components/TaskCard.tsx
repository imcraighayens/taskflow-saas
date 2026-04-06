"use client";
import { Task } from '../lib/queries';
import { useState } from 'react';

interface TaskCardProps {
  task: Task;
  onUpdate: (id: string, updates: Partial<Task>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function TaskCard({ task, onUpdate, onDelete }: TaskCardProps) {
  const [showDesc, setShowDesc] = useState(false);
  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-3 mb-3 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className={`font-semibold ${task.status === 'done' ? 'line-through text-gray-400' : ''}`}>{task.title}</h3>
          {task.description && showDesc && (
            <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">{task.description}</p>
          )}
          {task.due && (
            <p className="text-xs mt-2 text-gray-500 dark:text-gray-500">Due: {task.due}</p>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            className="text-sm text-blue-600 dark:text-blue-400"
            onClick={() => onUpdate(task.id, { fav: !task.fav })}
          >
            {task.fav ? '★' : '☆'}
          </button>
          <button
            className="text-sm text-green-600 dark:text-green-400"
            onClick={() =>
              onUpdate(
                task.id,
                {
                  status: task.status === 'done' ? 'todo' : 'done',
                },
              )
            }
          >
            {task.status === 'done' ? '↩' : '✓'}
          </button>
          <button
            className="text-sm text-gray-600 dark:text-gray-400"
            onClick={() => setShowDesc(!showDesc)}
          >
            i
          </button>
          <button
            className="text-sm text-red-600 dark:text-red-400"
            onClick={() => onDelete(task.id)}
          >
            ×
          </button>
        </div>
      </div>
      <div className="mt-2">
        <select
          className="text-xs bg-gray-100 dark:bg-gray-700 rounded-md p-1"
          value={task.status}
          onChange={e => onUpdate(task.id, { status: e.target.value as Task['status'] })}
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <span className="text-xs ml-2 px-2 py-1 rounded bg-gray-200 dark:bg-gray-700">
          {task.priority}
        </span>
        <span className="text-xs ml-1 px-2 py-1 rounded bg-gray-200 dark:bg-gray-700">
          {task.tag}
        </span>
      </div>
    </div>
  );
}