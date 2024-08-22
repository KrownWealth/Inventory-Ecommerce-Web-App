"use client"

import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
// import { CustomerType } from '@/types';
 import { CustomerData } from '@/json';
import { FormattedPrice } from '@/lib';
import { FaArrowsAltV } from 'react-icons/fa';


const CustomerTable = () => {
  const dynamicTable = [
    { tableHead: "Customer_ID" },
    { tableHead: "Name" },
    { tableHead: "Email" },
    { tableHead: "Total Order" },
    { tableHead: "Total Spent" },
    { tableHead: "Actions" }
  ];

  return (
    <div className="border shadow-sm rounded-lg overflow-auto lg:w-full w-[280px]">
      <Table>
        <TableHeader>
          <TableRow>
            {dynamicTable.map((header, index) => (
              <TableHead key={index}>{header.tableHead}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {CustomerData.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.id}</TableCell>
              <TableCell className="font-medium">{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.totalOrder}</TableCell>
              <TableCell>{FormattedPrice(customer.totalSpent)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <FaArrowsAltV className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className='flex flex-col items-center justify-center'>
                   
                    
                    <DropdownMenuItem>
                     Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomerTable;
