import { CustomerTable } from '@/components/custom-ui/reuseables'
import React from 'react'
import RootLayout from '../layout'

const Customers = () => {
  return (
     <RootLayout pageTitle="Customers" showInputSearch={true}>
    
  <CustomerTable />
    </RootLayout>
  )
}

export default Customers
