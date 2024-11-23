import React from "react";

interface Field {
  type: string;
  label: string;
  name: string;
  placeholder?: string;
  options?: any[];
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
}

interface InputFieldProps {
  field: Field;
  value: any;
  onChange: (value: any) => void;
}

const InputField: React.FC<InputFieldProps> = ({ field, value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<any>) => {
    if (field.type === "checkbox") {
      const updatedValues = value.includes(e.target.value)
        ? value.filter((v: string) => v !== e.target.value) // Remove unchecked value
        : [...value, e.target.value]; // Add checked value
      onChange(updatedValues);
    } else {
      onChange(e.target.value);
    }
  };

  const baseInputClasses =
    "w-full px-4 py-2 shadow focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition duration-200 ease-in-out";

  switch (field.type) {
    case "text":
    case "number":
    case "textarea":
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {field.label}
          </label>
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              value={value}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required}
              className={`${baseInputClasses} h-24`}
            />
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={value}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required}
              className={baseInputClasses}
            />
          )}
        </div>
      );

    case "radio":
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {field.label}
          </label>
          <div className="grid grid-cols-4 gap-3">
            {(field.options || [])?.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  id={`${field.name}-${index}`}
                  name={field.name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={handleChange}
                  required={field.required}
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                />
                <label
                  htmlFor={`${field.name}-${index}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      );

    case "dropdown":
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {field.label}
          </label>
          <select
            name={field.name}
            value={value}
            onChange={handleChange}
            required={field.required}
            className={`${baseInputClasses} bg-white`}
          >
            <option value="" disabled>
              Select an option
            </option>
            {field.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );

    case "slider":
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {field.label}
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              name={field.name}
              value={value}
              onChange={handleChange}
              min={field.min}
              max={field.max}
              step={field.step}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-700">{value}</span>
          </div>
        </div>
      );

    case "checkbox":
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {field.label}
          </label>
          <div className="space-y-2 w-full grid grid-cols-2">
            {(field.options || [])?.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`${field.name}-${index}`}
                  name={field.name}
                  value={option.value}
                  checked={value.includes(option.value)}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                />
                <label
                  htmlFor={`${field.name}-${index}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default InputField;
