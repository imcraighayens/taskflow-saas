"use client";
import { useState } from 'react';
import { useTasks, useCreateTask, useUpdateTask, useDeleteTask } from '../lib/queries';
import { supabaseClient } from '../lib/supabaseClient';
import TaskCard from './TaskCard';
import type { Task, TaskInsert } from '../lib/queries';

/**
 * Board component displays tasks grouped by status.  Users can create
 * new tasks and update or delete existing ones.  Drag‑and‑drop is
 * omitted for brevity; status changes are handled via the drop‑down on
 * each task.
 */
export default function Board() {
  const { tasks, isLoading } = useTasks();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [creating, setCreating] = useState(false);

  const handleCreate = async (status: Task['status']) => {
    if (!newTaskTitle.trim()) return;
    setCreating(true);
    try {
      const user = await supabaseClient().auth.getUser();
      const userId = user.data.user?.id || '';
      await createTask({
        title: newTaskTitle,
        status,
        user_id: userId,
      } as TaskInsert);
      setNewTaskTitle('');
    } finally {
      setCreating(false);
    }
  };

  const statuses: Array<Task['status']> = ['todo', 'in-progress', 'done'];
  const grouped: Record<Task['status'], Task[]> = {
    'todo': [],
    'in-progress': [],
    'done': [],
  };
  if (tasks) {
    for (const task of tasks) {
      grouped[task.status].push(task);
    }
  }
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold mb-4">My Tasks</h2>
      <div className="flex space-x-4 overflow-x-auto">
        {statuses.map(status => (
          <div key={status} className="w-1/3 min-w-[280px]">
            <h3 className="font-semibold mb-2 capitalize">
              {status === 'todo' ? 'To Do' : status === 'in-progress' ? 'In Progress' : 'Done'}
            </h3>
            <div>
              {(grouped[status] || []).map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onUpdate={updateTask}
                  onDelete={deleteTask}
                />
              ))}
            </div>
            <div className="mt-2">
              <input
                type="text"
                placeholder="New task…"
                value={newTaskTitle}
                onChange={e => setNewTaskTitle(e.target.value)}
                className="w-full p-2 text-sm border rounded-md dark:bg-gray-700 dark:border-gray-600"
              />
              <button
                onClick={() => handleCreate(status)}
                disabled={creating || !newTaskTitle.trim()}
                className="mt-1 w-full bg-blue-600 text-white text-sm px-3 py-1 rounded-md disabled:opacity-50"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}