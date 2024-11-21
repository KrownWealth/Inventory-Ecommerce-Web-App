"use client"

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { PageHead, DatePickerWithRange, OrderStatusBtn, OrdersTable } from '@/components/custom-ui/reuseables'
import { FaUsers } from 'react-icons/fa'
import { DateRange } from 'react-day-picker'
import { Order } from '@/types'

const OrderView = () => {

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 3)),
    to: new Date(),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);


  useEffect(() => {
    const fetchorders = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/fetch-all-orders`);
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        setOrders(data.orders);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchorders();
  }, []);


  return (
    <div className="flex flex-col space-y-8 py-4">
      <header className="p-4 flex h-[75px] items-center justify-between border-b bg-muted/40 px-4 lg:px-8">
        <div><PageHead pageTitle="All Orders" /></div>
        <DatePickerWithRange date={date} setDate={setDate} />
      </header>

      <div className="flex flex-col space-y-4 px-4 lg:px-8">
        {/* <div className='flex justify-between'>
          <OrderStatusBtn btnText='All Orders' icon={<FaUsers />} />
        </div> */}
        {isLoading ? (
          <p>Loading orders...</p>
        ) : (
          <OrdersTable orders={orders} />
        )}

      </div>
    </div>
  )
}

export default OrderView
