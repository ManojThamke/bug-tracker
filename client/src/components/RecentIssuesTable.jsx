import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function RecentIssuesTable() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentIssues();
  }, []);

  const fetchRecentIssues = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/dashboard/recent-issues", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setIssues(res.data);
    } catch {
      toast.error("Error loading recent issues");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 mt-6 overflow-x-auto">
      <h2 className="text-xl font-bold text-purple-700 mb-4">Recent Issues</h2>

      {loading ? (
        <p className="text-purple-500">Loading...</p>
      ) : issues.length === 0 ? (
        <p className="text-purple-500">No recent issues.</p>
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
            {issues.map((issue) => (
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
  );
}

export default RecentIssuesTable;
