import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddTask = ({ user, token }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:8800/api/add-task", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("✅ Task added successfully!");
      reset();
    } catch (err) {
      setMessage("❌ Error adding task.");
    }
  };

  // Handle the case when user is not available (not logged in or token expired)
  if (!user) {
    return <p>Please log in to add a task.</p>; // Or redirect them to the login page
  }

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Add New Task</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          placeholder="Task Title"
          {...register("title", { required: true })}
        />
        {errors.title && <span>Title is required</span>}

        <select {...register("category", { required: true })}>
          <option value="">Select Category</option>
          <option value="Web Development">Web Development</option>
          <option value="Design">Design</option>
          <option value="Writing">Writing</option>
          <option value="Marketing">Marketing</option>
        </select>
        {errors.category && <span>Category is required</span>}

        <textarea
          placeholder="Description"
          {...register("description", { required: true })}
        />
        {errors.description && <span>Description is required</span>}

        <input type="date" {...register("deadline", { required: true })} />
        {errors.deadline && <span>Deadline is required</span>}

        <input
          type="number"
          placeholder="Budget"
          {...register("budget", { required: true })}
        />
        {errors.budget && <span>Budget is required</span>}

        {/* Display email and name only if user exists */}
        <input type="text" value={user?.email || ""} readOnly />
        <input type="text" value={user?.name || ""} readOnly />

        <button type="submit">Add Task</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default AddTask;
