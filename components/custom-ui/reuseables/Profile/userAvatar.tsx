import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

const UserAvatar = () => {
  return (
     <div className="flex items-center gap-4">
      <Avatar className="h-12 w-12 rounded-full">
        <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="grid gap-0.5">
        <div className="font-medium text-sm">Cody Neville</div>
        <div className="text-muted-foreground text-xs">cody.neville@example.com</div>
      </div>
    </div>
  )
}

export default UserAvatar
