import React, { useState, useEffect } from "react";
import FormGroup from "./FormGroup";
import formJson from "../data/form.json";
import { saveToLocalStorage, getFromLocalStorage } from "../utils/localStorage";

interface Field {
  type: string;
  label: string;
  name: string;
  placeholder?: string;
  options?: string[];
  required: boolean;
}

interface Group {
  title: string;
  fields: Field[];
}

interface Form {
  title: string;
  description?: string;
  groups: Group[];
}

const DynamicForm: React.FC = () => {
  const [savedData, setSavedData] = useState<Record<string, any>>({});

  useEffect(() => {
    const data = getFromLocalStorage("formData");
    if (data) setSavedData(data);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, any> = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    saveToLocalStorage("formData", data);
    alert("Form submitted!");
  };

  const form: Form = formJson.form;

  return (
    <div className="p-6 flex-grow">
      <h1 className="text-2xl font-bold mb-6">{form.title}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {form.groups.map((group, index) => (
          <FormGroup key={index} group={group} />
        ))}
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DynamicForm;
