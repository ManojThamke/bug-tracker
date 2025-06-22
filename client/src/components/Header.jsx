import { useLocation } from "react-router-dom";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  const getPageTitle = () => {
    if (location.pathname.includes("dashboard")) return "Dashboard";
    if (location.pathname.includes("projects")) return "My Projects";
    if (location.pathname.includes("create-project")) return "Create Project";
    if (location.pathname.includes("assigned-issues")) return "Assigned Issues";
    if (location.pathname.includes("kanban")) return "Kanban Board";
    if (location.pathname.includes("filter-search")) return "Filter & Search";
    if (location.pathname.includes("settings")) return "Settings";
    return "Home";
  };

  return (
    <div className="flex justify-between items-center bg-[#F9EAF5] p-4 border-b border-purple-200">
      {/* Breadcrumb title */}
      <div className="text-purple-700 font-semibold text-lg">Home / {getPageTitle()}</div>

      <div className="flex items-center space-x-4">
        <select className="border border-purple-300 rounded p-1 bg-white text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400">
          <option>Select Project</option>
        </select>

        <div className="flex items-center space-x-2">
          <div className="bg-purple-200 rounded-full w-8 h-8 flex justify-center items-center text-purple-800 font-bold">
            {user?.name[0]?.toUpperCase() || "U"}
          </div>
          <div className="text-purple-800 text-sm text-right">
            <p className="font-semibold leading-tight">{user?.name}</p>
            <p className="text-xs text-purple-500">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
