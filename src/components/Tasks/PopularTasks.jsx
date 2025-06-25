import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PopularTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPopularTasks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/popular-tasks");
        setTasks(res.data);
      } catch (error) {
        console.error("Error fetching popular tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularTasks();
  }, []);

  if (loading) return <p>Loading popular tasks...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
      <h2
        className="text-4xl font-bold text-center  mb-12"
        style={{ color: "var(--heading-color, var(--text-color))" }}
      >
        Most Popular Tasks
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div key={task._id}>
            <div className="card bg-base-100 lg:max-w-lg shadow-sm">
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{task.title}</h2>
                <p>{task.description}</p>
                <div className="justify-center">
                  <button
                    onClick={() => navigate(`/task-details/${task._id}`)}
                    className="btn btn-primary w-86"
                  >
                    See Details
                  </button>
                </div>
              </div>
            </div>
            {/* <h3 className="text-xl font-semibold">{task.title}</h3>
            <p className="text-gray-600 mb-1">Category: {task.category}</p>
            <p className="text-sm text-gray-500">{task.description}</p>
            <p className="text-sm mt-2">💰 Budget: ${task.budget}</p>
            <p className="text-sm">
              ⏰ Deadline: {new Date(task.deadline).toLocaleDateString()}
            </p>
            <p className="text-sm font-medium mt-2 text-blue-600">
              📢 {task.bidCount} bids
            </p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularTasks;
