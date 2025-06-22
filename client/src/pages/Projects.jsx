import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import EditProjectStatusModal from "../components/EditProjectStatusModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import InviteTeamModal from "../components/InviteTeamModal";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [deletingProjectId, setDeletingProjectId] = useState(null);
  const [inviteProjectId, setInviteProjectId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [projects, searchTerm]);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data);
      setLoading(false);
    } catch {
      toast.error("❌ Failed to load projects");
      setLoading(false);
    }
  };

  const handleFilter = () => {
    const filtered = projects.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(filtered);
    setCurrentPage(1);
  };

  const handleDeleteConfirmed = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/projects/${deletingProjectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("✅ Project deleted");
      fetchProjects();
    } catch {
      toast.error("❌ Failed to delete project");
    } finally {
      setDeletingProjectId(null);
    }
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-purple-800">My Projects</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="🔍 Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:w-1/2 p-2 border border-purple-300 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-purple-400 hover:bg-purple-50"
      />

      {loading ? (
        <p className="text-purple-600">Loading projects...</p>
      ) : filteredProjects.length === 0 ? (
        <p className="text-purple-500">No projects found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full table-auto text-purple-800">
            <thead>
              <tr className="bg-[#EAD6F9] text-left">
                <th className="p-2">Title</th>
                <th className="p-2">Status</th>
                <th className="p-2">Progress</th>
                <th className="p-2">Created</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProjects.map((project) => (
                <ProjectRow
                  key={project._id}
                  project={project}
                  onDelete={() => setDeletingProjectId(project._id)}
                  onEdit={() => setEditingProject(project)}
                  onInvite={() => setInviteProjectId(project._id)}
                />
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 py-3 text-purple-800">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${currentPage === i + 1
                    ? "bg-purple-500 text-white"
                    : "bg-purple-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      {editingProject && (
        <EditProjectStatusModal
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onUpdated={fetchProjects}
        />
      )}

      {deletingProjectId && (
        <ConfirmDeleteModal
          title="Are you sure you want to delete this project?"
          onCancel={() => setDeletingProjectId(null)}
          onConfirm={handleDeleteConfirmed}
        />
      )}

      {inviteProjectId && (
        <InviteTeamModal
          projectId={inviteProjectId}
          onClose={() => setInviteProjectId(null)}
          onInvited={fetchProjects}
        />
      )}
    </div>
  );
}

function ProjectRow({ project, onDelete, onEdit, onInvite }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5000/api/projects/${project._id}/progress`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProgress(res.data.progress);
    } catch {
      setProgress(0);
    }
  };

  return (
    <tr className="border-b border-purple-100">
      <td className="p-2">{project.title}</td>
      <td className="p-2 font-semibold">{project.status}</td>
      <td className="p-2">
        <div className="w-full bg-purple-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-pink-400 to-purple-500 h-3 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="text-xs text-purple-700">{progress}%</span>
      </td>
      <td className="p-2">{new Date(project.createdAt).toISOString().split("T")[0]}</td>
      <td className="p-2 flex gap-2 text-xs md:text-sm">
        <button onClick={onEdit} className="text-purple-600 hover:underline">Edit</button>
        <button onClick={onDelete} className="text-red-500 hover:underline">Delete</button>
        <button onClick={onInvite} className="text-purple-500 hover:underline">Invite</button>
      </td>
    </tr>
  );
}

export default Projects;
