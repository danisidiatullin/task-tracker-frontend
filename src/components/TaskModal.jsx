import React, { useEffect, useState } from "react";

import Select from "react-select";
import { ApiClient } from "../api-client";

const TaskModal = ({ active, handleModal, token, id, setErrorMessage }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(0);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [statuses, setStatuses] = useState([]);

  const getStatuses = async () => {
    const response = await ApiClient.getStatuses();
    if (!response.ok) {
      setErrorMessage("Something went wrong. Couldn't load the statuses");
    } else {
      const data = await response.json();
      setStatuses(data);
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
      const response = await ApiClient.getTask(id, token);
      if (!response.ok) {
        setErrorMessage("Could not get the task");
      } else {
        const data = await response.json();
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
    const response = await ApiClient.createTask(token, {
      title: title,
      description: description,
      priority: priority,
      progress: progress,
      status: status,
    });
    if (!response.ok) {
      setErrorMessage("Something went wrong when creating task");
    } else {
      cleanFormData();
      handleModal();
    }
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    const response = await ApiClient.updateTask(id, token, {
      title: title,
      description: description,
      priority: priority,
      progress: progress,
      status: status,
    });
    if (!response.ok) {
      setErrorMessage("Something went wrong when updating task");
    } else {
      cleanFormData();
      handleModal();
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
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Priority</label>
              <div className="control">
                <input
                  type="number"
                  placeholder="Enter priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Progress</label>
              <div className="control">
                <input
                  type="number"
                  placeholder="Enter title"
                  value={progress}
                  onChange={(e) => setProgress(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>

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
