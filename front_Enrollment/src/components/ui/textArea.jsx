const TextArea = ({ label, name, value, onChange, placeholder }) => (
  <div className="mb-4">
    {label && <label htmlFor={name} className="block mb-1 font-medium">{label}</label>}
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-md h-32 resize-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

export default TextArea;
