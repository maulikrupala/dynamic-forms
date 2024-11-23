import React, { useState } from "react";

interface Group {
  title: string;
}

interface SidebarProps {
  groups: Group[];
  onClick: (groupTitle: string) => void;
  activeGroup: string;
}

const Sidebar: React.FC<SidebarProps> = ({ groups, onClick, activeGroup }) => {
  const [isOpen, setIsOpen] = useState(false); // Manage sidebar visibility

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-2  z-50 p-2  rounded-md cursor-pointer"
      >
        {isOpen ? (
          <div className="fixed top-2 left-52">
            <i className="pi pi-times text-xl"></i>
          </div>
        ) : (
          <i className="pi pi-bars text-xl"></i> // Hamburger Menu Icon
        )}
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r shadow-lg z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <h2 className="text-lg font-semibold mb-4 p-3 border-b">
          Personal Information
        </h2>
        <ul className="space-y-2 p-3">
          {groups.map((group, index) => (
            <li key={index}>
              <div
                onClick={() => {
                  onClick(group.title);
                  setIsOpen(false); // Close sidebar on mobile after click
                }}
                className={`block w-full py-2 px-3 rounded-md ${
                  group.title === activeGroup
                    ? "bg-blue-100 text-blue-800"
                    : "hover:bg-blue-50"
                }`}
              >
                {group.title}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay for Mobile Sidebar */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-30 md:hidden"
        ></div>
      )}
    </>
  );
};

export default Sidebar;
