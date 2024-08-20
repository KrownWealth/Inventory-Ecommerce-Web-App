"use client";

import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { ProductType } from '@/types';
import { FormattedPrice } from '@/lib';

const dynamicTable = [
  { tableHead: "ID" },
  { tableHead: "Name" },
  { tableHead: "Cost Price" },
  { tableHead: "Selling Price" },
  { tableHead: "Stock" },
  { tableHead: "Category" },
];

interface SellingPriceTableProps {
  products: SalesProductType[];
  pricingFormula: 'percentage' | 'fixed' | null;
  percentageMarkup: number;
  fixedAmount: number;
}

interface SalesProductType extends ProductType {
  sellingPrice?: string; 
}

const SellingPriceTable: React.FC<SellingPriceTableProps> = ({ products, pricingFormula, percentageMarkup, fixedAmount }) => {
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
          {products.map((product) => {
            const costPriceNumber = parseFloat(product.costPrice);
            
            // Initialize sellingPrice to 0 to avoid undefined errors
            let sellingPrice: number = 0;

            // Apply default percentage formula if no pricing formula is selected
            if (!pricingFormula || pricingFormula === 'percentage') {
              sellingPrice = costPriceNumber * (1 + percentageMarkup / 100);
            } else if (pricingFormula === 'fixed') {
              sellingPrice = costPriceNumber + fixedAmount;
            }

            return (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{FormattedPrice(product.costPrice)}</TableCell>
                <TableCell>
                  {FormattedPrice(sellingPrice.toFixed(2))}
                </TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.category}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default SellingPriceTable;
