"use client";
import { useTasks, useUpdateTask, useDeleteTask } from '../../lib/queries';
import TaskCard from '../../components/TaskCard';

export default function ListPage() {
  const { tasks } = useTasks();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Task List</h2>
      {tasks && tasks.length > 0 ? (
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Priority</th>
              <th className="p-2 text-left">Tag</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id} className="border-b dark:border-gray-700">
                <td className="p-2">{task.title}</td>
                <td className="p-2">{task.status}</td>
                <td className="p-2">{task.priority}</td>
                <td className="p-2">{task.tag}</td>
                <td className="p-2 space-x-2">
                  <button
                    className="text-green-600 dark:text-green-400 text-xs"
                    onClick={() =>
                      updateTask(task.id, {
                        status: task.status === 'done' ? 'todo' : 'done',
                      })
                    }
                  >
                    {task.status === 'done' ? 'Reopen' : 'Complete'}
                  </button>
                  <button
                    className="text-red-600 dark:text-red-400 text-xs"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
}