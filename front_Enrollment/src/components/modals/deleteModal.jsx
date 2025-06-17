import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/buttons";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, subject }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 text-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <h2 className="text-xl font-bold text-[#07004D] mb-4">Confirm Deletion</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete <strong>{subject?.subject_name}</strong>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-black"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
                onClick={onConfirm}
              >
                Yes, Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmationModal;
