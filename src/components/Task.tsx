import { useState } from "react";
import { useTaskContext, type Task } from "../context";

function TaskItem({ item }: { item: Task }) {
  const [value, setValue] = useState<string>(item.title);
  const [checked, setChecked] = useState<boolean>(item.checked);
  const { removeTask } = useTaskContext();

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setChecked(e.target.checked)
          }
        />
      </td>
      <td>{item.id}</td>
      <td>
        <input
          type="text"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          disabled
        />
      </td>
      <td>
        {!checked && (
          <button className="hover:underline hover:italic cursor-pointer">
            edit
          </button>
        )}
      </td>
      <td>
        <button
          className="hover:underline hover:italic cursor-pointer"
          onClick={() => removeTask(item.id)}
        >
          delete
        </button>
      </td>
    </tr>
  );
}

function TaskList() {
  const { taskList } = useTaskContext();

  return (
    <>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th></th>
            <th className="text-left">ID</th>
            <th className="text-left">Tasks</th>
          </tr>
        </thead>
        <tbody>
          {taskList.length !== 0 ? (
            taskList.map((item: Task) => <TaskItem key={item.id} item={item} />)
          ) : (
            <tr>
              <td colSpan={5}>No tasks available.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex gap-2">
        <input id="checkbox-hide-complete" type="checkbox" />
        <label htmlFor="checkbox-hide-complete">Hide Complete</label>
      </div>
    </>
  );
}

export default TaskList;
