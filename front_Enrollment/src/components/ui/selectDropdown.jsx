// src/components/ui/SelectDropdown.jsx
const SelectDropdown = ({ label, name, value, onChange, options, required }) => {
  return (
    <div className="space-y-1">
      <label className="block font-medium text-sm">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border rounded-lg px-3 py-2"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectDropdown;
