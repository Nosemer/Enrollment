import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/buttons";

const EditModal = ({ isOpen, onClose, onSubmit, fields, initialValues = {} }) => {
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    if (initialValues && Object.keys(initialValues).length > 0) {
      setFormValues(initialValues);
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-[#F3DFBF] rounded-2xl shadow-2xl w-full max-w-lg p-8 relative"
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
        >
          <button
            className="absolute top-4 right-5 text-[#07004D] text-2xl hover:text-[#2D82B7]"
            onClick={onClose}
          >
            ×
          </button>
          <h2 className="text-xl font-bold mb-6 text-[#07004D]">Edit Subject</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-semibold text-[#07004D] mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={formValues[field.name] ?? ""}
                  onChange={handleChange}
                  placeholder={field.placeholder || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D82B7]"
                  required={field.required}
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-[#2D82B7] text-white py-2 rounded-md font-semibold hover:bg-[#246a92] transition"
            >
              Save Changes
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditModal;
