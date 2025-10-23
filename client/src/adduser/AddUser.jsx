import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AddTask = () => {
  const initialTask = {
    name: "",
    description: "",
    dueDate: "",
    status: false,
  };

  const [task, setTask] = useState(initialTask);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

const submitForm = async (e) => {
  e.preventDefault();
  try {
   const response = await axios.post("http://localhost:8000/api/user", task);
    toast.success(response.data.message || "Task created successfully", {
      position: "top-right",
    });

    setTask(initialTask);
    navigate("/");
  } catch (error) {
    console.error(error);
    toast.error(
      error.response?.data?.errorMessage || "Failed to create task",
      { position: "top-right" }
    );
  }
};

  return (
    <div className="addUser">
      <Link to="/" type="button" className="btn btn-secondary">
        <i className="fa-solid fa-backward"></i> Back
      </Link>

      <h3>Add New Task</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="name">Task Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={task.name}
            onChange={inputHandler}
            autoComplete="off"
            placeholder="Enter Task Name"
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={inputHandler}
            autoComplete="off"
            placeholder="Enter Task Description"
            required
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={task.dueDate}
            onChange={inputHandler}
            required
          />
        </div>
        <div className="inputGroup">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
