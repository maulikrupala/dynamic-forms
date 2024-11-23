import React from "react";

interface Group {
  title: string;
}

interface SidebarProps {
  groups: Group[];
  onClick: (groupTitle: string) => void;
  activeGroup: string;
}

const Sidebar: React.FC<SidebarProps> = ({ groups, onClick, activeGroup }) => {
  return (
    <div className="w-64 text-white h-screen border-r shadow-lg cursor-pointer">
      <h2 className="text-lg font-semibold mb-4">Personal</h2>
      <ul className="space-y-2">
        {groups.map((group, index) => (
          <li key={index}>
            <div
              onClick={() => onClick(group.title)}
              className={`block w-full py-2 ${
                group.title === activeGroup
                  ? "bg-gray-200"
                  : "hover:bg-gray-400"
              }`}
            >
              <div className="text-gray-900	text-center ">{group.title}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
