import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import FormGroup from "./components/FormGroup";
import formJson from "./data/form.json";

const App: React.FC = () => {
  const [activeGroup, setActiveGroup] = useState<string>(formJson.form.groups[0].title);

  const groups = formJson.form.groups;

  const handleSidebarClick = (groupTitle: string) => {
    setActiveGroup(groupTitle);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar groups={groups} onClick={handleSidebarClick} activeGroup={activeGroup} />

      {/* Main Content */}
      <div className="p-6 flex-grow">
        <h1 className="text-2xl font-bold mb-6">{activeGroup}</h1>
        {groups.map((group) =>
          group.title === activeGroup ? (
            <form
              key={group.title}
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                alert(`${group.title} form submitted!`);
              }}
            >
              <FormGroup group={group} />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Submit
              </button>
            </form>
          ) : null
        )}
      </div>
    </div>
  );
};

export default App;
