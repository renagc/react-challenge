import { useState } from "react";
import Button from "./components/Button";
import AppContext, { type Task } from "./context";
import TaskList from "./components/Task";

function App() {
  const [taskID, setTaskID] = useState<number>(0);
  const [task, setTask] = useState<string>("");
  const [taskList, setTaskList] = useState<Task[]>([]);

  const removeTask = (id: number) => {
    const newTaskList = taskList.filter((taskList) => taskList.id !== id);
    setTaskList(newTaskList);
  };

  const updateTask = (updatedTask: Task) => {
    const newTaskList = taskList.map((task) => {
      if (task.id === updatedTask.id)
        return {
          ...task,
          title: updatedTask.title,
          checked: updatedTask.checked,
        };
      return task;
    });
    setTaskList(newTaskList);
  };

  const newTask = () => {
    if (!task.localeCompare("")) return alert("Task title must not be empty!");
    setTaskID(taskID + 1);
    setTaskList([...taskList, { id: taskID, title: task, checked: false }]);
  };

  return (
    <>
      <main className="container h-full w-full flex flex-col">
        <AppContext.Provider value={{ taskList, removeTask, updateTask }}>
          <section className="flex w-full py-2">
            <input
              className="border border-black py-2 px-3 flex-1"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTask(e.target.value)
              }
            ></input>
            <Button onClick={newTask}>add task</Button>
          </section>
          <TaskList />
        </AppContext.Provider>
      </main>
    </>
  );
}

export default App;
