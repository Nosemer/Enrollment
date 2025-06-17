const Badge = ({ label, status }) => {
  const styles = {
    approved: "bg-green-200 text-green-800",
    pending: "bg-yellow-200 text-yellow-800",
    rejected: "bg-red-200 text-red-800",
  };

  return (
    <span className={`px-2 py-1 rounded text-sm font-semibold ${styles[status]}`}>
      {label}
    </span>
  );
};

export default Badge;
