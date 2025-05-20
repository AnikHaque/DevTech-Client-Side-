import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import axios from "axios";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [task, setTask] = useState(null);
  const [error, setError] = useState("");
  const [bidsCount, setBidsCount] = useState(0); // Tracks the number of bids made by the user
  const [userHasBidded, setUserHasBidded] = useState(false); // Tracks if the user has already bid on this task

  useEffect(() => {
    axios
      .get(`http://localhost:8800/api/tasks/${id}`)
      .then((res) => setTask(res.data))
      .catch((err) => {
        setError("Task not found or error fetching task.");
        console.error("Error fetching task:", err);
      });

    // Fetch current bid count for the task
    axios
      .get(`http://localhost:8800/api/bids/${id}`)
      .then((res) => {
        setBidsCount(res.data.length); // Update the number of bids for this task
      })
      .catch((err) => console.error("Error fetching bids:", err));
  }, [id]);

  const handleBid = () => {
    // Check if the user has already bid
    if (userHasBidded) {
      alert("You have already placed a bid for this task.");
      return;
    }

    // Place the bid (you can enhance this logic to send additional details like user info if needed)
    axios
      .post(
        `http://localhost:8800/api/bids/${id}`,
        { taskId: id }, // Send taskId to place bid
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming JWT token is stored in localStorage
          },
        }
      )
      .then(() => {
        // Update bid count and set flag that user has bid
        setBidsCount((prevCount) => prevCount + 1);
        setUserHasBidded(true); // Set the flag to prevent multiple bids
      })
      .catch((err) => console.error("Error placing bid:", err));
  };

  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>{error}</h2>
        <button onClick={() => navigate("/my-tasks")}>
          Go Back to My Tasks
        </button>
      </div>
    );
  }

  if (!task) return <p>Loading task details...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h3>You bid for {bidsCount} opportunities</h3>
      <h2>{task.title}</h2>
      <p>
        <strong>Category:</strong> {task.category}
      </p>
      <p>
        <strong>Description:</strong> {task.description}
      </p>
      <p>
        <strong>Deadline:</strong>{" "}
        {new Date(task.deadline).toLocaleDateString()}
      </p>
      <p>
        <strong>Budget:</strong> ${task.budget}
      </p>
      <p>
        <strong>Posted By:</strong> {task.userName} ({task.userEmail})
      </p>

      {/* Bid Button */}
      <button onClick={handleBid} disabled={userHasBidded}>
        {userHasBidded ? "You have already placed a bid" : "Place Bid"}
      </button>
    </div>
  );
};

export default TaskDetails;
