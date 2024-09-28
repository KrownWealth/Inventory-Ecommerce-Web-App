
import Link from 'next/link'
import React from 'react'
import { PageHead, DatePickerWithRange, OrderStatusBtn, OrdersTable } from '@/components/custom-ui/reuseables'
import { FaUsers } from 'react-icons/fa'


const OrderView = () => {
  return (
    <div className="flex flex-col space-y-8 py-4">
       <header className="py-4 flex h-[75px] items-center justify-between border-b bg-muted/40 px-4 lg:px-8">
        <Link href="#" className="lg:hidden" prefetch={false}>
          <span className="sr-only">Home</span>
        </Link>
        <div><PageHead pageTitle="Orders" /></div>
        <DatePickerWithRange />
      </header>

      <div className="flex flex-col space-y-4 px-4 lg:px-8">
        <div className='flex justify-between'>
      <OrderStatusBtn btnText='All Orders' icon={<FaUsers />} />
      <DatePickerWithRange />
      </div>
    <OrdersTable />
      </div>
    </div>
  )
}

export default OrderView
