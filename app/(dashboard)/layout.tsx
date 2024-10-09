"use client"

import React, { useState } from 'react';
import { SideBarNav } from '@/components/custom-ui/reuseables';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
       <SideBarNav isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <main
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          isCollapsed ? 'lg:pl-14 ml-0' : 'lg:ml-64 ml-14'
        }`}
      >
        {children}
      </main>
    </div>
  );
}
