import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function CreateProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Not Started");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/projects",
        { title, description, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Project Created");
      setTitle("");
      setDescription("");
      setStatus("Not Started");
    } catch {
      toast.error("Failed to create project");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-2xl font-bold text-purple-800 text-center">Create New Project</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border border-purple-300 p-2 rounded"
        />

        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full border border-purple-300 p-2 rounded"
        />

        {/* ✅ Project Status Dropdown */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border border-purple-300 p-2 rounded"
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
        >
          Create Project
        </button>
      </form>
    </div>
  );
}

export default CreateProject;
