import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import FormGroup from "./components/FormGroup";
import formJson from "./data/form.json";
import AddGroupDialog from "./components/dialog/AddGroupDialog";
import { Field, FieldOption } from "./type";

type FormData = {
  [group: string]: {
    [fieldName: string]: any;
  };
};

// Field normalization function
const normalizeFields = (fields: any[]): Field[] => {
  return fields.map((field) => {
    const normalizedOptions =
      field.options && Array.isArray(field.options)
        ? field.options.map((opt: string | FieldOption) =>
            typeof opt === "string" ? { label: opt, value: opt } : opt
          )
        : undefined;

    return {
      ...field,
      type: field.type as Field["type"], // Cast type to match Field
      options: normalizedOptions,
    };
  });
};

const App: React.FC = () => {
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [groups, setGroups] = useState(() => {
    return formJson.form.groups.map((group) => ({
      ...group,
      fields: normalizeFields(group.fields), // Normalize fields here
    }));
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [touchedFields, setTouchedFields] = useState<{
    [key: string]: boolean;
  }>({});

  const activeGroup = groups[activeGroupIndex];

  const handleSidebarClick = (groupTitle: string) => {
    const groupIndex = groups.findIndex((g) => g.title === groupTitle);
    setActiveGroupIndex(groupIndex);
  };

  const handleAddGroup = (newGroup: { title: string; fields: any[] }) => {
    setGroups((prev) => [
      ...prev,
      { ...newGroup, fields: normalizeFields(newGroup.fields) },
    ]);
    setFormData((prev) => ({
      ...prev,
      [newGroup.title]: {},
    }));
  };

  const handleInputChange = (group: string, fieldName: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [fieldName]: value,
      },
    }));
  };

  const validateField = (field: Field, value: any) => {
    if (field.required && !value) {
      return `${field.label} is required.`;
    }
    return "";
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = groups.some((group) =>
      group.fields.some((field) =>
        validateField(field, formData[group.title]?.[field.name])
      )
    );
    if (errors) {
      alert("Please fix the errors before submitting.");
      return;
    }
    alert("Form submitted successfully!");
    localStorage.setItem("formData", JSON.stringify(formData));
  };

  const validateGroup = () => {
    const currentGroup = groups[activeGroupIndex];
    const errors: { [key: string]: string } = {};

    currentGroup.fields.forEach((field) => {
      const error = validateField(
        field,
        formData[currentGroup.title]?.[field.name]
      );
      if (error) {
        errors[field.name] = error;
      }
    });

    const updatedTouchedFields = { ...touchedFields };
    currentGroup.fields.forEach((field) => {
      updatedTouchedFields[field.name] = true;
    });
    setTouchedFields(updatedTouchedFields);

    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (!validateGroup()) {
      return;
    }
    localStorage.setItem("formData", JSON.stringify(formData));

    if (activeGroupIndex < groups.length - 1) {
      setActiveGroupIndex((prev) => prev + 1);
    } else {
      alert("Form submitted successfully!");
    }
  };

  useEffect(() => {
    const initialData: FormData = groups.reduce((acc: FormData, group) => {
      acc[group.title] = {};
      return acc;
    }, {} as FormData);
    setFormData(initialData);
  }, [groups]);

  return (
    <div className="">
      <div className="fixed top-0 left-0 h-full w-64">
        <Sidebar
          groups={groups}
          onClick={handleSidebarClick}
          activeGroup={activeGroup.title}
        />
      </div>
      <div className="ml-0 md:ml-64 mt-4">
        <div className="flex-grow p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <h1 className="text-2xl font-bold text-center sm:text-left">
              {activeGroup.title}
            </h1>
            <button
              type="button"
              onClick={() => setIsDialogOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full sm:w-auto"
            >
              Add New Group
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <FormGroup
              group={activeGroup}
              groupData={formData[activeGroup.title] || {}}
              onInputChange={(fieldName, value) =>
                handleInputChange(activeGroup.title, fieldName, value)
              }
              validateField={validateField}
              touchedFields={touchedFields}
            />

            <div className="col-span-1 md:col-span-2 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
              >
                {activeGroupIndex < groups.length - 1 ? "Next" : "Submit"}
              </button>
            </div>
          </form>
        </div>
        {isDialogOpen && (
          <AddGroupDialog
            onSave={handleAddGroup}
            onClose={() => setIsDialogOpen(false)}
            visible={true}
          />
        )}
      </div>
    </div>
  );
};

export default App;
