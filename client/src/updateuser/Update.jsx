import React, { useEffect, useState } from "react";
import "./update.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateTask = () => {
  const initialTask = {
    name: "",
    description: "",
    dueDate: "",
    status: false,
  };

  const [task, setTask] = useState(initialTask);
  const navigate = useNavigate();
  const { id } = useParams();

  const inputHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({
      ...task,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/user/${id}`)
      .then((response) => {
        setTask(response.data);
        console.log("this is task data", task);

      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch task data");
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8000/api/update/user/${id}`,
        task
      );
      toast.success(response.data.message || "Task updated successfully", {
        position: "top-right",
      });
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update task", { position: "top-right" });
    }
  };

  return (
    <div className="addUser">
      <Link to="/" type="button" className="btn btn-secondary">
        <i className="fa-solid fa-backward"></i> Back
      </Link>

      <h3>Update Task</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="name">Task Name:</label>
          <input
            type="text"
            id="name"
            value={task.name}
            onChange={inputHandler}
            name="name"
            autoComplete="off"
            placeholder="Enter Task Name"
            required
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={task.description}
            onChange={inputHandler}
            name="description"
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
            value={task.dueDate ? task.dueDate.slice(0, 10) : ""}
            onChange={inputHandler}
            name="dueDate"
            required
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="status">
            <input
              type="checkbox"
              id="status"
              name="status"
              checked={task.status}
              onChange={inputHandler}
            />
            Completed?
          </label>
        </div>

        <div className="inputGroup">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTask;
