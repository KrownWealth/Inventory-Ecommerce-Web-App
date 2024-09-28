import { Button } from '@/components/ui/button'
import React from 'react'

interface OrderStatusBtnProps{
  btnText: string
  icon?: React.ReactNode
}

const OrderStatusBtn:React.FC<OrderStatusBtnProps> = ({ btnText, icon }) => {
  return (
    <Button className='flex justify-between items-center text-sm '>
     {btnText}
       <span className="w-3 h-4">{icon}</span>
    </Button>
  )
}

export default OrderStatusBtn
