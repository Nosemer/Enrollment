import { useState, useEffect } from "react";
import API from "../../api/api";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const AddGradeForm = () => {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({
    student_id: "",
    subject_id: "",
    grade: "",
    remarks: "",
  });

  useEffect(() => {
    fetchStudents();
    fetchSubjects();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await API.get("/students/view");
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const fetchSubjects = async () => {
    try {
      const res = await API.get("/subjects/view");
      setSubjects(res.data);
    } catch (err) {
      console.error("Error fetching subjects:", err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/grades/add", formData);
      toast.success("Grade saved successfully!");
      setFormData({
        student_id: "",
        subject_id: "",
        grade: "",
        remarks: "",
      });
    } catch (err) {
      console.error("Error adding grade:", err);
      toast.error("Failed to save grade.");
    }
  };

  // Group students by course and section
  const groupedStudents = students.reduce((groups, student) => {
    const course = student.course || "Unknown Course";
    const section = student.section || "Unknown Section";
    const groupKey = `${course} - ${section}`;
    if (!groups[groupKey]) groups[groupKey] = [];
    groups[groupKey].push(student);
    return groups;
  }, {});

  return (
    <div className="min-h-screen bg-[#F3DFBF] p-6 text-[#07004D]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4">Add Student Grade</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Student Dropdown */}
          <div>
            <label className="block font-medium mb-1">Student</label>
            <select
              name="student_id"
              value={formData.student_id}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none"
            >
              <option value="">Select student</option>
              {Object.entries(groupedStudents).map(([group, groupStudents]) => (
                <optgroup key={group} label={group}>
                  {groupStudents.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.first_name} {student.last_name} ({student.email})
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Subject Dropdown */}
          <div>
            <label className="block font-medium mb-1">Subject</label>
            <select
              name="subject_id"
              value={formData.subject_id}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none"
            >
              <option value="">Select subject</option>
              {subjects.map((subj) => (
                <option key={subj.id} value={subj.id}>
                  {subj.subject_code} - {subj.subject_name}
                </option>
              ))}
            </select>
          </div>

          {/* Grade Input */}
          <div>
            <label className="block font-medium mb-1">Grade</label>
            <input
              type="number"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              step="0.01"
              min="0"
              max="100"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none"
            />
          </div>

          {/* Remarks Input */}
          <div>
            <label className="block font-medium mb-1">Remarks</label>
            <input
              type="text"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="e.g. Passed, Failed"
              className="w-full px-4 py-2 border rounded focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="bg-[#2D82B7] text-white px-6 py-2 rounded hover:bg-[#23648E]"
          >
            Save Grade
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddGradeForm;
