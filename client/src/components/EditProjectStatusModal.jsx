import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function EditProjectStatusModal({ project, onClose, onUpdated }) {
  const [status, setStatus] = useState(project.status);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/projects/${project._id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Project status updated");
      onUpdated();
      onClose();
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow w-full max-w-md text-purple-900">
        <h2 className="text-xl font-bold text-purple-800 mb-4">Edit Project Status</h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-purple-300 p-2 rounded"
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-purple-500 text-white hover:bg-purple-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProjectStatusModal;
