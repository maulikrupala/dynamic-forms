import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Chips } from "primereact/chips";
import "primeicons/primeicons.css";


        

interface AddGroupDialogProps {
  onSave: (newGroup: { title: string; fields: any[] }) => void;
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
  const [title, setTitle] = useState("");
  const [fields, setFields] = useState<any[]>([]);

  const handleAddField = () => {
    setFields((prev) => [
      ...prev,
      {
        type: "text",
        label: "",
        name: "",
        placeholder: "",
        required: false,
        options: [],
        min: undefined,
        max: undefined,
      },
    ]);
  };

  const handleFieldChange = (index: number, key: string, value: any) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = key === "options" ? value : value;
    setFields(updatedFields);
  };

  const handleFieldTypeChange = (index: number, newType: string) => {
    setFields((prev) =>
      prev.map((field, idx) =>
        idx === index
          ? {
              ...field,
              type: newType,
              options: ["radio", "dropdown"].includes(newType) ? [] : undefined,
              min: ["slider", "number"].includes(newType) ? 0 : undefined,
              max: ["slider", "number"].includes(newType) ? 100 : undefined,
            }
          : field
      )
    );
  };

  const handleSave = () => {
    if (!title) {
      alert("Please provide a title for the group.");
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

          {/* Options */}
          {["radio", "dropdown"].includes(field.type) && (
            <>
              <label className="block text-sm font-medium mt-4">
                Options (comma-separated)
              </label>
              <Chips
                value={field.options || []}
                onChange={(e) => handleFieldChange(index, "options", e.value)}
                className={baseInputClasses}
                placeholder="Add options"
              />
            </>
          )}

          {/* Min and Max */}
          {["slider", "number"].includes(field.type) && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium">Min Value</label>
                <InputNumber
                  value={field.min || ""}
                  onChange={(e) => handleFieldChange(index, "min", e.value)}
                  className={baseInputClasses}
                  placeholder="Min"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Max Value</label>
                <InputNumber
                  value={field.max || ""}
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
