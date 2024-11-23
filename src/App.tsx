import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import FormGroup from "./components/FormGroup";
import formJson from "./data/form.json";
import AddGroupDialog from "./components/dialog/AddGroupDialog";

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

  const [groups, setGroups] = useState(formJson.form.groups);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSidebarClick = (groupTitle: string) => {
    setActiveGroup(groupTitle);
  };

  const handleAddGroup = (newGroup: { title: string; fields: any[] }) => {
    setGroups((prev) => [...prev, newGroup]);
    setFormData((prev) => ({
      ...prev,
      [newGroup.title]: {}, // Initialize empty data for the new group
    }));
  };

  const handleInputChange = (group: string, fieldName: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [group]: {
        ...prev[group], // Preserve existing fields
        [fieldName]: value, // Update the specific field
      },
    }));
  };

  const validateField = (field: any, value: any) => {
    if (field.required && !value) {
      return `${field.label} is required.`;
    }
    return "";
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Form submitted!");
    // Save to LocalStorage if needed
    localStorage.setItem("formData", JSON.stringify(formData));
  };

  useEffect(() => {
    const initialData: FormData = groups.reduce((acc: FormData, group) => {
      acc[group.title] = {}; // Initialize each group with an empty object
      return acc;
    }, {} as FormData);
    setFormData(initialData);
  }, [groups]);

  return (
    <div className="">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64">
        <Sidebar
          groups={groups}
          onClick={handleSidebarClick}
          activeGroup={activeGroup}
        />
      </div>
      {/* Main Content */}
      <div className="ml-64">
        <div className="p-3">Header</div>
        <div className=" flex-grow p-6">
          {/* Title */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{activeGroup}</h1>
            <button
              type="button"
              onClick={() => setIsDialogOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Add New Group
            </button>
          </div>

          {/* Form */}
          <form
            // className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
            onSubmit={handleSubmit}
          >
            {groups.map((group) =>
              group.title === activeGroup ? (
                <div key={group.title}>
                  <FormGroup
                    group={group}
                    groupData={formData[group.title] || {}} // Pass current group data
                    onInputChange={(fieldName, value) =>
                      handleInputChange(group.title, fieldName, value)
                    }
                  />
                </div>
              ) : null
            )}

            {/* Submit Button */}
            <div className="col-span-1 md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        {isDialogOpen && (
          <AddGroupDialog
            onSave={handleAddGroup}
            onClose={() => setIsDialogOpen(false)} visible={true}          />
        )}
      </div>
    </div>
  );
};

export default App;
