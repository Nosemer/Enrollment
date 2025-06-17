// src/components/cards/ApplicationDetailCard.jsx
import { motion } from "framer-motion";

const ApplicationCard = ({ app, onClose }) => {
  if (!app) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-lg p-6 w-full max-w-3xl grid grid-cols-2 gap-4"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="col-span-2 text-lg font-semibold mb-2">Application Details</h2>
        <div><strong>Full Name:</strong> {app.student_Firstname} {app.student_lastname}</div>
        <div><strong>Email:</strong> {app.email}</div>
        <div><strong>Course:</strong> {app.course_name}</div>
        <div><strong>Year Level:</strong> {app.year_level}</div>
        <div><strong>Semester:</strong> {app.semester}</div>
        <div><strong>Status:</strong> {app.status}</div>
        <div><strong>Section:</strong> {app.section || "-"}</div>
        <div><strong>Last School:</strong> {app.last_school}</div>
        <div><strong>Year Graduated:</strong> {app.year_graduated}</div>

        <div className="col-span-2"><strong>Documents:</strong></div>
        <div><a href={`/upload/${app.valid_Id}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Valid ID</a></div>
        <div><a href={`/upload/${app.Birth_certificate}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Birth Certificate</a></div>
        <div><a href={`/upload/${app.form138}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Form 138</a></div>
        <div><a href={`/upload/${app.good_moral}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Good Moral</a></div>

        <div className="col-span-2 text-right mt-4">
          <button onClick={onClose} className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ApplicationCard;
