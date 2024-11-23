import React, { useState } from "react";
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
    <div className="grid md:grid-cols-2 gap-4">
      {group.fields.map((field, index) =>
        field && field.type ? (
          <InputField
            key={index}
            field={field}
            value={groupData[field.name] || ""}
            onChange={(value) => onInputChange(field.name, value)}
          />
        ) : (
          <div key={index} className="text-red-500">
            Invalid field data
          </div>
        )
      )}
    </div>
  );
};

export default FormGroup;
