import React from 'react'
import Link from 'next/link'
import { FaArrowLeft, FaArrowRight, FaPercentage, FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from 'react-icons/fa'


interface SidebarHeaderProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const SidebarHeaderLogo: React.FC<SidebarHeaderProps> = ({ isCollapsed, toggleSidebar }) => {
  return (
    <div className="flex h-[75px] items-start justify-start border-b pt-8 relative">
      <Link href="/admin" className="flex items-center gap-2 font-semibold" prefetch={false}>
        <FaPercentage className='h-8 w-8' />
        <span className={`${isCollapsed ? 'hidden' : 'block'}`}>PriceMarkup</span>
      </Link>
      <button
        className={`absolute md:-right-4 top-1/2 transform -translate-y-1/2 p-1 z-50 hidden lg:block transition-all duration-300 ${isCollapsed ? 'top-[100%]' : 'top-1/2'
          }`}
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {isCollapsed ? <FaArrowRight className="h-4 w-4" /> : <FaArrowLeft className="h-4 w-4" />}
      </button>

    </div>
  )
}

export default SidebarHeaderLogo
