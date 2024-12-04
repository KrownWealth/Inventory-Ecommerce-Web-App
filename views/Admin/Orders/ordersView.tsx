import React, { useState, useEffect } from 'react';
import { PageHead, DatePickerWithRange, OrdersTable } from '@/components/custom-ui/reuseables';
import { Order } from '@/types';
import { DateRange } from 'react-day-picker';


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;



const OrderView = () => {

  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 3)),
    to: new Date(),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);


  const handleDateChange = (date: DateRange | undefined) => {
    setSelectedDate(date);
  };

  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/api/fetch-all-orders`);
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      setOrders(data.orders);
    } catch (error) {
      console.error('Failed to fetch orders', error);
      setError('Failed to fetch orders. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [selectedDate]);


  return (
    <div className="flex flex-col space-y-8 py-4">
      <header className="p-4 flex h-[75px] items-center justify-between border-b bg-muted/40 px-4 lg:px-8">
        <div className="flex items-center space-x-4">
          <PageHead pageTitle="All Orders" />
        </div>
        <div>
          <DatePickerWithRange date={selectedDate} setDate={handleDateChange} />
        </div>
      </header>

      <div className="flex flex-col space-y-4 px-4 lg:px-8">
        {isLoading ? (
          <div className="text-center">
            <img src="/images/spinner.svg" alt="loading" className="mx-auto" />
            <p className="text-muted-foreground mt-2">Loading orders...</p>
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <OrdersTable orders={orders || []} />
        )}
      </div>
    </div>
  );
};

export default OrderView;
