import { useEffect, useState } from "react";
import axios from "axios";

function ProjectProgressBar({ projectId }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`http://localhost:5000/api/projects/${projectId}/progress`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProgress(res.data.progress);
  };

  return (
    <div className="w-full bg-purple-100 rounded-full h-4 mt-2 overflow-hidden">
      <div
        className="bg-gradient-to-r from-pink-400 to-purple-500 h-4 rounded-full text-xs text-white text-center"
        style={{ width: `${progress}%` }}
      >
        {progress}%
      </div>
    </div>
  );
}

export default ProjectProgressBar;
