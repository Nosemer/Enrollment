const DateInput = ({ label, name, value, onChange, required = false }) => (
  <div className="mb-4">
    <label className="block mb-1 font-medium">{label}</label>
    <input
      type="date"
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
    />
  </div>
);

export default DateInput;
