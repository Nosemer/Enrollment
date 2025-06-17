import { useState, useEffect } from "react";
import { useAuth } from '../../api/authContext';
import { motion } from "framer-motion";
import API from "../../api/api";
import Sidebar from "../../components/layout/sidebar";
import Header from "../../components/layout/header";

const StudentStatus = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    document.title = "Student Status";
    if (user?.id) {
      fetchStatus(user.id);
    }
  }, [user]);

  const fetchStatus = async (id) => {
    try {
      const response = await API.get(`/student-portal/status/${id}`);
      const dataArray = Array.isArray(response.data) ? response.data : [response.data];
      setData(dataArray);
    } catch (error) {
      console.error("Error fetching Status:", error);
    }
  };

  const getStatusColor = (status) => {
    const lower = status.toLowerCase();
    if (lower === "approved") return "#009857";       // primary green
    if (lower === "rejected") return "#E74C3C";       // red
    return "#F39C12";                                 // yellow/orange for pending or others
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F3DFBF] text-[#07004D]">
      {/* Top Header */}
      <Header />

      {/* Body Section: Sidebar + Main Content */}
      <div className="flex flex-1">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-[#07004D] mb-6">Student Status</h1>

            {data.length === 0 ? (
              <p className="text-center text-lg">No records found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl shadow-lg text-white"
                    style={{ backgroundColor: getStatusColor(item.status) }}
                  >
                    <h2 className="text-lg font-bold mb-1">
                      {item.firstName} {item.lastName}
                    </h2>
                    <p className="text-sm font-medium uppercase tracking-wide">
                      Status: {item.status}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default StudentStatus;
