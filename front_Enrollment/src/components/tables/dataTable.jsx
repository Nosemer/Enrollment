const DataTable = ({ columns, data }) => {
  return (
    <table className="min-w-full bg-white border border-gray-200 text-sm">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key} className="border-b px-4 py-2 text-left font-semibold">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="text-center py-4">
              No records found.
            </td>
          </tr>
        ) : (
          data.map((row, idx) => (
            <tr key={idx} className="border-t hover:bg-gray-100">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default DataTable;
