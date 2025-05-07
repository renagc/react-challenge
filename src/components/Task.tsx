import { useState } from "react";
import { useTaskContext, type Task } from "../context";

function TaskItem({ item }: { item: Task }) {
  const [value, setValue] = useState<string>(item.title);
  const [checked, setChecked] = useState<boolean>(item.checked);
  const { removeTask } = useTaskContext();

  return (
    <>
      <div className="flex gap-2">
        <input
          type="checkbox"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setChecked(e.target.checked)
          }
        />
        <p>{item.id}</p>
        <input
          type="text"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          disabled
          autoFocus
        />
      </div>
      <div className="flex gap-2">
        {!checked && (
          <button className="hover:underline hover:italic cursor-pointer">
            edit
          </button>
        )}
        <button
          className="hover:underline hover:italic cursor-pointer"
          onClick={() => removeTask(item.id)}
        >
          delete
        </button>
      </div>
    </>
  );
}

function TaskList() {
  const { taskList } = useTaskContext();

  return (
    <ul>
      {taskList.map((item: Task) => (
        <li key={item.id} className="list-none flex justify-between">
          <TaskItem item={item} />
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
