"use client"

import React from 'react';
import { Button } from '@/components/ui/button';
import { MdOutlineLogout } from 'react-icons/md';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';
import { SignOut } from '@/views';
import { useRouter } from 'next/navigation';

interface SidebarFooterProps {
  isCollapsed: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ isCollapsed }) => {

  const { data: session, status, update } = useSession();
  const router = useRouter();

  const handleLogin = () => {
    router.push("/auth/sign-in")
  }

  return (
    <div className="flex flex-col items-start justify-end pb-4">
      <div className="flex space-x-4">
        <Avatar className="h-12 w-12 rounded-full">
          <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className={`${isCollapsed ? 'hidden' : 'inline'} grid gap-0.5`}>
          <div className="font-medium text-sm">{session?.user.username}</div>
          <div className="text-muted-foreground text-xs">{session?.user.email}</div>
        </div>
      </div>
      {session?.user ? (
        <Button
          variant="destructive"
          className={`${isCollapsed ? 'hidden' : 'flex items-center justify-center'}`}>
          <MdOutlineLogout />
          <SignOut />
        </Button>
      ) : (
        <Button onClick={handleLogin}>Login</Button>
      )}
    </div>
  );
};

export default SidebarFooter;
