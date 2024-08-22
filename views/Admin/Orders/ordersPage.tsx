
import Link from 'next/link'
import React from 'react'
import { PageHead,InputSearch, DatePickerWithRange, OrderStatusBtn, OrdersTable } from '@/components/custom-ui/reuseables'
import { FaUsers } from 'react-icons/fa'


const OrdersPage = () => {
  return (
    <div>
       <header className="p-4 flex h-[75px] items-center justify-between border-b bg-muted/40">
        <Link href="#" className="lg:hidden" prefetch={false}>
          <span className="sr-only">Home</span>
        </Link>
        <div><PageHead pageTitle="Product" /></div>
        <InputSearch placeholder='Search for products here...' />
        <DatePickerWithRange />
      </header>

      <OrderStatusBtn btnText='All Orders' icon={<FaUsers />} />
    <OrdersTable />
    </div>
  )
}

export default OrdersPage
