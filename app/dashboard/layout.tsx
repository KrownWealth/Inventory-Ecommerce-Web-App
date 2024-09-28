
import { SideBarNav } from '@/components/custom-ui/reuseables';
import React from 'react';
;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
        <div className="flex h-screen overflow-hidden">
          <SideBarNav />
          <main className="flex-1 lg:ml-64 ml-[3rem] overflow-y-auto">
            {children} 
          </main>
        </div>
  );
}
