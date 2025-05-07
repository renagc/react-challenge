import { createContext, useContext } from "react";

type Task = {
  id: number;
  title: string;
  checked: boolean;
};

type TaskData = {
  taskList: Task[];
  removeTask: (id: number) => void;
};

const TaskContext = createContext<TaskData | undefined>(undefined);

function useTaskContext() {
  const context = useContext(TaskContext);

  if (context === undefined) throw new Error("Context Not Defined");

  return context;
}

export type { Task, TaskData };
export { useTaskContext };
export default TaskContext;
