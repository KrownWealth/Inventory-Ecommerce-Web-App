import React from 'react'
import Link from 'next/link'
import { FaPercentage, FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from 'react-icons/fa'


interface SidebarHeaderProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const SidebarHeaderLogo: React.FC<SidebarHeaderProps> = ({ isCollapsed, toggleSidebar }) => {
  return (
    <div className="flex h-[75px] items-start justify-start border-b pt-8 relative">
        <Link href="/admin" className="flex items-center gap-2 font-semibold" prefetch={false}>
         <FaPercentage className='h-8 w-8' />
          <span className={`${isCollapsed ? 'hidden' : 'block'}`}>PriceSage</span>
        </Link>
        <button
          className="absolute -right-3 top-1/2 transform -translate-y-1/2 p-1 z-10"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? <FaRegArrowAltCircleRight className="h-6 w-6" /> : <FaRegArrowAltCircleLeft className="h-6 w-6" />}
        </button>
      </div>
  )
}

export default SidebarHeaderLogo
