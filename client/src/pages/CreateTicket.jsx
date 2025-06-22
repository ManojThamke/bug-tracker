import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function CreateTicket() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [projectId, setProjectId] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/projects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data);
        if (res.data.length > 0) setProjectId(res.data[0]._id); // Auto-select first project
      } catch (err) {
        toast.error("Error loading projects");
      }
    };
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/tickets",
        { title, description, priority, projectId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Ticket Created Successfully!");
      setTitle("");
      setDescription("");
      setPriority("Medium");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating ticket");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-purple-800 mb-4">Create New Ticket</h2>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow space-y-4 text-purple-900 max-w-xl">
        <input
          type="text"
          placeholder="Ticket Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border border-purple-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-purple-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          rows="3"
        ></textarea>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full border border-purple-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          className="w-full border border-purple-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          {projects.map((p) => (
            <option key={p._id} value={p._id}>
              {p.title}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white py-2 rounded hover:from-pink-500 hover:to-purple-600"
        >
          Create Ticket
        </button>
      </form>
    </div>
  );
}

export default CreateTicket;
