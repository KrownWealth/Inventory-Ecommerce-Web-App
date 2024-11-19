import { Button } from '@/components/ui/button'
import React from 'react'

interface OrderStatusBtnProps {
  btnText: string
  icon?: React.ReactNode
}

const OrderStatusBtn: React.FC<OrderStatusBtnProps> = ({ btnText, icon }) => {
  return (
    <Button className='flex justify-between items-center text-sm p-4'>
      {btnText}
      <span className="w-4 h-4 pl-4">{icon}</span>
    </Button>
  )
}

export default OrderStatusBtn
