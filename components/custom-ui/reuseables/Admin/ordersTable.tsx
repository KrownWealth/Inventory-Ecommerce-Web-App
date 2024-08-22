"use client"

import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { OrderType } from '@/types';
import { OrderData } from '@/json';
import { FormattedPrice } from '@/lib';
import { FaArrowsAltV } from 'react-icons/fa';


const OrdersTable = () => {
  const dynamicTable = [
    { tableHead: "Order ID" },
    { tableHead: "Customer Name" },
    { tableHead: "Departure Date" },
    { tableHead: "Delivery Date" },
    { tableHead: "Status" },
    { tableHead: "Total" },
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
          {OrderData.map((order) => (
            <TableRow key={order.order_id}>
              <TableCell>{order.order_id}</TableCell>
              <TableCell className="font-medium">{order.productName}</TableCell>
               <TableCell>{order.departureDate}</TableCell>
              <TableCell>{order.deliveryDate}</TableCell>
              <TableCell>{order.status}</TableCell>
               <TableCell>{FormattedPrice(order.totalAmount)}</TableCell>
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
                     Accept
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                     Decline
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

export default OrdersTable;
