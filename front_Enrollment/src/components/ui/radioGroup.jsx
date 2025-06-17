const RadioGroup = ({ label, name, options = [], value, onChange, required = false }) => (
  <div className="mb-4">
    <p className="mb-2 font-medium">{label}</p>
    {options.map((opt) => (
      <label key={opt.value} className="inline-flex items-center mr-4">
        <input
          type="radio"
          name={name}
          value={opt.value}
          checked={value === opt.value}
          onChange={onChange}
          required={required}
          className="mr-2"
        />
        {opt.label}
      </label>
    ))}
  </div>
);

export default RadioGroup;
