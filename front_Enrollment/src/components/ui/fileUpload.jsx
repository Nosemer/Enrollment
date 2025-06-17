// src/components/ui/FileUpload.jsx
const FileUpload = ({ label, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="file"
      accept=".pdf,.doc,.docx,.jpg,.png"
      onChange={onChange}
      className="mt-1 block w-full text-sm text-gray-500"
    />
  </div>
);

export default FileUpload;
