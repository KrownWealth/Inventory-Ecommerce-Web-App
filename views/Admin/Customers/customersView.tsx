"use client";

import React, { useState, useEffect } from 'react';
import { PageHead, DatePickerWithRange, CustomerTable, DataCard } from '@/components/custom-ui/reuseables';
import { FaUser } from 'react-icons/fa';
import { DateRange } from 'react-day-picker';


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://inventory-ecommerce-web.vercel.app"

const CustomerView = ({ searchParams }: { searchParams?: { query?: string; page?: string; }; }) => {
  const [customerInfo, setCustomerInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const [metrics, setMetrics] = useState({ daily: 0, monthly: 0, yearly: 0 });

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 3)),
    to: new Date(),
  });



  const currentPage = Number(searchParams?.page) || 1;

  const fetchCustomers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseUrl}/api/user?page=${currentPage}&limit=20`);
      if (!response.ok) throw new Error('Failed to fetch customers.');

      const data = await response.json();
      setCustomerInfo(data.customers);
      setMetrics({ daily: data.daily, monthly: data.monthly, yearly: data.yearly });
      setTotalPages(data.totalPages);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [currentPage]);

  const contents = [
    { title: "Daily Customers", dataContent: metrics.daily.toString(), description: "Daily signup customers", icon: <FaUser /> },
    { title: "Monthly Customers", dataContent: metrics.monthly.toString(), description: "Monthly signup customers", icon: <FaUser /> },
    { title: "Yearly Customers", dataContent: metrics.yearly.toString(), description: "Yearly signup customers", icon: <FaUser /> },
  ];

  return (
    <div>
      <header className="py-4 flex h-[75px] items-center justify-between border-b bg-muted/40 px-4 lg:px-8">
        <PageHead pageTitle="Customers" />
        <DatePickerWithRange date={date} setDate={setDate} />
      </header>
      <div className="flex flex-col space-y-4 px-8 py-4">
        <div className="flex flex-col md:flex-row gap-8">
          {contents.map((content) => (
            <DataCard
              key={content.title}
              icon={content.icon}
              dataHeading={content.title}
              dataContent={content.dataContent}
              description={content.description}
            />
          ))}
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <CustomerTable customers={customerInfo} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default CustomerView;
