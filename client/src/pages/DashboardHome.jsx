import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function DashboardHome() {
  const [stats, setStats] = useState(null);
  const [recentIssues, setRecentIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingIssues, setLoadingIssues] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
    fetchRecentIssues();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    } catch {
      toast.error("Error loading dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentIssues = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/dashboard/recent-issues", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecentIssues(res.data);
    } catch {
      toast.error("Error loading recent issues");
    } finally {
      setLoadingIssues(false);
    }
  };

  const groupedTickets = {
    "To Do": recentIssues.filter((t) => t.status === "To Do"),
    "In Progress": recentIssues.filter((t) => t.status === "In Progress"),
    "Done": recentIssues.filter((t) => t.status === "Done"),
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-purple-800">Dashboard</h2>

      {/* 4 Stats Cards */}
      {loading ? (
        <p className="text-purple-600">Loading dashboard...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#EAD6F9] p-4 rounded-xl shadow text-purple-900">
            <h3 className="text-lg font-bold">Total Projects</h3>
            <p className="text-3xl font-bold">{stats?.totalProjects || 0}</p>
          </div>
          <div className="bg-[#F9D7F9] p-4 rounded-xl shadow text-purple-900">
            <h3 className="text-lg font-bold">Open Tickets</h3>
            <p className="text-3xl font-bold">{stats?.openTickets || 0}</p>
          </div>
          <div className="bg-[#FDF1C7] p-4 rounded-xl shadow text-purple-900">
            <h3 className="text-lg font-bold">In Progress</h3>
            <p className="text-3xl font-bold">{stats?.inProgressTickets || 0}</p>
          </div>
          <div className="bg-[#CFF3DA] p-4 rounded-xl shadow text-purple-900">
            <h3 className="text-lg font-bold">Completed</h3>
            <p className="text-3xl font-bold">{stats?.completedTickets || 0}</p>
          </div>
        </div>
      )}

      {/* ✅ Kanban Preview Section */}
      {!loadingIssues && recentIssues.length > 0 && (
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-xl font-bold text-purple-700 mb-4">Kanban Preview (Latest Issues)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["To Do", "In Progress", "Done"].map((status) => (
              <div key={status} className="p-2 bg-purple-50 rounded shadow">
                <h3 className="font-semibold text-purple-800 mb-2">{status}</h3>
                {groupedTickets[status].slice(0, 3).map((ticket) => (
                  <div key={ticket._id} className="bg-white p-2 rounded shadow text-sm mb-2 text-purple-800">
                    {ticket.title}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ✅ Recent Issues Table */}
      <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
        <h2 className="text-xl font-bold text-purple-700 mb-4">Recent Issues</h2>

        {loadingIssues ? (
          <p className="text-purple-500">Loading recent issues...</p>
        ) : recentIssues.length === 0 ? (
          <p className="text-purple-500">No recent issues found.</p>
        ) : (
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-[#EAD6F9] text-left text-purple-800">
                <th className="p-2">Issue</th>
                <th className="p-2">Priority</th>
                <th className="p-2">Status</th>
                <th className="p-2">Assigned To</th>
                <th className="p-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {recentIssues.map((issue) => (
                <tr key={issue._id} className="border-b border-purple-100 text-purple-800">
                  <td className="p-2">{issue.title}</td>
                  <td className="p-2">{issue.priority}</td>
                  <td className="p-2">{issue.status}</td>
                  <td className="p-2">{issue.assignee?.name || "Unassigned"}</td>
                  <td className="p-2">{new Date(issue.createdAt).toISOString().split("T")[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default DashboardHome;
