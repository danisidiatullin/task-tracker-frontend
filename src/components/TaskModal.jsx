import React, { useEffect, useState } from "react";

import Select from "react-select";
import { ApiClient } from "../api-client";
import FormField from "./FormField";

const TaskModal = ({ active, handleModal, token, id, setErrorMessage }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(0);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [statuses, setStatuses] = useState([]);

  const getStatuses = async () => {
    const statuses = await ApiClient.getStatuses();
    if (statuses.error) {
      setErrorMessage("Something went wrong. Couldn't load the statuses");
    } else {
      setStatuses(statuses.data);
    }
  };

  useEffect(() => {
    getStatuses();
  }, []);

  const statusOptions = statuses.map((text) => {
    return { value: text, label: text };
  });

  useEffect(() => {
    const getTask = async () => {
      const task = await ApiClient.getTask(id, token);
      if (task.error) {
        setErrorMessage("Could not get the task");
      } else {
        const data = task.data;
        setTitle(data.title);
        setDescription(data.description);
        setPriority(data.priority);
        setProgress(data.progress);
        setStatus(data.status);
      }
    };

    if (id) {
      getTask();
    }
  }, [id, token]);

  const cleanFormData = () => {
    setTitle("");
    setDescription("");
    setPriority(0);
    setProgress(0);
    setStatus("");
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    const created = await ApiClient.createTask(token, {
      title: title,
      description: description,
      priority: priority,
      progress: progress,
      status: status,
    });
    if (created) {
      cleanFormData();
      handleModal();
    } else {
      setErrorMessage("Something went wrong when creating task");
    }
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    const updated = await ApiClient.updateTask(id, token, {
      title: title,
      description: description,
      priority: priority,
      progress: progress,
      status: status,
    });
    if (updated) {
      cleanFormData();
      handleModal();
    } else {
      setErrorMessage("Something went wrong when updating task");
    }
  };

  return (
    <div className={`modal ${active && "is-active"}`}>
      <div className="modal-background" onClick={handleModal}></div>
      <div className="modal-card">
        <header className="modal-card-head has-background-primary-light">
          <h1 className="modal-card-title">
            {id ? "Update Task" : "Create Task"}
          </h1>
        </header>
        <section className="modal-card-body">
          <form>
            <FormField label="Title" type="text" value={title} f={setTitle} />

            <FormField
              label="Description"
              type="text"
              value={description}
              f={setDescription}
            />

            <FormField
              label="Priority"
              type="number"
              value={priority}
              f={setPriority}
            />

            <FormField
              label="Progress"
              type="number"
              value={progress}
              f={setProgress}
            />

            <div className="field">
              <label className="label">Status</label>
              <div className="control">
                <Select
                  options={statusOptions}
                  value={{
                    value: status,
                    label: status,
                  }}
                  onChange={(e) => setStatus(e.value)}
                />
              </div>
            </div>
          </form>
        </section>

        <footer className="modal-card-foot has-background-primary-light">
          {id ? (
            <button className="button is-info" onClick={handleUpdateTask}>
              Update
            </button>
          ) : (
            <button className="button is-primary" onClick={handleCreateTask}>
              Create
            </button>
          )}
          <button className="button" onClick={handleModal}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default TaskModal;
