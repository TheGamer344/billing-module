import React from 'react';
import Calendar from './Calendar';
import { useTasksForWeek } from '../utils/taskUtils';

function Dashboard() {
  const today = new Date();
  const tasks = useTasksForWeek(today);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="p-6 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-orange-500 text-center">Welcome</h1>
        <p className="text-white font-bold text-center">{today.toDateString()}</p>
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-center">Tasks for this week:</h2>
          <ul className="text-center">
            {tasks.map((task, index) => (
              <li key={index} className="mt-2">
                {task}
              </li>
            ))}
          </ul>
        </div>
        <Calendar />
      </div>
    </div>
  );
}

export default Dashboard;
