import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function FilterSearch() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFilter = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/tickets/search/all", {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, status, priority },
      });
      setResults(res.data);
    } catch {
      toast.error("Failed to load filtered issues");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-purple-800 mb-4">Filter & Search Issues</h2>

      <form
        onSubmit={handleFilter}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-xl shadow"
      >
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-purple-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-purple-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="">All Status</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border border-purple-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button
          type="submit"
          className="bg-gradient-to-r from-pink-400 to-purple-500 text-white py-2 rounded-full hover:from-pink-500 hover:to-purple-600"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-purple-600">Loading results...</p>}

      {!loading && results.length > 0 && (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-full table-auto text-purple-800">
            <thead>
              <tr className="bg-[#EAD6F9] text-left">
                <th className="p-2">Title</th>
                <th className="p-2">Priority</th>
                <th className="p-2">Status</th>
                <th className="p-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {results.map((ticket) => (
                <tr key={ticket._id} className="border-b border-purple-100">
                  <td className="p-2">{ticket.title}</td>
                  <td className="p-2">{ticket.priority}</td>
                  <td className="p-2">{ticket.status}</td>
                  <td className="p-2">{new Date(ticket.createdAt).toISOString().split("T")[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && results.length === 0 && <p className="text-purple-500">No matching results found.</p>}
    </div>
  );
}

export default FilterSearch;
