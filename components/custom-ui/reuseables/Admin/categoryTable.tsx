"use client"

import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import DropdownButton from '../Buttons/dropDownBtn';

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
    <div className="border shadow-sm rounded-lg overflow-auto lg:w-full w-[280px] z-10">
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
                <DropdownButton
                  categoryId={category.id}
                  onEdit={() => console.log(`Editing category: ${category.name}`)}
                  onDelete={onDelete}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoryTable;
