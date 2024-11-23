import React, { useState } from "react";
import formJson from "../data/form.json";
import FormGroup from "./FormGroup";
import { saveToLocalStorage } from "../utils/localStorage";

const DynamicForm: React.FC = () => {
  const [formData, setFormData] = useState<any>({});

  const handleInputChange = (group: string, fieldName: string, value: any) => {
    setFormData((prev: { [x: string]: any; }) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [fieldName]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, group: string) => {
    e.preventDefault();
    saveToLocalStorage(`Data for ${group}:`, formData[group] || {});
    alert(`Data for ${group} submitted!`);
  };

  const { title, description, groups } = formJson.form;
  debugger;
  console.log(groups, "groups----");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <p className="text-gray-600 mb-6">{description}</p>
      {groups.map((group, index) => (
        <form
          key={index}
          className="mb-8 space-y-6"
          onSubmit={(e) => handleSubmit(e, group.title)}
        >
          <h2 className="text-xl font-semibold mb-4">{group.title}</h2>
          <FormGroup
            group={group}
            groupData={formData[group.title] || {}}
            onInputChange={(fieldName, value) =>
              handleInputChange(group.title, fieldName, value)
            }
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Submit {group.title}
          </button>
        </form>
      ))}
    </div>
  );
};

export default DynamicForm;
