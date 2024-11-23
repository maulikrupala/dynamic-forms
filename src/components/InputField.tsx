import React from "react";

interface Field {
  type: string;
  label: string;
  name: string;
  placeholder?: string;
  options?: string[];
  required: boolean;
}

interface InputFieldProps {
  field: Field;
}

const InputField: React.FC<InputFieldProps> = ({ field }) => {
  const { type, label, name, placeholder, options, required } = field;

  switch (type) {
    case "text":
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
          <input
            type="text"
            name={name}
            placeholder={placeholder}
            required={required}
            className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      );

    case "dropdown":
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
          <select
            name={name}
            required={required}
            className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select...</option>
            {options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );

    default:
      return null;
  }
};

export default InputField;
