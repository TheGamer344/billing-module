export function getMonthDays(date: Date): Date[] {
  const year = date.getFullYear();
  const month = date.getMonth();
  const days = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: days }, (_, i) => new Date(year, month, i + 1));
}

export function addTaskToDate(
  date: Date,
  taskDetails: { task: string; class: string; level: string },
  tasks: { [key: string]: { task: string; class: string; level: string }[] },
  setTasks: React.Dispatch<React.SetStateAction<{ [key: string]: { task: string; class: string; level: string }[] }>>
) {
  const dateString = date.toDateString();
  const newTasks = { ...tasks };
  if (!newTasks[dateString]) {
    newTasks[dateString] = [];
  }
  newTasks[dateString].push(taskDetails);
  setTasks(newTasks);
}
