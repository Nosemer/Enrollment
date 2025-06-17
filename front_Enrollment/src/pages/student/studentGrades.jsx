import { useEffect } from "react";
import { motion } from "framer-motion";
import ViewGradeForm from "../../components/forms/gradesForm";
import Sidebar from "../../components/layout/sidebar";
import Header from "../../components/layout/header";

const StudentGrades = () => {
  useEffect(() => {
    document.title = "Student Application";
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
            <h1 className="text-3xl font-bold text-dark mb-6">Submit Application</h1>

            <div className="w-full">
                <ViewGradeForm />
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default StudentGrades;
