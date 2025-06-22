import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { motion, AnimatePresence } from "framer-motion";
import EditTicketModal from "../components/EditTicketModal";

function Kanban() {
  const [tickets, setTickets] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingTicket, setEditingTicket] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedProjectId) fetchTickets(selectedProjectId);
  }, [selectedProjectId]);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data);
      if (res.data.length > 0) setSelectedProjectId(res.data[0]._id);
    } catch {
      toast.error("Error loading projects");
    }
  };

  const fetchTickets = async (projectId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5000/api/tickets/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(res.data);
    } catch {
      toast.error("Error loading tickets");
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination || source.droppableId === destination.droppableId) return;

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/tickets/${draggableId}`,
        { status: destination.droppableId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTickets(selectedProjectId);
    } catch {
      toast.error("Failed to update ticket status");
    }
  };

  const handleDelete = async (ticketId) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/tickets/${ticketId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Ticket Deleted");
      fetchTickets(selectedProjectId);
    } catch {
      toast.error("Failed to delete ticket");
    }
  };

  const groupedTickets = {
    "To Do": tickets.filter((t) => t.status === "To Do"),
    "In Progress": tickets.filter((t) => t.status === "In Progress"),
    Done: tickets.filter((t) => t.status === "Done"),
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-purple-800">Kanban Board</h2>

      <select
        value={selectedProjectId}
        onChange={(e) => setSelectedProjectId(e.target.value)}
        className="border p-2 rounded text-purple-900 border-purple-300"
      >
        {projects.map((p) => (
          <option key={p._id} value={p._id}>
            {p.title}
          </option>
        ))}
      </select>

      {loading ? (
        <p className="text-purple-600">Loading tickets...</p>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["To Do", "In Progress", "Done"].map((status) => (
              <Droppable key={status} droppableId={status}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`p-4 rounded-xl min-h-[250px] transition-colors ${
                      snapshot.isDraggingOver ? "bg-purple-300" : "bg-[#F9D7F9]"
                    } shadow`}
                  >
                    <h3 className="text-lg font-bold text-purple-800 mb-2">{status}</h3>

                    <AnimatePresence>
                      {groupedTickets[status].map((ticket, index) => (
                        <Draggable key={ticket._id} draggableId={ticket._id} index={index}>
                          {(provided) => (
                            <motion.div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="p-3 rounded border border-purple-300 bg-[#FDF1C7] text-purple-900 mb-2 cursor-grab"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{ duration: 0.2 }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <h4 className="font-medium">{ticket.title}</h4>
                              <p className="text-x text-purple-500">{ticket.priority}</p>

                              <div className="flex justify-between items-center mt-2 text-x text-purple-500">
                                <button
                                  onClick={() => handleDelete(ticket._id)}
                                  className="hover:text-red-500 font-semibold"
                                >
                                  🗑️ Delete
                                </button>
                                <button
                                  onClick={() => setEditingTicket(ticket)}
                                  className="hover:text-purple-800 font-semibold"
                                >
                                  ✏️ Edit
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </Draggable>
                      ))}
                    </AnimatePresence>

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      )}

      <AnimatePresence>
        {editingTicket && (
          <EditTicketModal
            ticket={editingTicket}
            onClose={() => setEditingTicket(null)}
            onUpdated={() => fetchTickets(selectedProjectId)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Kanban;
