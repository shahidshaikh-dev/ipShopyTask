import React, { useEffect, useState } from "react";
import "./user.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const User = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/users");
        setTasks(response.data);
        console.log("all data", response.data)
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  const deleteTask = async (taskId) => {
    await axios
      .delete(`http://localhost:8000/api/delete/user/${taskId}`)
      .then((response) => {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );
        toast.success(response.data.message, { position: "top-right" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="userTable">
      <Link to="/add" type="button" className="btn btn-primary">
        Add Task <i className="fa-solid fa-plus"></i>
      </Link>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Due Date</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => {
            return (
              <tr key={task._id}>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.dueDate ? task.dueDate.slice(0, 10) : "—"}</td>
                <td>
                  {task.status ? (
                    <span className="badge bg-success">Completed</span>
                  ) : (
                    <span className="badge bg-warning">Pending</span>
                  )}
                </td>
                <td className="actionButtons">
                  <Link
                    to={`/update/${task._id}`}
                    type="button"
                    className="btn btn-info"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                  <button
                    onClick={() => deleteTask(task._id)}
                    type="button"
                    className="btn btn-danger"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default User;
