import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AssignedIssues() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignedTickets();
  }, []);

  const fetchAssignedTickets = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/tickets/assigned/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Error loading assigned tickets");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-purple-800">Assigned Issues</h2>

      {loading ? (
        <p className="text-purple-600">Loading assigned tickets...</p>
      ) : tickets.length === 0 ? (
        <p className="text-purple-500">No tickets assigned to you yet.</p>
      ) : (
        <div className="bg-white rounded-xl shadow divide-y border border-purple-100">
          {tickets.map((ticket) => (
            <div key={ticket._id} className="p-4 text-purple-900">
              <h3 className="font-semibold">{ticket.title}</h3>
              <p className="text-xs text-purple-500">{ticket.priority} • {ticket.status}</p>
              {ticket.description && (
                <p className="text-sm text-gray-700 mt-1">{ticket.description}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">Project: {ticket.projectId?.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AssignedIssues;
