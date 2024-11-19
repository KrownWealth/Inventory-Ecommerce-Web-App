
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { FaArrowsAltV } from 'react-icons/fa';
import { Order } from '@/types';

interface OrderTableProps {
  orders: Order[];
}

const OrdersTable: React.FC<OrderTableProps> = ({ orders }) => {
  const dynamicTable = [
    { tableHead: "Order ID" },
    { tableHead: "Customer Name" },
    { tableHead: "Product Name" },
    { tableHead: "Order Date" },
    { tableHead: "Payment Status" },
    { tableHead: "Total Price" },
    { tableHead: "Actions" },
  ];

  return (
    <div className="border shadow-sm rounded-lg overflow-auto md:w-full w-[328px]">
      <Table>
        <TableHeader>
          <TableRow>
            {dynamicTable.map((header, index) => (
              <TableHead key={index}>{header.tableHead}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell className="font-medium">{order.customerName}</TableCell>
              <TableCell>{order.productName}</TableCell>
              <TableCell>{order.orderDate}</TableCell>
              <TableCell>{order.paymentStatus}</TableCell>
              <TableCell>{order.totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <FaArrowsAltV className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Accept</DropdownMenuItem>
                    <DropdownMenuItem>Decline</DropdownMenuItem>
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
