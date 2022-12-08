import React from "react";

const TableItem = ({ task, update_task, delete_task }) => {
  return (
    <tr key={task.id}>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>{task.priority}</td>
      <td>{task.progress}</td>
      <td>{task.status}</td>
      <td>
        <button
          className="button mr-2 is-info is-light"
          onClick={() => update_task(task.id)}
        >
          Update
        </button>
        <button
          className="button mr-2 is-danger is-light"
          onClick={() => delete_task(task.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TableItem;
