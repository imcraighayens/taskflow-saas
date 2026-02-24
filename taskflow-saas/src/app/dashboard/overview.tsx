"use client";
import { useTasks } from '../../lib/queries';

export default function OverviewPage() {
  const { tasks } = useTasks();
  const counts = {
    todo: 0,
    'in-progress': 0,
    done: 0,
  } as Record<string, number>;
  const priorityCounts = {
    high: 0,
    mid: 0,
    low: 0,
  } as Record<string, number>;
  const tagCounts: Record<string, number> = {};
  if (tasks) {
    for (const t of tasks) {
      counts[t.status] = (counts[t.status] || 0) + 1;
      priorityCounts[t.priority] = (priorityCounts[t.priority] || 0) + 1;
      tagCounts[t.tag] = (tagCounts[t.tag] || 0) + 1;
    }
  }
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-4">
          <h3 className="font-semibold mb-2">By Status</h3>
          <ul className="space-y-1">
            <li>To Do: {counts['todo']}</li>
            <li>In Progress: {counts['in-progress']}</li>
            <li>Done: {counts['done']}</li>
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-4">
          <h3 className="font-semibold mb-2">By Priority</h3>
          <ul className="space-y-1">
            <li>High: {priorityCounts['high']}</li>
            <li>Medium: {priorityCounts['mid']}</li>
            <li>Low: {priorityCounts['low']}</li>
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-4 md:col-span-2">
          <h3 className="font-semibold mb-2">By Tag</h3>
          <ul className="space-y-1">
            {Object.keys(tagCounts).length > 0 ? (
              Object.entries(tagCounts).map(([tag, count]) => (
                <li key={tag}>
                  {tag}: {count}
                </li>
              ))
            ) : (
              <li>No categories yet.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}