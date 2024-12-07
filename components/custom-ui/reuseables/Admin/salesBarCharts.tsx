"use client"

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { CartesianGrid, XAxis, Bar, BarChart } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { DatePickerWithRange } from '../DateRange/dateRangePicker'
import { DateRange } from 'react-day-picker'
import { BiSolidRectangle } from "react-icons/bi";


const chartData = [
  { amount: "70", month: "January", desktop: 186, mobile: 80 },
  { amount: "70", month: "February", desktop: 305, mobile: 200 },
  { amount: "70", month: "March", desktop: 237, mobile: 120 },
  { amount: "70", month: "April", desktop: 73, mobile: 190 },
  { amount: "70", month: "May", desktop: 209, mobile: 130 },
  { amount: "70", month: "June", desktop: 214, mobile: 140 },
  { amount: "70", month: "Jul", desktop: 214, mobile: 140 },
  { amount: "70", month: "Aug", desktop: 214, mobile: 140 },
  { amount: "70", month: "Sept", desktop: 214, mobile: 140 },
  { amount: "70", month: "Oct", desktop: 214, mobile: 140 },
  { amount: "70", month: "Nov", desktop: 214, mobile: 140 },
  { amount: "70", month: "Dec", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Gross Margin",
    color: "#f45c23",
  },
  mobile: {
    label: "Revenue",
    color: "#28A745",
  },
} satisfies ChartConfig
const SalesBarCharts = () => {

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 3)),
    to: new Date(),
  });

  return (
    <Card className="h-auto w-full ">
      <CardHeader className="flex flex-col justify-between p-4">
        <div className="flex justify-between">
          <h4 className="font-semibold text-md md:text-lg pb-2">Revenue</h4>
          {/* <DatePickerWithRange date={date} setDate={setDate} /> */}
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center gap-1">
            <BiSolidRectangle className="w-3 h-3 text-[#f45c23]" />

            <span className="text-sm font-medium">Gross Margin</span>
          </div>
          <div className="flex items-center gap-1">
            <BiSolidRectangle className="w-3 h-3 text-[#28A745]" />
            <span className="text-sm font-medium">Revenue</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className='p-4'>
        <ChartContainer config={chartConfig} className="w-full h-[200px]">
          <BarChart width={300} height={50} accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='dot' />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} barSize={30} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} barSize={30} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default SalesBarCharts
