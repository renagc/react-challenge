import { useState } from "react";
import { useTaskContext, type Task } from "../context";

function TaskItem({ item }: { item: Task }) {
  const { removeTask, updateTask } = useTaskContext();
  const [enable, setEnable] = useState<boolean>(true);
  const [title, setTitle] = useState<string>(item.title);

  const padding = "py-2 px-3";

  return (
    <tr className="border-b">
      <td className={padding}>
        <input
          type="checkbox"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            updateTask({
              ...item,
              checked: e.target.checked,
            });
          }}
          checked={item.checked}
        />
      </td>
      <td className={padding}>{item.id}</td>
      <td className={padding + " w-full"}>
        <input
          type="text"
          className={
            !enable
              ? "border w-full py-2 px-3 rounded focus:outline-0"
              : "w-full py-2 px-3"
          }
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          disabled={enable}
        />
      </td>
      <td className={padding}>
        {!item.checked && (
          <button
            className="hover:underline hover:italic cursor-pointer"
            onClick={() => {
              if (!title.localeCompare("")) {
                alert("The task title must not be empty");
                setTitle(item.title);
              } else if (!enable) {
                updateTask({
                  ...item,
                  title: title,
                });
              }
              setEnable(!enable);
            }}
          >
            {enable ? "edit" : "save"}
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
  const [sort, setSort] = useState<boolean | undefined>(undefined);

  const handleButtonSort = () => {
    if (sort === undefined) setSort(true);
    else if (sort === false) setSort(undefined);
    else setSort(false);
  };

  const handleTableSort = (a: Task, b: Task) => {
    if (sort === undefined) return 0;
    else if (sort) return a.title.localeCompare(b.title);
    else return b.title.localeCompare(a.title);
  };

  return (
    <section className="flex-1 flex flex-col gap-4 overflow-hidden w-full py-2">
      <button
        className="font-bold hover:underline self-start cursor-pointer"
        onClick={handleButtonSort}
      >
        Tasks{sort !== undefined && (sort === true ? "⇄" : "⇆")}
      </button>
      <div className="overflow-y-auto w-full border rounded">
        <table className="table-auto w-full">
          <tbody>
            {taskList.length !== 0 ? (
              taskList
                .filter((item: Task) => !(hide && item.checked))
                .sort(handleTableSort)
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
