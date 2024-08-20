"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Pie, PieChart, Cell, Tooltip } from "recharts";
import { User } from "lucide-react";

const SalesCategoryDoughnut = () => {
  const productSales = [
    { category: "Apparel", value: 25000, color: "#4299E1", icon: <User className="w-4 h-4"/> },
    { category: "Electronics", value: 18000, color: "#6B46C1", icon: <User className="w-4 h-4"/>},
    { category: "Home Goods", value: 15000, color: "#38A169", icon: <User className="w-4 h-4"/> },
    { category: "Outdoor", value: 12000, color: "#DD6B20", icon: <User className="w-4 h-4"/> },
    { category: "Toys", value: 10000, color: "#E53E3E", icon: <User className="w-4 h-4"/> },
    { category: "Kids Toys", value: 10000, color: "#E53E3E", icon: <User className="w-4 h-4"/>},
  ];

  return (
    <Card className="h-auto w-full">
      <CardHeader>
        <CardTitle>Product Sales by Category</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="grid gap-4 flex-1 max-w-[300px]">
          {productSales.map((sale) => (
            <div key={sale.category} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sale.color }} />
              <div className="flex flex-2 items-center gap-1">
                <span className="text-sm font-medium">{sale.category}</span>
              </div>
              <span className="ml-auto text-sm font-medium">{sale.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div className="flex-1 max-w-[400px]">
          <PieChart width={400} height={400}>
            <Pie
              data={productSales}
              dataKey="value"
              nameKey="category"
              cx="50%"
              cy="50%"
              innerRadius={100} 
              outerRadius={150}
              paddingAngle={5}
            >
              {productSales.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => value.toLocaleString()} />
          </PieChart>
        </div>
        
      </CardContent>
    </Card>
  );
}
export default SalesCategoryDoughnut