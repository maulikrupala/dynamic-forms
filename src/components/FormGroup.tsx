import React, { useState } from "react";
import InputField from "./InputField";
import { Field } from "../type";

interface GroupProps {
  group: {
    title: string;
    fields: Field[];
  };
  groupData: { [key: string]: any };
  onInputChange: (fieldName: string, value: any) => void;
  validateField: (field: Field, value: any) => string;
  touchedFields: { [fieldName: string]: boolean };
}

const FormGroup: React.FC<GroupProps> = ({
  group,
  groupData,
  onInputChange,
  validateField,
  touchedFields,
}) => {
  const [touched, setTouched] = useState<{ [fieldName: string]: boolean }>({});

  const handleBlur = (fieldName: string) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {group.fields.map((field, index) => {
        // Check if the field is touched
        const isTouched = touchedFields[field.name] || touched[field.name];

        // Validate the field only if touched
        const errorMessage = isTouched
          ? validateField(field, groupData[field.name] ?? "") || undefined
          : undefined;

        // Ensure the field has a valid type
        if (!field || !field.type) {
          return (
            <div key={index} className="text-red-500">
              Invalid field data
            </div>
          );
        }

        return (
          <InputField
            key={index}
            field={field}
            value={
              groupData[field.name] || (field.type === "checkbox" ? [] : "")
            }
            onChange={(value) => onInputChange(field.name, value)}
            isInvalid={!!errorMessage}
            errorMessage={errorMessage}
            onBlur={() => handleBlur(field.name)}
          />
        );
      })}
    </div>
  );
};

export default FormGroup;
