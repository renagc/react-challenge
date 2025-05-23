import { useEffect, useState } from "react";
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
    setTask("");
  };

  useEffect(() => {
    if (taskID === 0) {
      const getTaskID = localStorage.getItem("currentTaskID");
      if (getTaskID) setTaskID(Number(getTaskID));
      const getTaskList = localStorage.getItem("taskList");
      if (getTaskList) setTaskList(JSON.parse(getTaskList));
      return;
    }
    localStorage.setItem("currentTaskID", taskID.toString());
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList, taskID]);

  return (
    <>
      <main className="container h-full w-full flex flex-col gap-2">
        <AppContext.Provider value={{ taskList, removeTask, updateTask }}>
          <h1 className="font-bold text-2xl">Create a Task</h1>
          <section className="flex w-full py-2 gap-4">
            <input
              className="border border-black py-2 px-3 flex-1 focus:outline-0 rounded"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTask(e.target.value)
              }
              value={task}
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
