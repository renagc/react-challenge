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
    return { id: taskID, title: task };
  };

  return (
    <>
      <main className="container border">
        <AppContext.Provider value={{ taskList, removeTask }}>
          <section>
            <input
              className="border border-black py-2 px-3"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTask(e.target.value)
              }
            ></input>
            <Button onClick={() => setTaskList([...taskList, addTask()])}>
              add task
            </Button>
          </section>
          <section className="max-h-[80vh] overflow-y-scroll scroll-smooth px-3 py-2">
            <TaskList />
          </section>
        </AppContext.Provider>
      </main>
    </>
  );
}

export default App;
