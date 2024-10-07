import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { FaChevronLeft } from 'react-icons/fa'

const breadcrumbMap: Record<string, string> = {
  '/': 'Dashboard',
  '/admin/products': 'Products',
  '/admin/sales-pricing': 'Sales Pricing',
  '/admin/reporting': 'Reporting',
  '/admin/customers': 'Customers',
}


const SingleProduct = () => {
  return (
    <>
    <Breadcrumb className="text-sm lg:text-lg">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
              <BreadcrumbSeparator>
                <FaChevronLeft className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Product Name</BreadcrumbPage>
              </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    
    <section className='container mt-10'>
      <div className="flex justify-between gap-8">
        <div>Image and image grid</div>
        <div className="flex flex-col">
          <div>Product id</div>
          <h1>Product Name</h1>
          <div>Reviews</div>
          <div>See description</div>
          <div>CTA and Fac\vorite btn</div>
         <div> <p>Free delivery on order over $500</p></div>
        </div>
      </div>
    </section>
    <section className="continer mt-10">
      <div className="flex item-center justify-start">
        <h2>Product Details</h2>
        <h2>Reviews</h2>
        <h2>Discussion</h2>
      </div>
      <div className="flex justify-between">
        <p>Newest dropdown</p>
        

      </div>
    </section>
    </>
  )
}

export default SingleProduct
