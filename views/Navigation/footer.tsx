import Link from 'next/link'
import React from 'react'
import { cn } from '@/lib'
import { Satoshi_Black, Satoshi_Bold } from '@/lib/fonts'
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'


const footerLinks = [
  {label: "Dinning", href: "/"},
  {label: "Bedroom", href: "/"},
  {label: "Kitchen", href: "/"},
  {label: "Office", href: "/"},
  {label: "Sitting Room", href: "/"}

]
export const Footer = () => {
  return (
    <footer className="w-full py-20">
      <div className="container flex flex-col items-start justify-start">
        <div>
        <h2 className={cn("font-semibold flex items-center justify-start text-2xl capitalize leading-snug mb-4", Satoshi_Black.className)}>Hometung <br />Furniture.</h2>
      </div>

      <div className='w-full grid grid-cols-4 gap-8'>
        <ul className="flex flex-col">
          <li className={cn('font-bold text-xl mb-3', Satoshi_Bold.className)}>Company</li>
          {footerLinks.map((menu) => (
            <Link key={menu.label} href={menu.href} >
              <li>{menu.label}</li>
            </Link>
          ))}
        </ul>
        <ul className="flex flex-col">
          <li className={cn('font-bold text-xl mb-3', Satoshi_Bold.className)}>Company</li>
          {footerLinks.map((menu) => (
            <Link key={menu.label} href={menu.href} >
              <li>{menu.label}</li>
            </Link>
          ))}
        </ul>
        <ul className="flex flex-col">
          <li className={cn('font-bold text-xl mb-3', Satoshi_Bold.className)}>Company</li>
          {footerLinks.map((menu) => (
            <Link key={menu.label} href={menu.href} >
              <li>{menu.label}</li>
            </Link>
          ))}
        </ul>
        <ul className="flex flex-col">
          <li className={cn('font-bold text-xl mb-3', Satoshi_Bold.className)}>Company</li>
          {footerLinks.map((menu) => (
            <Link key={menu.label} href={menu.href} >
              <li>{menu.label}</li>
            </Link>
          ))}
        </ul>
      </div>
        
        <div className='flex flex-row justify-between items-center py-8'>
         <div> <p>All right reserved</p></div>
          <div className='flex gap-6'>
            <FaInstagram />
            <FaFacebook />
            <FaTiktok />
          </div>

        </div>
      </div>
    </footer>
  )
}


