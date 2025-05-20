import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateTaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    deadline: "",
    budget: "",
    email: "",
    createdBy: "",
  });
  const [error, setError] = useState("");

  // Fetch existing task
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/tasks/${id}`
        );
        setFormData(response.data);
      } catch (err) {
        setError("Error fetching task details");
        console.error(err);
      }
    };

    fetchTask();
  }, [id]);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8800/api/tasks/${id}`,
        {
          title: formData.title,
          category: formData.category,
          description: formData.description,
          deadline: formData.deadline,
          budget: formData.budget,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Task updated successfully.",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/my-posted-tasks");
      });
    } catch (err) {
      console.error("Error updating task:", err);
      setError("Error updating task");
    }
  };

  return (
    <div>
      <h2>Update Task</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Deadline:</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Budget:</label>
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Your Name:</label>
          <input type="text" value={formData.createdBy} readOnly />
        </div>
        <div>
          <label>Your Email:</label>
          <input type="email" value={formData.email} readOnly />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateTaskPage;
