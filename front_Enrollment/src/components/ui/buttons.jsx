const Button = ({ children, onClick, type = "button", variant = "primary", className = "" }) => {
  const base = "px-4 py-2 rounded text-white font-semibold transition-all";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700",
    secondary: "bg-gray-500 hover:bg-gray-600",
    danger: "bg-red-500 hover:bg-red-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
