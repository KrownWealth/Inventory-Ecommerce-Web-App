import React from 'react'
import Link from 'next/link'
import { FaArrowLeft, FaArrowRight, FaPercentage, FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from 'react-icons/fa'
import { Logo } from '@/views/Navigation/Logo';
import Image from 'next/image';


interface SidebarHeaderProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const SidebarHeaderLogo: React.FC<SidebarHeaderProps> = ({ isCollapsed, toggleSidebar }) => {
  return (
    <div data-testid="logo-available" className="flex items-center justify-center relative pt-6 lg:pt-0">
      <Link href="/dashboard" className="flex items-center justify-center gap-2">
        <Image
          src="/images/no-text-logo.png"
          alt="Hometung Pricesage Logo"
          width={80}
          height={80}
          className="h-auto w-auto object-contain"
          priority
        />
      </Link>

      <button
        className={`absolute md:-right-4 top-1/2 transform p-1 z-50 hidden lg:block transition-all duration-300 ${isCollapsed ? 'top-3/4' : 'top-1/2'
          }`}
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {isCollapsed ?
          <FaArrowLeft data-testid="arrow-left-icon" className="h-4 w-4" />
          :
          <FaArrowRight data-testid="arrow-right-icon" className="h-4 w-4" />}
      </button>

    </div>
  )
}

export default SidebarHeaderLogo
