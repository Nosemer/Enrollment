const Checkbox = ({ label, checked, onChange, name }) => (
  <label className="flex items-center space-x-2">
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className="w-4 h-4"
    />
    <span>{label}</span>
  </label>
);

export default Checkbox;
