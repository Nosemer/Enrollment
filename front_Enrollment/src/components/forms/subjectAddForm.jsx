import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import API from "../../api/api";
import Input from "../ui/Input";
import Button from "../ui/buttons";

const AddSubject = ({ onSubjectAdded }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    course_id: "",
    subject_code: "",
    subject_name: "",
    units: "",
    year_level: ""
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses/view");
      setCourses(res.data);
    } catch (err) {
      toast.error("Failed to load courses");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/subjects/add", values);
      toast.success("Subject added!");
      setValues({
        course_id: "",
        subject_code: "",
        subject_name: "",
        units: "",
        year_level: ""
      });
      onSubjectAdded?.(); // refresh table if passed
    } catch (err) {
      toast.error("Failed to add subject.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-bold mb-4 text-[#07004D]">Add Subject</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Course</label>
          <select
            name="course_id"
            value={values.course_id}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c.course_id} value={c.course_id}>
                {c.course_name}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Subject Code"
          name="subject_code"
          value={values.subject_code}
          onChange={handleChange}
          placeholder="e.g. CS101"
          required
        />
        <Input
          label="Subject Name"
          name="subject_name"
          value={values.subject_name}
          onChange={handleChange}
          placeholder="e.g. Computer Programming"
          required
        />
        <Input
          label="Units"
          name="units"
          value={values.units}
          onChange={handleChange}
          placeholder="e.g. 3"
          required
        />
        <Input
          label="Year Level"
          name="year_level"
          value={values.year_level}
          onChange={handleChange}
          placeholder="e.g. 1"
          required
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Add Subject"}
        </Button>
      </form>
    </div>
  );
};

export default AddSubject;
