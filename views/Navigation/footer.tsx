import React from 'react'
import { cn } from '@/lib'
import { Satoshi_Black } from '@/lib/fonts'


export const Footer = () => {
  return (
    <footer className="w-full">
      <div className="max-w-7xl flex flex-row items-center justify-between p-2 px-8 md:px-12 mx-auto">
        <div>
          <h2 className={cn("font-semibold flex items-center justify-start text-2xl capitalize leading-snug mb-4", Satoshi_Black.className)}>Hometung <br />Furniture.</h2>
        </div>

        <div> <p>2024 All right reserved</p></div>
      </div>
    </footer>
  )
}


