import React from 'react';
import { Card, CardTitle, CardHeader, CardContent } from '@/components/ui/card';
import { formatNumber } from '@/lib';

interface DashBoardCardProps {
  cardTitle: string;
  icon: React.ReactNode;
  total?: string;
  updownTrend: React.ReactNode;
  percentage?: string;
  totalCustomers?: string;
  totalProducts?: string;
}

const DashBoardCard: React.FC<DashBoardCardProps> = ({
  cardTitle,
  icon,
  total,
  totalCustomers,
  totalProducts,
  updownTrend,
  percentage,
}) => {
  // Conditionally render content based on provided props
  const renderAmount = () => {
    if (total) {
      // Format as currency
      return formatNumber(Number(total), '$');
    }
    if (totalCustomers || totalProducts) {
      // Return as plain number
      return totalCustomers || totalProducts;
    }
    return '0';
  };

  return (
    <Card className="w-full">
      <CardHeader className="p-3">
        <CardTitle className="flex items-center space-x-2">
          {icon}
          <p className="text-muted-foreground text-sm">{cardTitle}</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between p-3">
        <h4 className="text-2xl font-bold">{renderAmount()}</h4>
        <div className="flex items-center space-x-2">
          <span>{updownTrend}</span>
          <p>{percentage ? `${percentage}%` : ''}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashBoardCard;
