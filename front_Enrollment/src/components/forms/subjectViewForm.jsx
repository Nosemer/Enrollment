import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import API from "../../api/api";
import EditModal from "../modals/editModal";
import DeleteConfirmationModal from "../modals/deleteModal"

const ViewSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
const [subjectToDelete, setSubjectToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await API.get("/subjects/view");
      setSubjects(response.data);
    } catch (error) {
      toast.error("Failed to fetch subjects");
    }
  };

  const handleEditClick = (subject) => {
    setCurrentEdit(subject);
    setEditModalOpen(true);
  };

  const handleUpdate = async (updatedData) => {
    try {
      await API.put(`/subjects/edit/${updatedData.id}`, updatedData);
      toast.success("Subject updated!");
      fetchSubjects();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await API.delete(`/subjects/delete/${id}`);
      console.log(res.data)
      toast.success("Subject deleted");
      fetchSubjects();
      setDeleteModalOpen(false)
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const fields = [
    { name: "subject_code", label: "Subject Code", required: true },
    { name: "subject_name", label: "Subject Name", required: true },
    { name: "units", label: "Units", required: true },
    { name: "course_id", label: "Course ID", required: true },
    { name: "year_level", label: "Year Level", required: true }
  ];

const filteredSubject = subjects.filter((s) =>
    s.subject_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
    const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
   const currentSubject = filteredSubject.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredSubject.length / rowsPerPage);
  return (
    <div className="min-h-screen bg-[#F3DFBF] p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-bold mb-4 text-[#07004D]">Manage Subjects</h1>
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
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2 border">#</th>
                <th className="p-2 border">Subject Code</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Units</th>
                <th className="p-2 border">Course ID</th>
                <th className="p-2 border">Year</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentSubject.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-6">
                    No subjects found.
                  </td>
                </tr>
              ) : (
                currentSubject.map((subj, index) => (
                  <tr key={subj.id} className="hover:bg-gray-50">
                    <td className="p-2 border text-center">{index + 1}</td>
                    <td className="p-2 border">{subj.subject_code}</td>
                    <td className="p-2 border">{subj.subject_name}</td>
                    <td className="p-2 border">{subj.units}</td>
                    <td className="p-2 border">{subj.course_id}</td>
                    <td className="p-2 border">{subj.year_level}</td>
                    <td className="p-2 border space-y-1">
                      <button
                        onClick={() => handleEditClick(subj)}
                        className="bg-green-500 text-white px-2 py-1 rounded w-full"
                      >
                        Edit
                      </button>
                     <button
                      onClick={() => {
                        setSubjectToDelete(subj);
                        setDeleteModalOpen(true);
                      }}
                      className="bg-red-500 text-white px-2 py-1 rounded w-full"
                    >
                      Delete
                    </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Edit Modal */}
      <EditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleUpdate}
        fields={fields}
        initialValues={currentEdit}
      />
      <DeleteConfirmationModal
          isOpen={deleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false);
            setSubjectToDelete(null);
          }}
          onConfirm={handleDelete}
          subject={subjectToDelete}
        />

    </div>
  );
};

export default ViewSubjects;
