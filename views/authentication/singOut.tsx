"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'

const SignOut = () => {
  return (
    <Button
      onClick={() => signOut({
        redirect: true,
        callbackUrl: `${window.location.origin}/auth/sign-in`
      })}
      variant="destructive"

    >Logout</Button>
  )
}

export default SignOut
