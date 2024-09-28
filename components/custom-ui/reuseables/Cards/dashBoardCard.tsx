import React from 'react'
import { Card, CardTitle, CardHeader, CardContent } from '@/components/ui/card'
import { formatNumber, FormattedPrice } from '@/lib'

interface DashBoardCardProps {
  cardTitle: string
  icon: React.ReactNode
  totalCustomers?: string
  totalProducts?: string
  totalRevenue?: string
  totalOrders?: string
  updownTrend: React.ReactNode
  percentageAmount: string
}

const DashBoardCard: React.FC<DashBoardCardProps> = ({ 
  cardTitle, 
  icon, 
  totalCustomers, 
  totalProducts, 
  totalRevenue, 
  totalOrders, 
  updownTrend, 
  percentageAmount 
}) => {
 const cardAmount = totalRevenue 
    ? formatNumber(Number(totalRevenue), '$') 
    : formatNumber(Number(totalCustomers || totalProducts || totalOrders || '0'));

  return (
    <Card className="w-full">
      <CardHeader className='p-3'>
        <CardTitle className="flex items-center space-x-2">
          {icon}
          <p className="text-muted-foreground text-sm">{cardTitle}</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between p-3">
        <h4 className="text-2xl font-bold">{cardAmount}</h4>
        <div className="flex items-center space-x-2">
          <span>{updownTrend}</span>
          <p>{percentageAmount}%</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default DashBoardCard
