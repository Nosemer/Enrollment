import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import API from "../../api/api"; // update this path if needed

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    document.title = "Manage Students";
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await API.get("/students/view"); // make sure this route exists
      setStudents(response.data);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };
  const filteredStudent = students.filter((s) =>
    s.email.toLowerCase().includes(searchTerm.toLowerCase())||
   s.first_name.toLowerCase().includes(searchTerm.toLowerCase())||
    s.last_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentStudent = filteredStudent.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredStudent.length / rowsPerPage);

  return (
        <div className="min-h-screen bg-[#F3DFBF] p-6 text-[#07004D]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        
      <h1 className="text-3xl font-bold mb-6">Manage Approved Students</h1>
  <div className="mb-4">
          <input
            type="text"
            placeholder="Search course..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-[#2D82B7] rounded-md w-full max-w-sm text-[#07004D] placeholder:text-[#999] bg-white focus:outline-none focus:ring-2 focus:ring-[#009857]"
          />
        </div>
      <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
        <table className="min-w-full text-sm text-left text-[#07004D]">
          <thead className="bg-[#2D82B7] text-white">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">First Name</th>
              <th className="px-6 py-3">Last Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Sex</th>
              <th className="px-6 py-3">Age</th>
              <th className="px-6 py-3">Birthday</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentStudent.map((student, index) => (
              <tr key={student.id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                <td className="px-6 py-4">{student.id}</td>
                <td className="px-6 py-4">{student.first_name}</td>
                <td className="px-6 py-4">{student.last_name}</td>
                <td className="px-6 py-4">{student.email}</td>
                <td className="px-6 py-4">{student.sex}</td>
                <td className="px-6 py-4">{student.age}</td>
                <td className="px-6 py-4">{student.birthday}</td>
                <td className="px-6 py-4 font-semibold uppercase text-green-600">{student.status}</td>
              </tr>
            ))}
            {currentStudent.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center px-6 py-4 text-gray-500">
                  No approved students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
           {totalPages > 1 && (
          <div className="flex justify-end mt-4 gap-2 text-[#07004D]">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-[#E8D9BA] hover:bg-[#DDC393] rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="self-center px-2 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-[#E8D9BA] hover:bg-[#DDC393] rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ManageStudents;
