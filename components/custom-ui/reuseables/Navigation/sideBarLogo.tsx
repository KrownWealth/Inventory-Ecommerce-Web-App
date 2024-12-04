import React from 'react'
import Link from 'next/link'
import { FaArrowLeft, FaArrowRight, FaPercentage, FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from 'react-icons/fa'


interface SidebarHeaderProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const SidebarHeaderLogo: React.FC<SidebarHeaderProps> = ({ isCollapsed, toggleSidebar }) => {
  return (
    <div data-testid="logo-available" className="flex h-[75px] items-start justify-between pt-8 relative">
      <Link href="/admin" className="flex items-center gap-2 font-semibold" prefetch={false}>
        <FaPercentage data-testid="logo-icon" className='h-8 w-8' />
        <span className={`${isCollapsed ? 'hidden' : 'block'}`}>PriceMarkup</span>
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
