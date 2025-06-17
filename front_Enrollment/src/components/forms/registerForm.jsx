import { useState, useRef  } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Input from "../ui/Input";
import SelectDropdown from "../ui/SelectDropdown";
import Button from "../ui/buttons";
import API from "../../api/api";

const RegisterForm = ({ role = "student" }) => {
  const isAdmin = role === "admin";
  const fileInputRef = useRef(null);
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    sex: "",
    age: "",
    birthday: "",
  });

  const [profileIdFile, setProfileIdFile] = useState(null); // ✅ file in separate state
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    // Append regular fields
    for (const key in values) {
      formData.append(key, values[key]);
    }

    // Append the file field
    if (profileIdFile) {
      formData.append("profile_id", profileIdFile);
    }

    try {
      const endpoint = isAdmin ? "/admins/register" : "/students/register";
      const res = await API.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

    console.log("Register success response:", res.data); // 👈 Add this
    toast.success(res.data.message || "Registered successfully!");
    setProfileIdFile(profileIdFile); // ✅ reset file
    setProfileIdFile(null); // clear the state

// ✅ This is what actually clears the file input
if (fileInputRef.current) {
  fileInputRef.current.value = "";
}

      // Reset fields
      setValues({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        sex: "",
        age: "",
        birthday: "",
      });
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      toast.error("Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className="min-h-screen flex items-center justify-center bg-[#F3DFBF] p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
      >
         <h2 className="text-2xl font-bold text-[#07004D] text-center mb-6 capitalize">
          {role} Register
        </h2>

    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="max-w-md mx-auto space-y-4"
    >
      <h2 className="text-xl font-semibold text-center">
        {isAdmin ? "Admin Registration" : "Student Registration"}
      </h2>

     <Input
        label="Profile ID"
        name="profile_id"
        type="file"
        ref={fileInputRef} // ✅ here
        onChange={(e) => setProfileIdFile(e.target.files[0])}
        required
      />

      <Input
        label="First Name"
        name="first_name"
        value={values.first_name}
        onChange={handleChange}
        placeholder="Enter first name"
        required
      />

      <Input
        label="Last Name"
        name="last_name"
        value={values.last_name}
        onChange={handleChange}
        placeholder="Enter last name"
        required
      />

      <Input
        label="Email"
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Enter email"
        required
      />

      <Input
        label="Password"
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        placeholder="Create a password"
        required
      />

      <SelectDropdown
        label="Sex"
        name="sex"
        value={values.sex}
        onChange={handleChange}
        options={[
          { value: "Male", label: "Male" },
          { value: "Female", label: "Female" },
        ]}
        required
      />

      <Input
        label="Age"
        name="age"
        type="number"
        value={values.age}
        onChange={handleChange}
        placeholder="Enter age"
        required
      />

      <Input
        label="Birthday"
        name="birthday"
        type="date"
        value={values.birthday}
        onChange={handleChange}
        required
      />

      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </Button>

      {message && <p className="text-sm text-center text-gray-600">{message}</p>}
    </form>
    </motion.div>
    </div>
  );
};

export default RegisterForm;
