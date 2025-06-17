import React from "react";

const Input = React.forwardRef(({ label, name, type = "text", value, onChange, placeholder, required }, ref) => (
  <div>
    <label className="block mb-1 font-medium text-sm">{label}</label>
    <input
      ref={ref}
      name={name}
      type={type}
      value={type === "file" ? undefined : value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full border border-gray-300 px-3 py-2 rounded-lg"
    />
  </div>
));

export default Input;
