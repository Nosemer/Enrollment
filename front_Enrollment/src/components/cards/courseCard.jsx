const CourseCard = ({ course }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="text-lg font-semibold">{course.course_name}</h3>
      <p className="text-sm text-gray-600">Code: {course.course_code}</p>
      <p className="text-sm">Description: {course.description}</p>
    </div>
  );
};

export default CourseCard;
