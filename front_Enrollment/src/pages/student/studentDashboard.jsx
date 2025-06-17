import { useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "../../components/layout/sidebar";
import Header from "../../components/layout/header";

const StudentDashboard = () => {
  useEffect(() => {
    document.title = "Student Dashboard";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-cream">
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
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-dark mb-6">Welcome, Student</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow text-dark">
                <h2 className="text-lg font-semibold mb-2">Total Courses</h2>
                <p className="text-blueish text-3xl font-bold">12</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow text-dark">
                <h2 className="text-lg font-semibold mb-2">Enrolled</h2>
                <p className="text-blueish text-3xl font-bold">8</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow text-dark">
                <h2 className="text-lg font-semibold mb-2">Pending Grades</h2>
                <p className="text-blueish text-3xl font-bold">4</p>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
