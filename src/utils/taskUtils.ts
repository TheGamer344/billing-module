import { useEffect, useState } from 'react';

export function useTasksForWeek(date: Date): string[] {
  const [tasks, setTasks] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/tasks')
      .then((response) => response.json())
      .then((data) => {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay()); // Set to Sunday
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to Saturday

        const weekTasks = data
          .filter((task: any) => {
            const taskDate = new Date(task.date);
            return taskDate >= startOfWeek && taskDate <= endOfWeek;
          })
          .map((task: any) => task.task);

        setTasks(weekTasks.length > 0 ? weekTasks : ['No tasks for this week']);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
        setTasks(['Error fetching tasks']);
      });
  }, [date]);

  return tasks;
}
