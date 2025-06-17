const StudentCard = ({ student }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="text-lg font-semibold">{student.name}</h3>
      <p className="text-sm text-gray-600">{student.email}</p>
      <p className="text-sm">Year Level: {student.year_level}</p>
    </div>
  );
};

export default StudentCard;
