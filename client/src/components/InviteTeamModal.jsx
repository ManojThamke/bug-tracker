import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function InviteTeamModal({ projectId, onClose, onInvited }) {
    const [email, setEmail] = useState("");

    const handleInvite = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.post(`http://localhost:5000/api/projects/${projectId}/invite`,
                { email },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success(`User invited successfully`);
            setEmail("");
            onInvited();
            onClose();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to invite user");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl shadow w-full max-w-md text-purple-900 space-y-4">
                <h2 className="text-xl font-bold text-purple-800">Invite Team Member</h2>

                <form onSubmit={handleInvite} className="space-y-3">
                    <input
                        type="email"
                        placeholder="Enter user's email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-purple-300 rounded p-2"
                        required
                    />
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
                            Invite
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default InviteTeamModal;
