import { motion } from "framer-motion";

function ConfirmDeleteModal({ title = "Are you sure?", onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white p-6 rounded-xl shadow w-full max-w-sm text-purple-900"
      >
        <h2 className="text-lg font-bold text-purple-800 mb-3">{title}</h2>
        <p className="text-sm text-purple-600 mb-5">
          This action <strong>cannot be undone</strong>.
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Yes, Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default ConfirmDeleteModal;
