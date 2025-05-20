import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BrowseTasks = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8800/api/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Failed to fetch tasks", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Browse Tasks</h2>
      <div
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {tasks.map((task) => (
          <div
            key={task._id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{task.title}</h3>
            <p>
              <strong>Category:</strong> {task.category}
            </p>
            <p>
              <strong>Budget:</strong> ${task.budget}
            </p>
            <p>
              <strong>Deadline:</strong>{" "}
              {new Date(task.deadline).toLocaleDateString()}
            </p>
            <button onClick={() => navigate(`/task-details/${task._id}`)}>
              See Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseTasks;
