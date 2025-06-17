import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import API from "../../api/api";
import ApplicationCard from "../cards/applicationCard";

const Courses = () => {
  const [course, setCourse] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    document.title = "College Courses";
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await API.get("/courses/view");
      setCourse(response.data);
    } catch (error) {
      console.error("❌ Error fetching Courses:", error);
    }
  };

  const handleAddCourse = async () => {
    const course_name = prompt("Enter New Course:");
    if (!course_name) return toast.error("Course is required.");

    try {
      await API.post(`/courses/add`, { course_name });
      toast.success("✅ Course added successfully");
      fetchCourses();
    } catch (error) {
      console.error("❌ Error adding new course:", error);
      toast.error("Failed to add new course.");
    }
  };

  const handleUpdateCourse = async (id) => {
    const course_name = prompt("Enter Updated Course:");
    if (!course_name) return toast.error("Course is required.");

    try {
      await API.put(`/courses/edit/${id}`, { course_name });
      toast.success("✅ Course updated successfully");
      fetchCourses();
    } catch (error) {
      console.error("❌ Error updating course:", error);
      toast.error("Failed to update course.");
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await API.delete(`/courses/delete/${id}`);
      toast.success("✅ Course deleted successfully");
      fetchCourses();
    } catch (error) {
      console.error("❌ Error deleting course:", error);
      toast.error("Failed to delete course.");
    }
  };

  const filteredCourses = course.filter((c) =>
    c.course_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredCourses.length / rowsPerPage);

  return (
    <div className="min-h-screen bg-[#F3DFBF] p-6 text-[#07004D]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold mb-4 text-[#07004D]">College Courses</h1>

        {/* Search */}
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

        {/* Table */}
        <div className="overflow-x-auto shadow-lg rounded-lg border border-[#2D82B7]">
          <table className="min-w-full bg-white text-sm text-[#07004D]">
            <thead className="bg-[#2D82B7] text-white">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Course</th>
                <th className="px-4 py-2">
                  <button
                    onClick={handleAddCourse}
                    disabled={loading}
                    className="bg-[#009857] hover:bg-[#16FFB6] text-white font-semibold py-1 px-4 rounded-md transition duration-200 w-full"
                  >
                    Add
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentCourses.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-[#07004D]">
                    No courses found.
                  </td>
                </tr>
              ) : (
                currentCourses.map((crs, index) => (
                  <tr key={crs.course_id} className="hover:bg-[#F3DFBF] border-t border-[#e0e0e0]">
                    <td className="px-4 py-2">{indexOfFirstRow + index + 1}</td>
                    <td className="px-4 py-2">{crs.course_name}</td>
                    <td className="px-4 py-2 space-y-2">
                      <button
                        onClick={() => handleUpdateCourse(crs.course_id)}
                        className="bg-[#2D82B7] hover:bg-[#1d6094] text-white px-2 py-1 rounded w-full"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(crs.course_id)}
                        className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded w-full"
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

        {/* Pagination */}
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

      <AnimatePresence>
        {selectedCourse && (
          <ApplicationCard app={selectedCourse} onClose={() => setSelectedCourse(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Courses;
