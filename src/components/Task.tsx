import { useState } from "react";
import { useTaskContext, type Task } from "../context";

function TaskItem({ item }: { item: Task }) {
  const { removeTask, updateTask } = useTaskContext();

  const padding = "py-2 px-3";

  return (
    <tr className="border-b">
      <td className={padding}>
        <input
          type="checkbox"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateTask({
              id: item.id,
              title: item.title,
              checked: e.target.checked,
            })
          }
          checked={item.checked}
        />
      </td>
      <td className={padding}>{item.id}</td>
      <td className={padding}>
        <input
          type="text"
          value={item.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateTask({
              id: item.id,
              title: e.target.value,
              checked: item.checked,
            })
          }
          disabled
        />
      </td>
      <td className={padding}>
        {!item.checked && (
          <button className="hover:underline hover:italic cursor-pointer">
            edit
          </button>
        )}
      </td>
      <td className={padding}>
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
  const [hide, setHide] = useState<boolean>(false);

  return (
    <section className="flex-1 flex flex-col gap-4 overflow-hidden w-full py-2">
      <button className="font-bold hover:underline self-start cursor-pointer">
        Tasks
      </button>
      <div className="overflow-y-auto w-full border rounded">
        <table className="table-auto w-full">
          <tbody>
            {taskList.length !== 0 ? (
              taskList
                .filter((item: Task) => !(hide && item.checked))
                .map((item: Task) => <TaskItem key={item.id} item={item} />)
            ) : (
              <tr>
                <td className="px-3 py-2">
                  <input type="checkbox" disabled />
                </td>
                <td colSpan={5}>No tasks available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2">
        <input
          id="checkbox-hide-complete"
          type="checkbox"
          onChange={() => setHide(!hide)}
        />
        <label htmlFor="checkbox-hide-complete">Hide Complete</label>
      </div>
    </section>
  );
}

export default TaskList;
