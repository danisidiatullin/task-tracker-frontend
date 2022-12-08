import React, { useContext, useEffect, useState } from "react";

import ErrorMessage from "./ErrorMessage";
import TaskModal from "./TaskModal";
import { UserContext } from "../context/UserContext";
import { ApiClient } from "../api-client";
import TableItem from "./TableItem";

const Table = () => {
  const [token] = useContext(UserContext);
  const [tasks, setTasks] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const [id, setId] = useState(null);

  const handleUpdate = async (id) => {
    setId(id);
    setActiveModal(true);
  };

  const handleDelete = async (id) => {
    const deleted = await ApiClient.deleteTask(id, token);
    if (!deleted) {
      setErrorMessage("Failed to delete task");
    }
    getTasks();
  };

  const getTasks = async () => {
    const tasks = await ApiClient.getTasks(token);
    if (tasks.error) {
      setErrorMessage("Something went wrong. Couldn't load the tasks");
    } else {
      setTasks(tasks.data);
      setLoaded(true);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleModal = () => {
    setActiveModal(!activeModal);
    getTasks();
    setId(null);
  };

  return (
    <>
      <TaskModal
        active={activeModal}
        handleModal={handleModal}
        token={token}
        id={id}
        setErrorMessage={setErrorMessage}
      />
      <button
        className="button is-fullwidth mb-5 is-primary"
        onClick={() => setActiveModal(true)}
      >
        Create Task
      </button>
      <ErrorMessage message={errorMessage} />
      {loaded && tasks ? (
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Progress</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <TableItem
                task={task}
                update_task={handleUpdate}
                delete_task={handleDelete}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};
export default Table;
