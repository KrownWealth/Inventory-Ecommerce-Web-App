"use client";

import React, { useState, useEffect } from 'react';
import { ModalManager, ProductTableTwo, PageHead, DatePickerWithRange, InputSearch, CustomerTable } from '@/components/custom-ui/reuseables';

import { ProductsType } from '@/types';
import { Button } from '@/components/ui/button';
import { FaTimes, FaUser } from 'react-icons/fa';
import Link from 'next/link';
import { fetchProductsPages } from '@/lib';
import { ProductsPagination } from '@/components/custom-ui/reuseables';
import DataCard from '@/components/custom-ui/reuseables/Admin/dataCard';


const contents = [
  { title: "Daily Customers", dataContent: "10", description: "Daily signup customers", icon: <FaUser /> },
  { title: "Monthly Customers", dataContent: "10", description: "Monthly signup customers", icon: <FaUser /> },
  { title: "Yearly Customers", dataContent: "10", description: "Yearly signup customers", icon: <FaUser /> }
]
const CustomerView = ({ searchParams }: { searchParams?: { query?: string; page?: string; }; }) => {


  return (
    <div>
      <div className="flex flex-col space-y-8 py-4">
        <header className="py-4 flex h-[75px] items-center justify-between border-b bg-muted/40 px-4 lg:px-8">
          <Link href="#" className="lg:hidden" prefetch={false}>
            <span className="sr-only">Home</span>
          </Link>
          <div><PageHead pageTitle="Customers" /></div>
          <InputSearch placeholder='Search for customers here...' />
          <DatePickerWithRange />
        </header>
      </div>
      <div className="flex flex-col space-y-4 px-8 py-4">
        <div className="flex flex-col md:flex-row gap-8">
          {contents.map((content) => (
            <DataCard key={content.title} icon={content.icon} dataHeading={content.title} dataContent={content.dataContent} description={content.description} />
          ))}

        </div>
        <CustomerTable />
      </div>

    </div>

  );
};

export default CustomerView;
