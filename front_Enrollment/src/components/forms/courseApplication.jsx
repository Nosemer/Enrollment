import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import API from "../../api/api";
import ApplicationCard from "../cards/applicationCard";

const ITEMS_PER_PAGE = 6;

const Application = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    document.title = "Student Applications";
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await API.get("/application/view");
      setApplications(response.data);
    } catch (error) {
      console.error("❌ Error fetching applications:", error);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    const section = prompt("Enter section:");
    if (!section) return toast.error("Section is required.");

    try {
      await API.put(`/application/approve/${id}`, { status, section });
      toast.success("✅ Application updated successfully");
      fetchApplications();
    } catch (error) {
      console.error("❌ Error updating status:", error);
      toast.error("Failed to update status.");
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(applications.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentApplications = applications.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-[#F3DFBF] p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold mb-6 text-[#07004D] text-center">Student Applications</h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {currentApplications.length === 0 ? (
            <p className="col-span-full text-center text-gray-600">No applications found.</p>
          ) : (
            currentApplications.map((app) => {
              const isApproved = app.status === "approved";
              const isRejected = app.status === "rejected";

              return (
                <motion.div
                  key={app.application_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-xl p-5 shadow-lg border-2 transition-all duration-300 ${
                    isApproved
                      ? "bg-green-100 border-green-400"
                      : isRejected
                      ? "bg-red-100 border-red-400"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <h2 className="text-lg font-bold mb-2">
                    {app.student_Firstname} {app.student_lastname}
                  </h2>
                  <p className="text-sm text-gray-700"><strong>Email:</strong> {app.email}</p>
                  <p className="text-sm text-gray-700"><strong>Course:</strong> {app.course_name}</p>
                  <p className="text-sm text-gray-700"><strong>Year Level:</strong> {app.year_level}</p>
                  <p className="text-sm text-gray-700"><strong>Semester:</strong> {app.semester || "-"}</p>
                  <p className="text-sm text-gray-700"><strong>Status:</strong> {app.status}</p>
                  <p className="text-sm text-gray-700 mb-3">
                    <strong>Date:</strong> {new Date(app.application_date).toLocaleDateString()}
                  </p>

                  {app.status === "pending" ? (
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleUpdateStatus(app.application_id, "approved")}
                        className="bg-green-500 hover:bg-green-600 text-white rounded px-3 py-1"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(app.application_id, "rejected")}
                        className="bg-red-500 hover:bg-red-600 text-white rounded px-3 py-1"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <p className="italic text-sm text-gray-600">Already {app.status}</p>
                  )}

                  <button
                    onClick={() => setSelectedApp(app)}
                    className="mt-3 bg-blue-500 hover:bg-blue-600 text-white rounded px-3 py-1 w-full"
                  >
                    View Details
                  </button>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center items-center gap-2">
            <button
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => changePage(index + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-[#2D82B7] text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </motion.div>

      {/* Detail View */}
      <AnimatePresence>
        {selectedApp && (
          <ApplicationCard app={selectedApp} onClose={() => setSelectedApp(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Application;
