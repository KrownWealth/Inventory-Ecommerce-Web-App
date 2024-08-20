"use client"

import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoveVerticalIcon } from 'lucide-react';
import { ProductType } from '@/types';
import { ProductTableData } from '@/json';
import { FormattedPrice } from '@/lib';

interface ProductTableProps {
  setIsModalOpen: (open: boolean) => void;
  handleEditProductOpen: (product: ProductType) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ setIsModalOpen, handleEditProductOpen }) => {
  const dynamicTable = [
    { tableHead: "ID" },
    { tableHead: "Product Image" },
    { tableHead: "Name" },
    { tableHead: "Cost Price" },
    { tableHead: "Stock" },
    { tableHead: "Category" },
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
          {ProductTableData.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.productImg}</TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{FormattedPrice(product.costPrice)}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoveVerticalIcon className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className='flex flex-col items-center justify-center'>
                    <DropdownMenuItem className='w-full flex items-center justify-center'>
                      <Button className='w-full' onClick={() => handleEditProductOpen(product)}>Edit</Button>
                    </DropdownMenuItem>
                    
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

export default ProductTable;
