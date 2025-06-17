import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../api/authContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Input from "../ui/Input";
import Button from "../ui/buttons";
import API from "../../api/api";

const Application = () => {
  const { user } = useAuth();
  const [course, setCourse] = useState([]);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    student_id: user?.id || "",
    course_id: "",
    year_level: "",
    last_school: "",
    semester: "",
    year_graduated: "",
  });

  const [requirement, setRequirement] = useState({
    valid_Id: null,
    Birth_certificate: null,
    form138: null,
    good_moral: null,
  });

  useEffect(() => {
    fetchCourses();
    if (user?.id) {
      setValues((prev) => ({ ...prev, student_id: user.id }));
    }
  }, [user]);

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses/view");
      setCourse(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleCourseChange = (e) => {
    setValues((prev) => ({ ...prev, course_id: e.target.value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setRequirement((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.entries(values).forEach(([key, val]) => formData.append(key, val));
    Object.entries(requirement).forEach(([key, val]) => formData.append(key, val));

    try {
      const res = await API.post("/application/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res.data.message || "Application submitted!");
      if (fileInputRef.current) fileInputRef.current.value = "";

      setValues({
        student_id: user?.id || "",
        course_id: "",
        year_level: "",
        last_school: "",
        semester: "",
        year_graduated: "",
      });

      setRequirement({
        valid_Id: null,
        Birth_certificate: null,
        form138: null,
        good_moral: null,
      });

    } catch (err) {
      toast.error("Submission failed.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3DFBF] p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl"
      >
        <h2 className="text-3xl font-bold text-[#07004D] text-center mb-6">
          Student Application Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          {/* Course Dropdown */}
          <div>
            <label className="block mb-1 text-[#07004D] font-medium">Select Course</label>
            <select
              name="course_id"
              value={values.course_id}
              onChange={handleCourseChange}
              required
              className="w-full px-4 py-2 border rounded-lg text-[#07004D] bg-[#F3DFBF] focus:outline-none focus:ring-2 focus:ring-[#2D82B7]"
            >
              <option value="">Choose a course</option>
              {course.map((c) => (
                <option key={c.course_id} value={c.course_id}>
                  {c.course_name}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Year Level"
            name="year_level"
            value={values.year_level}
            onChange={handleChange}
            placeholder="Ex. 1st Year"
            required
          />

          <Input
            label="Last School Attended"
            name="last_school"
            value={values.last_school}
            onChange={handleChange}
            placeholder="Ex. ABC High School"
            required
          />

          <Input
            label="Semester (Format: (2024, 1))"
            name="semester"
            value={values.semester}
            onChange={handleChange}
            pattern="\(\d{4},\s[12]\)"
            title="Format must be like (2024, 1)"
            required
          />

          <Input
            label="Year Graduated"
            name="year_graduated"
            value={values.year_graduated}
            onChange={handleChange}
            placeholder="Ex. 2023"
            required
          />

          <hr className="my-4 border-[#2D82B7]" />

          {/* File Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Valid ID", name: "valid_Id" },
              { label: "Birth Certificate", name: "Birth_certificate" },
              { label: "Form 138", name: "form138" },
              { label: "Good Moral", name: "good_moral" },
            ].map(({ label, name }) => (
              <div key={name}>
                <label className="block mb-1 text-[#07004D] font-medium">{label}</label>
                <input
                  type="file"
                  name={name}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  required
                  className="w-full text-sm bg-[#F3DFBF] p-2 border border-[#2D82B7] rounded-lg"
                />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="bg-[#009857] hover:bg-[#16FFB6] text-white font-semibold px-4 py-2 rounded-lg mt-4 w-full"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default Application;
