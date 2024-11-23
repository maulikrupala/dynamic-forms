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
    onChange(e.target.value);
  };

  switch (field.type) {
    case "text":
    case "number":
    case "textarea":
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
          </label>
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              value={value}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required}
              className="w-full px-4 py-2 border rounded-md"
            />
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={value}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required}
              className="w-full px-4 py-2 border rounded-md"
            />
          )}
        </div>
      );

    case "radio":
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
          </label>
          {field.options?.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="radio"
                name={field.name}
                value={option.value}
                checked={value === option.value}
                onChange={handleChange}
                required={field.required}
              />
              <label>{option.label}</label>
            </div>
          ))}
        </div>
      );

    case "dropdown":
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
          </label>
          <select
            name={field.name}
            value={value}
            onChange={handleChange}
            required={field.required}
            className="w-full px-4 py-2 border rounded-md"
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
          </label>
          <input
            type="range"
            name={field.name}
            value={value}
            onChange={handleChange}
            min={field.min}
            max={field.max}
            step={field.step}
            className="w-full"
          />
          <span>{value}</span>
        </div>
      );

    default:
      return null;
  }
};

export default InputField;
