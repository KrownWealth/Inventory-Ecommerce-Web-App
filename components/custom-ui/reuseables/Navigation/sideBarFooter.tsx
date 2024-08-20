import React from 'react';
import { Button } from '@/components/ui/button';
import { MdOutlineLogout } from 'react-icons/md';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface SidebarFooterProps {
  isCollapsed: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ isCollapsed }) => {
  return (
    <div className="flex flex-col items-start justify-end py-4">
      <div className="flex space-x-4">
        <Avatar className="h-12 w-12 rounded-full">
          <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className={`${isCollapsed ? 'hidden' : 'inline'} grid gap-0.5`}>
          <div className="font-medium text-sm">Cody Neville</div>
          <div className="text-muted-foreground text-xs">cody.neville@example.com</div>
        </div>
      </div>
      <Button className="flex space-x-2 bg-white text-black py-2 mt-4">
        <MdOutlineLogout className="w-4 h-4" />
        <span className={`${isCollapsed ? 'hidden' : 'inline'}`}>Logout</span>
      </Button>
    </div>
  );
};

export default SidebarFooter;
