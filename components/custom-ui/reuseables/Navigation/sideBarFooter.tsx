"use client"

import React from 'react';
import { Button } from '@/components/ui/button';
import { MdOutlineLogout } from 'react-icons/md';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut, useSession } from 'next-auth/react';

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
    <div data-testid="footer-available"
      className="flex flex-col items-center justify-end pb-8 px-3 ">
      <div className="flex space-x-4">
        <Avatar className="h-8 w-8 md:h-12 md:w-12 rounded-full">
          {/* <AvatarImage src="/placeholder-user.jpg" alt="user-avatar" /> */}
          <AvatarFallback>
            {session?.user.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className={`${isCollapsed ? 'hidden' : 'inline'} grid gap-0.5`}>
          <div className="font-medium text-sm">{session?.user.username}</div>
          <div className="text-muted-foreground text-xs">{session?.user.email}</div>
        </div>
      </div>
      {session?.user ? (
        <Button
          onClick={() => signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/auth/sign-in`
          })}
          variant="destructive"
          className={`${isCollapsed ? 'hidden' : 'flex items-center justify-center mx-auto'}`}>
          <MdOutlineLogout />
          Logout
        </Button>
      ) : (
        <Button onClick={handleLogin}>Login</Button>
      )}
    </div>
  );
};

export default SidebarFooter;
