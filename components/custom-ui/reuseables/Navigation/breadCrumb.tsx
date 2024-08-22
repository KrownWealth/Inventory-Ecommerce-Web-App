"use client"

import React from 'react'
import { usePathname } from 'next/navigation'
import { FaSlash } from 'react-icons/fa'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const breadcrumbMap: Record<string, string> = {
  '/': 'Dashboard',
  '/admin/products': 'Products',
  '/admin/sales-pricing': 'Sales Pricing',
  '/admin/reporting': 'Reporting',
  '/admin/customers': 'Customers',
}

export function BreadcrumbWithCustomSeparator() {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter((seg) => seg)

  return (
    <Breadcrumb className="text-sm lg:text-lg">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        {pathSegments.map((segment, index) => {
          const currentPath = `/${pathSegments.slice(0, index + 1).join('/')}`
          const breadcrumbLabel = breadcrumbMap[currentPath] || segment

          return (
            <React.Fragment key={index}>
              <BreadcrumbSeparator>
                <FaSlash className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>{breadcrumbLabel}</BreadcrumbPage>
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
