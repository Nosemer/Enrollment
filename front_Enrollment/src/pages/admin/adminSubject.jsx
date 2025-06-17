import { useEffect } from "react";
import { motion } from "framer-motion";
import AddSubject from "../../components/forms/subjectAddForm";
import ViewSubjects from "../../components/forms/subjectViewForm"
import Sidebar from "../../components/layout/sidebar";
import Header from "../../components/layout/header";

const AdminSubject = () => {
  useEffect(() => {
    document.title = "Subject";
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
            <h1 className="text-3xl font-bold text-dark mb-6">Manage Subjects</h1>

            <div className="w-full">
                <AddSubject />
            </div>
              <div className="w-full">
                <ViewSubjects />
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminSubject;
