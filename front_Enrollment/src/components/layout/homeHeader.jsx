import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomeHeader = () => {
  const [role, setRole] = useState(""); // Empty by default so user must pick
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
    if (selectedRole) {
      navigate(`/${selectedRole}s/login`);
    }
  };

  return (
    <header className="bg-[#2D82B7] text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">
        MySchool Enrollment Management System
      </h1>

      <div className="relative">
        <select
          value={role}
          onChange={handleRoleChange}
          className="appearance-none text-[#2D82B7] bg-white rounded px-3 py-2 outline-none cursor-pointer pr-8"
        >
          <option value="">Select Role</option>
          <option value="student">Student Login</option>
          <option value="admin">Admin Login</option>
        </select>
        {/* Down arrow icon */}
        <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
          <svg
            className="w-4 h-4 text-[#2D82B7]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
