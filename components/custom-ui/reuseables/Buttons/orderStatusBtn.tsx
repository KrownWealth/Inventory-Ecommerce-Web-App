import { Button } from '@/components/ui/button'
import React from 'react'

interface OrderStatusBtnProps{
  btnText: string
  icon?: React.ReactNode
}

const OrderStatusBtn:React.FC<OrderStatusBtnProps> = ({ btnText, icon }) => {
  return (
    <Button className='flex justify-between items-center'>
      <span>{btnText}</span>
      {icon}
    </Button>
  )
}

export default OrderStatusBtn
