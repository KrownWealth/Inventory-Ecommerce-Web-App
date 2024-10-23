"use client"

import React from 'react';
import { Button } from '@/components/ui/button';
import { MdOutlineLogout } from 'react-icons/md';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

interface SidebarFooterProps {
  isCollapsed: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ isCollapsed }) => {

  const {data: session, status, update } = useSession();

  return (
    <div className="flex flex-col items-start justify-end py-4">
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
      <Button className="flex space-x-2 bg-white text-black py-2 mt-4">
        {session?.user ? (
          <>
            <Button
              onClick={() => signOut({
                redirect: true,
                callbackUrl: `${window.location.origin}/auth/sign-in`
              })}
              variant="destructive"
              className={`${isCollapsed ? 'hidden' : 'inline'}`}
            >
              <MdOutlineLogout className="w-4 h-4" /> Logout
            </Button>
          </>
        ) : (
          <Link href='/auth/sign-in'>Login</Link>
        )}
      </Button>
    </div>
  );
};

export default SidebarFooter;
