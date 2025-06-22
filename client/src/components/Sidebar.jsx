import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmLogoutModal from "./ConfirmLogoutModal";
import { toast } from "react-toastify";

function Sidebar() {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="w-64 h-screen bg-[#F9EAF5] text-purple-900 p-5 space-y-4 shadow">
      <h2 className="text-2xl font-bold mb-8 text-purple-700">IssueTracker</h2>

      <nav className="space-y-2 font-medium">
        <Link to="/dashboard" className="block p-2 rounded hover:bg-[#EAD6F9]">Dashboard</Link>
        <Link to="/projects" className="block p-2 rounded hover:bg-[#EAD6F9]">My Projects</Link>
        <Link to="/create-project" className="block p-2 rounded hover:bg-[#EAD6F9]">Create Project</Link>
        <Link to="/assigned-issues" className="block p-2 rounded hover:bg-[#EAD6F9]">Assigned Issues</Link>
        <Link to="/create-ticket" className="block p-2 rounded hover:bg-[#EAD6F9]">Create Ticket</Link>
        <Link to="/kanban" className="block p-2 rounded hover:bg-[#EAD6F9]">Kanban Board</Link>
        <Link to="/filter-search" className="block p-2 rounded hover:bg-[#EAD6F9]">Filter/Search</Link>
        <Link to="/settings" className="block p-2 rounded hover:bg-[#EAD6F9]">Settings</Link>

        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="block w-full text-left p-2 rounded hover:bg-[#EAD6F9] text-red-500 font-semibold"
        >
          Logout
        </button>
      </nav>

      {showLogoutConfirm && (
        <ConfirmLogoutModal
          onCancel={() => setShowLogoutConfirm(false)}
          onConfirm={handleLogout}
        />
      )}
    </div>
  );
}

export default Sidebar;
