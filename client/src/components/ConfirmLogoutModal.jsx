import { motion } from "framer-motion";

function ConfirmLogoutModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white p-6 rounded-xl shadow w-full max-w-sm text-purple-900"
      >
        <h2 className="text-xl font-bold mb-4 text-purple-800">Logout?</h2>
        <p className="text-purple-600 mb-6">Are you sure you want to logout?</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-200 text-purple-800 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600"
          >
            Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default ConfirmLogoutModal;
