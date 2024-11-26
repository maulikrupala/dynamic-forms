import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";

interface FieldOption {
  label: string;
  value: string;
}

interface Field {
  type: string;
  label: string;
  name: string;
  placeholder?: string;
  required: boolean;
  options?: FieldOption[];
  min?: number;
  max?: number;
}

interface AddGroupDialogProps {
  onSave: (newGroup: { title: string; fields: Field[] }) => void;
  onClose: () => void;
  visible: boolean;
}

const fieldTypes = [
  { label: "Text", value: "text" },
  { label: "Textarea", value: "textarea" },
  { label: "Number", value: "number" },
  { label: "Radio", value: "radio" },
  { label: "Dropdown", value: "dropdown" },
  { label: "Checkbox", value: "checkbox" },
  { label: "Slider", value: "slider" },
];

const AddGroupDialog: React.FC<AddGroupDialogProps> = ({
  onSave,
  onClose,
  visible,
}) => {
  const [title, setTitle] = useState<string>("");
  const [fields, setFields] = useState<Field[]>([]);
  const [currentOption, setCurrentOption] = useState<FieldOption>({
    label: "",
    value: "",
  });

  const handleAddField = () => {
    setFields((prevFields) => [
      ...prevFields,
      {
        type: "text",
        label: "",
        name: "",
        placeholder: "",
        required: false,
        options: [],
        min: undefined,
        max: undefined,
      } as Field,
    ]);
  };

  const handleFieldChange = (index: number, key: keyof Field, value: any) => {
    const updatedFields = fields.map((field, idx) =>
      idx === index ? { ...field, [key]: value } : field
    );
    setFields(updatedFields);
  };

  const handleFieldTypeChange = (index: number, newType: string) => {
    const updatedFields = fields.map((field, idx) =>
      idx === index
        ? {
            ...field,
            type: newType,
            options: ["radio", "dropdown", "checkbox"].includes(newType)
              ? field.options || []
              : [],
          }
        : field
    );
    setFields(updatedFields);
  };

  const addFieldOption = (index: number) => {
    if (currentOption.label.trim() && currentOption.value.trim()) {
      const updatedFields = fields.map((field, idx) =>
        idx === index
          ? {
              ...field,
              options: [...(field.options || []), { ...currentOption }],
            }
          : field
      );
      setFields(updatedFields);
      setCurrentOption({ label: "", value: "" });
    } else {
      alert("Both label and value are required for options.");
    }
  };

  const removeFieldOption = (fieldIndex: number, optionIndex: number) => {
    const updatedFields = fields.map((field, idx) =>
      idx === fieldIndex
        ? {
            ...field,
            options: field.options?.filter((_, oIdx) => oIdx !== optionIndex),
          }
        : field
    );
    setFields(updatedFields);
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert("Please provide a group title.");
      return;
    }

    onSave({ title, fields });
    onClose();
  };

  const footer = (
    <div className="flex justify-end space-x-2">
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={onClose}
        severity="success"
      />
      <Button
        label="Save"
        icon="pi pi-check"
        severity="danger"
        outlined
        onClick={handleSave}
      />
    </div>
  );

  const baseInputClasses =
    "w-full px-4 py-2 shadow focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition duration-200 ease-in-out";

  return (
    <Dialog
      header="Add New Group"
      visible={visible}
      style={{ width: "50vw" }}
      footer={footer}
      onHide={onClose}
    >
      {/* Group Title */}
      <div className="p-field">
        <label htmlFor="group-title" className="block text-sm font-medium">
          Group Title
        </label>
        <InputText
          id="group-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter group title"
          className={baseInputClasses}
        />
      </div>

      {/* Fields */}
      <h3 className="text-lg font-medium mt-4">Fields</h3>
      {fields.map((field, index) => (
        <div key={index} className="p-field mt-4 border-b pb-4">
          {/* Field Type */}
          <label className="block text-sm font-medium">Field Type</label>
          <Dropdown
            value={field.type}
            options={fieldTypes}
            onChange={(e) => handleFieldTypeChange(index, e.value)}
            className={baseInputClasses}
            placeholder="Select Field Type"
          />

          {/* Field Label */}
          <label className="block text-sm font-medium mt-4">Field Label</label>
          <InputText
            value={field.label}
            onChange={(e) => handleFieldChange(index, "label", e.target.value)}
            className={baseInputClasses}
            placeholder="Enter field label"
          />

          {/* Field Name */}
          <label className="block text-sm font-medium mt-4">Field Name</label>
          <InputText
            value={field.name}
            onChange={(e) => handleFieldChange(index, "name", e.target.value)}
            className={baseInputClasses}
            placeholder="Enter field name"
          />

          {/* Options Management */}
          {["radio", "checkbox"].includes(field.type) && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Options</h4>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <InputText
                  value={currentOption.label}
                  onChange={(e) =>
                    setCurrentOption((prev) => ({
                      ...prev,
                      label: e.target.value,
                    }))
                  }
                  placeholder="Enter option label"
                  className="w-full"
                />
                <InputText
                  value={currentOption.value}
                  onChange={(e) =>
                    setCurrentOption((prev) => ({
                      ...prev,
                      value: e.target.value,
                    }))
                  }
                  placeholder="Enter option value"
                  className="w-full"
                />
                <Button
                  label="Add Option"
                  icon="pi pi-plus"
                  className="col-span-2"
                  onClick={() => addFieldOption(index)}
                />
              </div>
              {field.options?.length && field.options?.length > 0 && (
                <ul className="list-disc pl-5">
                  {field.options.map((option, idx) => (
                    <li key={idx} className="flex justify-between items-center">
                      <span>
                        <strong>Label:</strong> {option.label} |{" "}
                        <strong>Value:</strong> {option.value}
                      </span>
                      <Button
                        icon="pi pi-trash"
                        className="p-button-text"
                        onClick={() => removeFieldOption(index, idx)}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Options Management */}
          {field.type === "dropdown" && (
            <div className="mt-4">
              <label className="block text-sm font-medium">
                Options (comma-separated)
              </label>
              <textarea
                value={field.options?.join(", ")} // Convert array to a string
                onChange={(e) =>
                  handleFieldChange(
                    index,
                    "options",
                    e.target.value.split(",").map((opt) => opt.trim()) // Convert string back to array
                  )
                }
                className="w-full mt-2 px-3 py-2 border rounded-md shadow-sm"
                placeholder="Enter options separated by commas"
              />
              <div className="mt-2">
                <strong>Preview:</strong> {field.options?.join(", ") || "None"}
              </div>
            </div>
          )}

          {/* Min and Max */}
          {["slider", "number"].includes(field.type) && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium">Min Value</label>
                <InputNumber
                  value={field.min || undefined}
                  onChange={(e) => handleFieldChange(index, "min", e.value)}
                  className={baseInputClasses}
                  placeholder="Min"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Max Value</label>
                <InputNumber
                  value={field.max || undefined}
                  onChange={(e) => handleFieldChange(index, "max", e.value)}
                  className={baseInputClasses}
                  placeholder="Max"
                />
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Add Field Button */}
      <Button
        label="Add Field"
        icon="pi pi-plus"
        className="p-button-outlined mt-4"
        onClick={handleAddField}
      />
    </Dialog>
  );
};

export default AddGroupDialog;
