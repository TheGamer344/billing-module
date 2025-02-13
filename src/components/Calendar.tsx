import React, { useState, useEffect } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Calendar() {
  const [tasks, setTasks] = useState<{ [key: string]: { task: string; class: string; level: string }[] }>({});
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetch('/api/tasks')
      .then((response) => response.json())
      .then((data) => {
        const taskMap: { [key: string]: { task: string; class: string; level: string }[] } = {};
        data.forEach((task: any) => {
          const dateString = new Date(task.date).toDateString();
          if (!taskMap[dateString]) {
            taskMap[dateString] = [];
          }
          taskMap[dateString].push({ task: task.task, class: task.class, level: task.level });
        });
        setTasks(taskMap);
      });
  }, []);

  const handleDateClick = (date: Date) => {
    const task = prompt('Enter task:');
    const taskClass = prompt('Enter class:');
    const level = prompt('Enter level (normal, easy, hard):');
    if (task && taskClass && level) {
      fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, task, taskClass, level }),
      })
        .then((response) => response.json())
        .then(() => {
          const dateString = date.toDateString();
          const newTasks = { ...tasks };
          if (!newTasks[dateString]) {
            newTasks[dateString] = [];
          }
          newTasks[dateString].push({ task, class: taskClass, level });
          setTasks(newTasks);
        });
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-orange-500">Calendar</h2>
      <ReactCalendar
        onClickDay={handleDateClick}
        value={selectedDate}
        onChange={setSelectedDate}
        tileContent={({ date }) => {
          const dateString = date.toDateString();
          return tasks[dateString] ? (
            <div className="flex justify-center mt-1">
              {tasks[dateString].map((task, i) => (
                <span
                  key={i}
                  className={`block w-2 h-2 rounded-full ${
                    task.level === 'easy' ? 'bg-green-500' : task.level === 'normal' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  title={`${task.task} (${task.class})`}
                  onClick={() => alert(`Task: ${task.task}\nClass: ${task.class}\nLevel: ${task.level}`)}
                ></span>
              ))}
            </div>
          ) : null;
        }}
        className="bg-gray-800 text-white border-none"
      />
    </div>
  );
}

export default Calendar;
