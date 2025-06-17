import { useEffect, useState } from "react";
import { useAuth } from "../../api/authContext";
import API from "../../api/api";
import { motion } from "framer-motion";

const ViewGradeForm = () => {
  const { user } = useAuth();
  const [grades, setGrades] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const gradesPerPage = 5;

  useEffect(() => {
    document.title = "My Grades";
    if (user?.id) fetchGrades(user.id);
  }, [user]);

  const fetchGrades = async (studentId) => {
    try {
      const res = await API.get(`/students/${studentId}/grades`);
      setGrades(res.data);
    } catch (error) {
      console.error("Failed to fetch grades:", error);
    }
  };

  const groupBySemAndYear = (data) => {
    const grouped = {};
    data.forEach((item) => {
      const key = `Year ${item.year_level} - ${item.semester} Semester`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(item);
    });
    return grouped;
  };

  const groupedGrades = groupBySemAndYear(grades);
  const semGroups = Object.entries(groupedGrades);

  // Pagination logic
  const indexOfLast = currentPage * gradesPerPage;
  const indexOfFirst = indexOfLast - gradesPerPage;
  const currentSemGroup = semGroups.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(semGroups.length / gradesPerPage);

  return (
    <div className="min-h-screen flex flex-col bg-[#F3DFBF] text-[#07004D]">
      <div className="flex flex-1">
        <main className="flex-1 p-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-4">Student Grades</h1>

            {currentSemGroup.map(([group, items], index) => (
              <div key={index} className="mb-8">
                <h2 className="text-xl font-semibold mb-2">{group}</h2>
                <div className="overflow-x-auto shadow rounded-lg">
                  <table className="min-w-full bg-white text-[#07004D]">
                    <thead>
                      <tr className="bg-[#2D82B7] text-white">
                        <th className="py-2 px-4">Subject Code</th>
                        <th className="py-2 px-4">Subject Name</th>
                        <th className="py-2 px-4">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((g, idx) => (
                        <tr
                          key={idx}
                          className="border-t hover:bg-[#f4e8cf]"
                        >
                          <td className="py-2 px-4">{g.subject_code}</td>
                          <td className="py-2 px-4">{g.subject_name}</td>
                          <td className="py-2 px-4 font-semibold">{g.grade}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4 gap-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="bg-[#2D82B7] text-white px-4 py-2 rounded hover:bg-[#1b5d84] disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-lg font-medium mt-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="bg-[#2D82B7] text-white px-4 py-2 rounded hover:bg-[#1b5d84] disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default ViewGradeForm;
