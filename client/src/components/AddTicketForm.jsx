import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AddTicketForm({ projectId, onTicketCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/tickets",
        {
          title,
          description,
          priority,
          projectId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Ticket Created Successfully!");
      setTitle("");
      setDescription("");
      setPriority("Medium");
      if (onTicketCreated) onTicketCreated(); // Refresh list if needed
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating ticket");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 bg-white p-4 rounded shadow text-purple-900">
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
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white py-2 rounded hover:from-pink-500 hover:to-purple-600"
      >
        Add Ticket
      </button>
    </form>
  );
}

export default AddTicketForm;
