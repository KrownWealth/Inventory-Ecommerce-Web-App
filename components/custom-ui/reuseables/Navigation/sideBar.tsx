// SideBarNav.tsx
"use client";

import React, { useState } from 'react';
import SidebarHeaderLogo from './sideBarLogo';
import SidebarMenu from './sideBarMenuItems';
import SidebarFooter from './sideBarFooter';

function SideBarNav() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen transition-transform bg-white border-r
         border-gray-200 dark:bg-gray-800 dark:border-gray-700 duration-300 ${
        isCollapsed ? 'w-14' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex flex-col flex-grow px-3 pb-4 overflow-y-auto">
          <SidebarHeaderLogo isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
          <SidebarMenu isCollapsed={isCollapsed} />
        </div>
        <SidebarFooter isCollapsed={isCollapsed} />
      </div>
    </aside>
  );
}

export default SideBarNav;
