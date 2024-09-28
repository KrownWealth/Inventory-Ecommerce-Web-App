import { Card } from '@/components/ui/card'
import React from 'react'


interface DataCardProps {
  dataHeading: string
  dataContent: string
  description: string
  icon: React.ReactNode
}
const DataCard: React.FC<DataCardProps> = ({ dataHeading, dataContent, description, icon }) => {
  return (
    <Card className="w-full">
      <div className='p-3 flex items-center space-x-2'>

        <span> {icon}</span>
        <p className="text-muted-foreground text-sm">{dataHeading}</p>

      </div>
      <div className="flex flex-col space-y-2 p-3">
        <div className="flex justify-between ">
          <h4 className="text-2xl font-bold">Total</h4>
          <p>{dataContent}</p>
        </div>
        <p>{description}</p>
      </div>

    </Card>
  )
}

export default DataCard
