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

  const addTask = () => {
    setTaskID(taskID + 1);
    return { id: taskID, title: task, checked: false };
  };

  return (
    <>
      <main className="container h-full w-full flex flex-col">
        <AppContext.Provider value={{ taskList, removeTask }}>
          <section className="flex w-full py-2">
            <input
              className="border border-black py-2 px-3 flex-1"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTask(e.target.value)
              }
            ></input>
            <Button onClick={() => setTaskList([...taskList, addTask()])}>
              add task
            </Button>
          </section>
          <TaskList />
        </AppContext.Provider>
      </main>
    </>
  );
}

export default App;
