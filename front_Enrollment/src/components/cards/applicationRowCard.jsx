import React from "react";

const ApplicationRowCard = ({ app, index, onUpdateStatus, onView }) => {
  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="border px-2 py-2">{index + 1}</td>
      <td className="border px-2 py-2">{app.student_Firstname} {app.student_lastname}</td>
      <td className="border px-2 py-2">{app.email}</td>
      <td className="border px-2 py-2">{app.course_name}</td>
      <td className="border px-2 py-2">{app.year_level}</td>
      <td className="border px-2 py-2">{app.semester || "-"}</td>
      <td className="border px-2 py-2 capitalize">{app.status}</td>
      <td className="border px-2 py-2">{new Date(app.application_date).toLocaleDateString()}</td>
      <td className="border px-2 py-2 space-y-1">
        {app.status === "pending" ? (
          <>
            <button
              onClick={() => onUpdateStatus(app.application_id, "approved")}
              className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded block w-full"
            >
              Approve
            </button>
            <button
              onClick={() => onUpdateStatus(app.application_id, "rejected")}
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded block w-full"
            >
              Reject
            </button>
          </>
        ) : (
          <span className="text-gray-500 italic">Already {app.status}</span>
        )}
        <button
          onClick={() => onView(app)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded block w-full mt-1"
        >
          View Details
        </button>
      </td>
    </tr>
  );
};

export default ApplicationRowCard;
