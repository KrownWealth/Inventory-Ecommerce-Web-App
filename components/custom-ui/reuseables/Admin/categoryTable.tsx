"use client"

import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { FaArrowsAltV } from 'react-icons/fa';

interface CategoryTableProps {
  categories: { id: string; name: string }[];
  onDelete: (categoryId: string) => Promise<void>; 
}

const CategoryTable: React.FC<CategoryTableProps> = ({ categories, onDelete }) => {
  const dynamicTable = [
    { tableHead: "Category_ID" },
    { tableHead: "Name" },
    { tableHead: "Actions" },
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
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <FaArrowsAltV className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onDelete(category.id)}>
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

export default CategoryTable;
