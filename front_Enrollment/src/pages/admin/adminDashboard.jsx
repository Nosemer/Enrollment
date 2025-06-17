import { useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "../../components/layout/sidebar";
import Header from "../../components/layout/header";

const AdminDashboard = () => {
  useEffect(() => {
    document.title = "Admin Dashboard";
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
          <h1 className="text-3xl font-bold text-dark mb-6">Welcome, Admin</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow text-dark">
              <h2 className="text-lg font-semibold mb-2">Total Students</h2>
              <p className="text-blueish text-3xl font-bold">120</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow text-dark">
              <h2 className="text-lg font-semibold mb-2">Pending Applications</h2>
              <p className="text-blueish text-3xl font-bold">15</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow text-dark">
              <h2 className="text-lg font-semibold mb-2">Available Courses</h2>
              <p className="text-blueish text-3xl font-bold">32</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
    </div>
  );
};

export default AdminDashboard;
