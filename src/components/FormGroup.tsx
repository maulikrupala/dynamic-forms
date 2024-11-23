import React from "react";
import InputField from "./InputField";

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

interface GroupProps {
  group: {
    title: string;
    fields: Field[];
  };
  groupData: any;
  onInputChange: (fieldName: string, value: any) => void;
}

const FormGroup: React.FC<GroupProps> = ({
  group,
  groupData,
  onInputChange,
}) => {
  return (
    <div>
      {group.fields.map((field, index) => (
        <InputField
          key={index}
          field={field}
          value={groupData[field.name] || ""}
          onChange={(value) => onInputChange(field.name, value)}
        />
      ))}
    </div>
  );
};

export default FormGroup;
