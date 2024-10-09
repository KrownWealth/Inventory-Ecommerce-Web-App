import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const breadcrumbMap: Record<string, string> = {
  '/': 'Dashboard',
  '/admin/products': 'Products',
  '/admin/sales-pricing': 'Sales Pricing',
  '/admin/reporting': 'Reporting',
  '/admin/customers': 'Customers',
};

interface BreadcrumbProps{ 
  activeLink: string
}
const BreadcrumbLinks:React.FC<BreadcrumbProps>= ({activeLink})=> {
  return (
    <Breadcrumb className="container text-sm lg:text-lg py-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <FaChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>{activeLink}</BreadcrumbPage> 
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
  )
}

export default BreadcrumbLinks
