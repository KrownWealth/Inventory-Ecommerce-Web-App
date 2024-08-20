import { OrderStatusBtn, PageHead } from '@/components/custom-ui/reuseables'
import OrdersTable from '@/components/custom-ui/reuseables/Admin/ordersTable'
import { User2 } from 'lucide-react'
import React from 'react'
import RootLayout from '../layout'

const OrdersPage = () => {
  return (
    <RootLayout pageTitle="Orders" showInputSearch={true}>
    <OrderStatusBtn btnText='All Orders' icon={<User2 />} />
    <OrdersTable />
    </RootLayout>
  )
}

export default OrdersPage
