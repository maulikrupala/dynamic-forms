import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import FormGroup from "./components/FormGroup";
import formJson from "./data/form.json";

// Define the type for form data
type FormData = {
  [group: string]: {
    [fieldName: string]: any;
  };
};

const App: React.FC = () => {
  const [activeGroup, setActiveGroup] = useState<string>(
    formJson.form.groups[0].title
  );
  const [formData, setFormData] = useState<FormData>({}); // Properly typed state

  const groups = formJson.form.groups;

  const handleSidebarClick = (groupTitle: string) => {
    setActiveGroup(groupTitle);
  };

  const handleInputChange = (group: string, fieldName: string, value: any) => {
    setFormData((prev: FormData) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [fieldName]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Complete Form Data:", formData); // Logs the complete form data
    alert("Form submitted!");
    // Save to LocalStorage if needed
    localStorage.setItem("formData", JSON.stringify(formData));
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
        groups={groups}
        onClick={handleSidebarClick}
        activeGroup={activeGroup}
      />

      {/* Main Content */}
      <div className="p-6 flex-grow">
        <h1 className="text-2xl font-bold mb-6">{activeGroup}</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {groups.map((group) =>
            group.title === activeGroup ? (
              <div key={group.title}>
                <FormGroup
                  group={group}
                  groupData={formData[group.title] || {}} // Pass current group's data
                  onInputChange={(fieldName, value) =>
                    handleInputChange(group.title, fieldName, value)
                  }
                />
              </div>
            ) : null
          )}
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
