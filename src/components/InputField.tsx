import React from "react";

interface FieldOption {
  label: string;
  value: string;
}

interface Field {
  type: "text" | "number" | "textarea" | "radio" | "checkbox" | "dropdown" | "slider";
  label: string;
  name: string;
  placeholder?: string;
  options?: FieldOption[]; // Dropdown can accept strings or {label, value} pairs
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
}

interface InputFieldProps {
  field: Field;
  value: any;
  onChange: (value: any) => void;
  onBlur?: () => void;
  isInvalid?: boolean;
  errorMessage?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  field,
  value,
  onChange,
  onBlur,
  isInvalid,
  errorMessage,
}) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (field.type === "checkbox" && Array.isArray(value)) {
      const target = e.target as HTMLInputElement; // Ensure the target is a checkbox
      const updatedValues = target.checked
        ? [...value, target.value] // Add value when checked
        : value.filter((v: string) => v !== target.value); // Remove value when unchecked
      onChange(updatedValues);
    } else {
      onChange(e.target.value);
    }
  };

  const baseInputClasses = `w-full px-4 py-2 shadow focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition duration-200 ease-in-out ${
    isInvalid ? "border-red-500 ring-red-500" : "border-gray-300"
  }`;

  // Normalize options for dropdowns
  const normalizedOptions: FieldOption[] =
    field.type === "dropdown" && field.options
      ? field.options.map((option) =>
          typeof option === "string" ? { label: option, value: option } : option
        )
      : [];

  switch (field.type) {
    case "text":
    case "number":
    case "textarea":
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {field.label}
            {field.required && <span className="text-red-500">*</span>}
          </label>
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              value={value || ""}
              onChange={handleChange}
              onBlur={onBlur}
              placeholder={field.placeholder}
              className={`${baseInputClasses} h-24`}
              required={field.required}
            />
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={value || ""}
              onChange={handleChange}
              onBlur={onBlur}
              placeholder={field.placeholder}
              className={baseInputClasses}
              required={field.required}
            />
          )}
          {isInvalid && errorMessage && (
            <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
          )}
        </div>
      );

    case "radio":
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {field.label}
            {field.required && <span className="text-red-500">*</span>}
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(field.options || []).map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  id={`${field.name}-${index}`}
                  name={field.name}
                  value={option.value}
                  checked={value === option.value} // Check if the value matches
                  onChange={handleChange}
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                  required={field.required}
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
          {isInvalid && errorMessage && (
            <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
          )}
        </div>
      );

    case "checkbox":
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {field.label}
            {field.required && <span className="text-red-500">*</span>}
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(field.options || []).map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`${field.name}-${index}`}
                  name={field.name}
                  value={option.value}
                  checked={value.includes(option.value)} // Ensure value includes option
                  onChange={handleChange}
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                  required={field.required}
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
          {isInvalid && errorMessage && (
            <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
          )}
        </div>
      );

    case "dropdown":
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {field.label}
            {field.required && <span className="text-red-500">*</span>}
          </label>
          <select
            name={field.name}
            value={value || normalizedOptions?.[0]?.value || ""}
            onChange={handleChange}
            onBlur={onBlur}
            className={`${baseInputClasses} bg-white`}
            required={field.required}
          >
            <option value="" disabled>
              Select an option
            </option>
            {(normalizedOptions || []).map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {isInvalid && errorMessage && (
            <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
          )}
        </div>
      );

    case "slider":
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {field.label}
            {field.required && <span className="text-red-500">*</span>}
          </label>
          <div className="flex">
            <span className="text-sm text-gray-600">{field.min || 0}</span>
            <input
              type="range"
              name={field.name}
              value={value || field.min || 0} // Default to the min value if no value
              min={field.min || 0}
              max={field.max || 100}
              step={field.step || 1}
              onChange={(e) => onChange(parseFloat(e.target.value))}
              className="w-full"
            />
            <span className="text-sm text-gray-600">{field.max || 100}</span>
          </div>
          <div className="text-sm text-gray-600 mt-2">
            Value: {value || field.min || 0}
          </div>
          {isInvalid && errorMessage && (
            <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
          )}
        </div>
      );

    default:
      return (
        <div className="mb-4 text-red-500">
          Invalid field type: {field.type}
        </div>
      );
  }
};

export default InputField;
