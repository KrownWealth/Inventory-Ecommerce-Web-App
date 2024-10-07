import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoMdBasket } from 'react-icons/io';
import { ImUsers, ImPriceTags } from 'react-icons/im';
import { MdDashboard, MdSettings } from 'react-icons/md';
import { PiShoppingCartFill } from 'react-icons/pi';

interface SidebarMenuProps {
  isCollapsed: boolean;
}

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: <MdDashboard className="h-4 w-4" /> },
  { href: '/dashboard/products', label: 'Products', icon: <PiShoppingCartFill className="h-4 w-4" /> },
  { href: '/dashboard/categories', label: 'Categories', icon: <ImPriceTags className="h-4 w-4" /> },
  { href: '/dashboard/orders/', label: 'Orders', icon: <IoMdBasket className="h-4 w-4" /> },
  { href: '/dashboard/customers', label: 'Customers', icon: <ImUsers className="h-4 w-4" /> },
  { href: '/dashboard/setting', label: 'Settings', icon: <MdSettings className="h-4 w-4" /> },
];

const SidebarMenu: React.FC<SidebarMenuProps> = ({ isCollapsed }) => {
  const pathname = usePathname();

  return (
   
      <nav className="space-y-2 items-center justify-center pt-4 overflow-hidden">
      {menuItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center p-2 rounded-lg transition-all hover:text-primary ${
            pathname === item.href ? 'bg-primary text-white hover:text-white' : 'text-muted-foreground'
          }`}
          prefetch={false}
        >
          {item.icon}
          <span className={`${isCollapsed ? 'hidden' : 'inline'} ms-3`}>{item.label}</span>
        </Link>
      ))}
    </nav>
   
    
  );
};

export default SidebarMenu;
