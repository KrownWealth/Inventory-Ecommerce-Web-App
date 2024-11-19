"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Pie, PieChart, Cell, Tooltip } from "recharts";
import { FaUser } from 'react-icons/fa';
import { DatePickerWithRange } from '../DateRange/dateRangePicker';
import { DateRange } from 'react-day-picker';

const SalesCategoryDoughnut = () => {

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 3)),
    to: new Date(),
  });

  const productSales = [
    { category: "Living Room", value: 25000, color: "#4299E1", icon: <FaUser className="w-4 h-4" /> },
    { category: "Office", value: 18000, color: "#6B46C1", icon: <FaUser className="w-4 h-4" /> },
    { category: "Bedroom", value: 15000, color: "#38A169", icon: <FaUser className="w-4 h-4" /> },
    { category: "Outdoor", value: 12000, color: "#DD6B20", icon: <FaUser className="w-4 h-4" /> },
    { category: "Dinning", value: 10000, color: "#E53E3E", icon: <FaUser className="w-4 h-4" /> },
    { category: "Kitchen", value: 10000, color: "#E53E3E", icon: <FaUser className="w-4 h-4" /> },
  ];

  return (
    <Card className="h-auto w-full">
      <CardHeader>
        <div className="flex justify-between">
          <h4 className="font-semibold text-lg">Product Sales</h4>
          <DatePickerWithRange date={date} setDate={setDate} />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="grid gap-4 flex-1 max-w-[400px]">
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