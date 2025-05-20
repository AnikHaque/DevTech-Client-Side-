import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyPostedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch tasks posted by the logged-in user
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get("http://localhost:8800/api/my-tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (err) {
        setError("Error fetching tasks");
        console.error("❌ Fetch error:", err);
      }
    };

    fetchTasks();
  }, []);

  // Delete task
  const handleDelete = async (taskId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8800/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      setError("Error deleting task");
      console.error("❌ Delete error:", err);
    }
  };

  // Navigate to update task page
  const handleUpdate = (taskId) => {
    navigate(`/update-task/${taskId}`);
  };

  // Navigate to view bids for this task
  const handleViewBids = (taskId) => {
    navigate(`/bids/${taskId}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Posted Tasks</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Title</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Category
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Budget</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                No tasks available
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task._id}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {task.title}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {task.category}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  ${task.budget}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  <button
                    onClick={() => handleUpdate(task._id)}
                    style={{ marginRight: "8px" }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    style={{ marginRight: "8px" }}
                  >
                    Delete
                  </button>
                  <button onClick={() => handleViewBids(task._id)}>
                    View Bids
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyPostedTasks;
