import React from "react";
import InputField from "./InputField";

interface Field {
  type: string;
  label: string;
  name: string;
  placeholder?: string;
  options?: string[];
  required: boolean;
}

interface GroupProps {
  group: {
    title: string;
    fields: Field[];
  };
}

const FormGroup: React.FC<GroupProps> = ({ group }) => (
  <div id={group.title} className="mb-8">
    <h2 className="text-xl font-semibold mb-4">{group.title}</h2>
    <div className="space-y-4">
      {group.fields.map((field, index) => (
        <InputField key={index} field={field} />
      ))}
    </div>
  </div>
);

export default FormGroup;
